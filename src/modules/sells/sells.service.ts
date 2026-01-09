import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Sell, SellStatus, SellOrderType, SellSource, SellPaymentType } from '../../database/entities/sell.entity';
import { SellDetail } from '../../database/entities/sell-detail.entity';
import { CreateSellDto } from './dto/create-sell.dto';
import { UpdateSellDto } from './dto/update-sell.dto';

@Injectable()
export class SellsService {
    constructor(
        @InjectRepository(Sell)
        private readonly sellRepository: Repository<Sell>,
        @InjectRepository(SellDetail)
        private readonly sellDetailRepository: Repository<SellDetail>,
    ) { }

    // Get label arrays for dropdowns
    getStatusLabels(): Record<number, string> {
        return {
            [SellStatus.NEW]: 'Mới',
            [SellStatus.PAID]: 'Hoàn thành',
            [SellStatus.CANCEL]: 'Hủy',
        };
    }

    getOrderTypeLabels(): Record<number, string> {
        return {
            [SellOrderType.NORMAL]: 'Bình thường',
            [SellOrderType.BO_BINH]: 'Bộ bình',
            [SellOrderType.THE_CHAN]: 'Thế chân',
            [SellOrderType.THU_VO]: 'Thu vỏ',
            [SellOrderType.BAN_GAS_VO]: 'Gas + Vỏ',
            [SellOrderType.WATER]: 'Bán nước uống',
            [SellOrderType.WATER_THE_CHAN]: 'Thế chân vỏ nước',
            [SellOrderType.WATER_THU_VO]: 'Thu vỏ nước',
            [SellOrderType.FREE]: 'Tặng KH',
            [SellOrderType.CONSUMER_GOODS]: 'Hàng tiêu dùng',
            [SellOrderType.ELECTRIC]: 'Hàng điện máy',
            [SellOrderType.GIAT_UI]: 'Giặt ủi',
        };
    }

    getSourceLabels(): Record<number, string> {
        return {
            [SellSource.WINDOW]: 'PMBH',
            [SellSource.APP]: 'APP',
            [SellSource.WEB]: 'Call Center',
            [SellSource.AUTO_SALES]: 'Auto Sales',
            [SellSource.MOMO]: 'Momo',
            [SellSource.SENDO]: 'Sendo',
            [SellSource.TIKI]: 'Tiki',
            [SellSource.HIFPT]: 'Hifpt',
            [SellSource.WEB_GAS24H]: 'WebGas24h',
            [SellSource.TECHRES]: 'Techres',
        };
    }

    getPaymentTypeLabels(): Record<number, string> {
        return {
            [SellPaymentType.CASH]: 'Tiền mặt',
            [SellPaymentType.VNPAY]: 'VNPay',
            [SellPaymentType.MOMO]: 'MOMO',
            [SellPaymentType.SENDO]: 'Sendo',
            [SellPaymentType.NAPAS]: 'Napas',
            [SellPaymentType.TIKI]: 'Tiki',
            [SellPaymentType.HIFPT]: 'Hifpt',
            [SellPaymentType.QR_BANK_TRANSFER]: 'QR Code chuyển khoản',
        };
    }

    async findAll(query: {
        page?: number;
        limit?: number;
        status?: number;
        orderType?: number;
        source?: number;
        agentId?: number;
        customerId?: number;
        dateFrom?: string;
        dateTo?: string;
        codeNo?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }) {
        const {
            page = 1,
            limit = 20,
            status,
            orderType,
            source,
            agentId,
            customerId,
            dateFrom,
            dateTo,
            codeNo,
            sortBy = 'id',
            sortOrder = 'DESC',
        } = query;

        const where: any = {};

        if (status) where.status = status;
        if (orderType) where.orderType = orderType;
        if (source) where.source = source;
        if (agentId) where.agentId = agentId;
        if (customerId) where.customerId = customerId;
        if (codeNo) where.codeNo = Like(`%${codeNo}%`);

        if (dateFrom && dateTo) {
            where.createdDateOnly = Between(new Date(dateFrom), new Date(dateTo));
        } else if (dateFrom) {
            where.createdDateOnly = Between(new Date(dateFrom), new Date());
        }

        let data: Sell[] = [];
        let total = 0;

        try {
            [data, total] = await this.sellRepository.findAndCount({
                where,
                relations: ['customer', 'agent', 'employeeMaintain', 'sale', 'details', 'details.material', 'userLogin'],
                order: { [sortBy]: sortOrder },
                skip: (page - 1) * limit,
                take: limit,
            });
        } catch (error) {
            console.error('Error in findAll sells:', error);
            // Try without relations if there's an error
            [data, total] = await this.sellRepository.findAndCount({
                where,
                order: { [sortBy]: sortOrder },
                skip: (page - 1) * limit,
                take: limit,
            });
        }

        // Map data with labels
        const statusLabels = this.getStatusLabels();
        const orderTypeLabels = this.getOrderTypeLabels();
        const sourceLabels = this.getSourceLabels();
        const paymentTypeLabels = this.getPaymentTypeLabels();

        const mappedData = data.map(sell => ({
            ...sell,
            statusLabel: statusLabels[sell.status] || '',
            orderTypeLabel: orderTypeLabels[sell.orderType] || '',
            sourceLabel: sourceLabels[sell.source] || '',
            paymentTypeLabel: paymentTypeLabels[sell.paymentType] || '',
            customerName: sell.customer
                ? `${sell.customer.lastName || ''} ${sell.customer.firstName || ''}`.trim()
                : '',
            customerPhone: sell.customer?.phone || '',
            customerAddress: sell.customer?.address || '',
            // Use firstName for agent display as requested
            agentName: sell.agent?.firstName || sell.agent?.nameAgent || sell.agent?.username || '',
            employeeMaintainName: sell.employeeMaintain
                ? `${sell.employeeMaintain.lastName || ''} ${sell.employeeMaintain.firstName || ''}`.trim()
                : '',
            // Add materials summary for index page: {product name} x{qty}
            // Format qty: show integer if whole number, otherwise show decimal
            materialsSummary: sell.details && sell.details.length > 0
                ? sell.details.map(d => {
                    const qty = Number(d.qty);
                    const formattedQty = Number.isInteger(qty) ? qty.toString() : qty.toFixed(2);
                    return `${d.material?.name || 'VT'} x${formattedQty}`;
                }).join(', ')
                : '',
            // Add creator name
            creatorName: sell.userLogin
                ? (sell.userLogin.firstName || sell.userLogin.username || '')
                : '',
        }));

        return {
            data: mappedData,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number) {
        let sell: Sell | null = null;

        try {
            sell = await this.sellRepository.findOne({
                where: { id },
                relations: ['customer', 'agent', 'employeeMaintain', 'sale', 'userLogin', 'details', 'details.material'],
            });
        } catch (error) {
            console.error('Error in findOne sell:', error);
            // Try without relations if there's an error
            sell = await this.sellRepository.findOne({
                where: { id },
            });
        }

        if (!sell) {
            throw new NotFoundException(`Đơn hàng #${id} không tồn tại`);
        }

        const statusLabels = this.getStatusLabels();
        const orderTypeLabels = this.getOrderTypeLabels();
        const sourceLabels = this.getSourceLabels();
        const paymentTypeLabels = this.getPaymentTypeLabels();

        return {
            ...sell,
            statusLabel: statusLabels[sell.status] || '',
            orderTypeLabel: orderTypeLabels[sell.orderType] || '',
            sourceLabel: sourceLabels[sell.source] || '',
            paymentTypeLabel: paymentTypeLabels[sell.paymentType] || '',
            customerName: sell.customer
                ? `${sell.customer.lastName || ''} ${sell.customer.firstName || ''}`.trim()
                : '',
            agentName: sell.agent?.nameAgent || sell.agent?.username || '',
        };
    }

    async create(createSellDto: CreateSellDto, userId: number) {
        const now = new Date();
        // Use createdDateOnly from DTO if provided, otherwise default to today
        const dateOnly = createSellDto.createdDateOnly
            ? new Date(createSellDto.createdDateOnly)
            : new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Generate code_no
        const codeNo = await this.generateCodeNo();

        // Calculate totals from details
        let total = 0;
        let grandTotal = 0;
        let amountDiscount = createSellDto.amountDiscount || 0;
        let promotionAmount = createSellDto.promotionAmount || 0;

        if (createSellDto.details && createSellDto.details.length > 0) {
            for (const detail of createSellDto.details) {
                const amount = detail.amount || (detail.qty * detail.price);
                total += amount;
            }
        }

        grandTotal = total - amountDiscount - promotionAmount;

        // Create sell record
        const sell = this.sellRepository.create({
            codeNo,
            customerId: createSellDto.customerId,
            agentId: createSellDto.agentId,
            saleId: createSellDto.saleId,
            employeeMaintainId: createSellDto.employeeMaintainId,
            typeCustomer: createSellDto.typeCustomer || 1,
            orderType: createSellDto.orderType || SellOrderType.NORMAL,
            source: createSellDto.source || SellSource.WEB,
            paymentType: createSellDto.paymentType || SellPaymentType.CASH,
            phone: parseInt(createSellDto.phone?.replace(/\D/g, '') || '0'),
            address: createSellDto.address,
            note: createSellDto.note,
            provinceId: createSellDto.provinceId,
            amountDiscount,
            promotionAmount,
            total,
            grandTotal,
            status: SellStatus.NEW,
            uidLogin: userId,
            createdDateOnly: dateOnly,
            createdDateOnlyBigint: Math.floor(dateOnly.getTime() / 1000),
            createdDate: now,
            createdDateBigint: Math.floor(now.getTime() / 1000),
            deliveryTimer: createSellDto.deliveryTimer ? new Date(createSellDto.deliveryTimer) : null,
            isTimer: createSellDto.deliveryTimer ? 1 : 0,
        });

        const savedSell: Sell = await this.sellRepository.save(sell);

        // Create details
        if (createSellDto.details && createSellDto.details.length > 0) {
            const detailEntities = createSellDto.details.map(detail => {
                const amount = detail.amount || (detail.qty * detail.price);
                return this.sellDetailRepository.create({
                    sellId: savedSell.id,
                    customerId: createSellDto.customerId,
                    agentId: createSellDto.agentId,
                    saleId: createSellDto.saleId || 0,
                    employeeMaintainId: createSellDto.employeeMaintainId || 0,
                    uidLogin: userId,
                    typeCustomer: createSellDto.typeCustomer || 1,
                    orderType: createSellDto.orderType || SellOrderType.NORMAL,
                    source: createSellDto.source || SellSource.WEB,
                    materialsId: detail.materialsId,
                    materialsParentId: detail.materialsParentId,
                    materialsTypeId: detail.materialsTypeId || 0,
                    qty: detail.qty,
                    price: detail.price,
                    priceRoot: detail.price,
                    amount,
                    amountDiscount: detail.amountDiscount || 0,
                    promotionAmount: detail.promotionAmount || 0,
                    createdDateOnly: dateOnly,
                    createdDateOnlyBigint: Math.floor(dateOnly.getTime() / 1000),
                });
            });

            await this.sellDetailRepository.save(detailEntities);
        }

        return this.findOne(savedSell.id);
    }

    async update(id: number, updateSellDto: UpdateSellDto, userId: number) {
        const sell = await this.sellRepository.findOne({ where: { id } });

        if (!sell) {
            throw new NotFoundException(`Đơn hàng #${id} không tồn tại`);
        }

        // Update basic fields
        Object.assign(sell, {
            ...updateSellDto,
            lastUpdateBy: userId,
            lastUpdateTime: new Date(),
        });

        // Recalculate if details changed
        if (updateSellDto.details && updateSellDto.details.length > 0) {
            // Delete old details
            await this.sellDetailRepository.delete({ sellId: id });

            // Create new details
            let total = 0;
            const detailEntities = updateSellDto.details.map(detail => {
                const amount = detail.amount || (detail.qty * detail.price);
                total += amount;
                return this.sellDetailRepository.create({
                    sellId: id,
                    customerId: sell.customerId,
                    agentId: sell.agentId,
                    saleId: sell.saleId || 0,
                    employeeMaintainId: sell.employeeMaintainId || 0,
                    uidLogin: userId,
                    typeCustomer: sell.typeCustomer,
                    orderType: sell.orderType,
                    source: sell.source,
                    materialsId: detail.materialsId,
                    materialsParentId: detail.materialsParentId,
                    materialsTypeId: detail.materialsTypeId || 0,
                    qty: detail.qty,
                    price: detail.price,
                    priceRoot: detail.price,
                    amount,
                    amountDiscount: detail.amountDiscount || 0,
                    promotionAmount: detail.promotionAmount || 0,
                    createdDateOnly: sell.createdDateOnly,
                    createdDateOnlyBigint: sell.createdDateOnlyBigint,
                });
            });

            await this.sellDetailRepository.save(detailEntities);

            sell.total = total;
            sell.grandTotal = total - (sell.amountDiscount || 0) - (sell.promotionAmount || 0);
        }

        await this.sellRepository.save(sell);
        return this.findOne(id);
    }

    async updateStatus(id: number, status: number, userId: number, statusCancel?: number) {
        const sell = await this.sellRepository.findOne({ where: { id } });

        if (!sell) {
            throw new NotFoundException(`Đơn hàng #${id} không tồn tại`);
        }

        sell.status = status;
        sell.lastUpdateBy = userId;
        sell.lastUpdateTime = new Date();

        if (status === SellStatus.PAID) {
            sell.completeTime = new Date();
            sell.completeTimeBigint = Math.floor(Date.now() / 1000);
        }

        if (status === SellStatus.CANCEL && statusCancel) {
            sell.statusCancel = statusCancel;
        }

        await this.sellRepository.save(sell);
        return this.findOne(id);
    }

    async remove(id: number) {
        const sell = await this.sellRepository.findOne({ where: { id } });

        if (!sell) {
            throw new NotFoundException(`Đơn hàng #${id} không tồn tại`);
        }

        // Delete details first
        await this.sellDetailRepository.delete({ sellId: id });
        await this.sellRepository.remove(sell);

        return { message: `Đã xóa đơn hàng #${id}` };
    }

    // Generate unique code_no following legacy format: S + YY + 7 random chars
    // Example: S24PSN5NBV
    private async generateCodeNo(): Promise<string> {
        const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'; // Exclude I, O to avoid confusion
        const year = new Date().getFullYear().toString().slice(-2);
        const prefix = `S${year}`;

        // Generate random string of 7 characters
        const generateRandomString = (length: number): string => {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
            }
            return result;
        };

        // Keep generating until we find a unique code
        let maxAttempts = 100;
        while (maxAttempts > 0) {
            const codeNo = `${prefix}${generateRandomString(7)}`;

            // Check if code already exists
            const existing = await this.sellRepository.findOne({
                where: { codeNo },
            });

            if (!existing) {
                return codeNo;
            }
            maxAttempts--;
        }

        // Fallback: use timestamp-based code if all random attempts fail
        const timestamp = Date.now().toString(36).toUpperCase();
        return `${prefix}${timestamp.slice(-7).padStart(7, '0')}`;
    }

    // Get dropdown options for frontend
    getDropdowns() {
        return {
            statuses: Object.entries(this.getStatusLabels()).map(([value, label]) => ({
                value: parseInt(value),
                label,
            })),
            orderTypes: Object.entries(this.getOrderTypeLabels()).map(([value, label]) => ({
                value: parseInt(value),
                label,
            })),
            sources: Object.entries(this.getSourceLabels()).map(([value, label]) => ({
                value: parseInt(value),
                label,
            })),
            paymentTypes: Object.entries(this.getPaymentTypeLabels()).map(([value, label]) => ({
                value: parseInt(value),
                label,
            })),
        };
    }

    // Flexible reporting method
    async getReport(query: {
        dateFrom?: string;
        dateTo?: string;
        groupBy: 'agent' | 'material' | 'creator' | 'province';
        status?: number;
    }) {
        const { dateFrom, dateTo, groupBy, status } = query;

        // Build base query builder
        // Note: province is joined directly via table since Sell entity doesn't have province relation
        let qb = this.sellDetailRepository.createQueryBuilder('detail')
            .innerJoin('detail.sell', 'sell')
            .leftJoin('sell.agent', 'agent')
            .leftJoin('sell.userLogin', 'creator')
            .leftJoin('gas_gas_province', 'province', 'province.id = sell.provinceId')
            .leftJoin('detail.material', 'material');

        // Apply date filter
        if (dateFrom) {
            qb = qb.andWhere('sell.createdDateOnly >= :dateFrom', { dateFrom });
        }
        if (dateTo) {
            qb = qb.andWhere('sell.createdDateOnly <= :dateTo', { dateTo });
        }

        // Apply status filter
        if (status !== undefined) {
            qb = qb.andWhere('sell.status = :status', { status });
        }

        // Group by and select based on groupBy parameter
        let selectFields: string[];
        let groupByFields: string[];

        switch (groupBy) {
            case 'agent':
                selectFields = [
                    'sell.agentId as groupId',
                    'COALESCE(agent.firstName, agent.username, CONCAT("Đại lý #", sell.agentId)) as groupName',
                ];
                groupByFields = ['sell.agentId'];
                break;
            case 'material':
                selectFields = [
                    'detail.materialsId as groupId',
                    'COALESCE(material.name, CONCAT("Vật tư #", detail.materialsId)) as groupName',
                ];
                groupByFields = ['detail.materialsId'];
                break;
            case 'creator':
                selectFields = [
                    'sell.uidLogin as groupId',
                    'COALESCE(creator.firstName, creator.username, CONCAT("User #", sell.uidLogin)) as groupName',
                ];
                groupByFields = ['sell.uidLogin'];
                break;
            case 'province':
                selectFields = [
                    'sell.provinceId as groupId',
                    'COALESCE(province.name, CONCAT("Tỉnh #", sell.provinceId)) as groupName',
                ];
                groupByFields = ['sell.provinceId'];
                break;
        }

        // Execute aggregation query
        const data = await qb
            .select([
                ...selectFields,
                'COUNT(DISTINCT sell.id) as totalOrders',
                'SUM(detail.qty) as totalQty',
                'SUM(detail.amount) as totalRevenue',
            ])
            .groupBy(groupByFields.join(', '))
            .orderBy('totalRevenue', 'DESC')
            .getRawMany();

        // Calculate summary
        const summary = data.reduce((acc, row) => {
            acc.totalOrders += parseInt(row.totalOrders) || 0;
            acc.totalQty += parseFloat(row.totalQty) || 0;
            acc.totalRevenue += parseFloat(row.totalRevenue) || 0;
            return acc;
        }, { totalOrders: 0, totalQty: 0, totalRevenue: 0 });

        return {
            data: data.map(row => ({
                groupId: row.groupId,
                groupName: row.groupName || `#${row.groupId}`,
                totalOrders: parseInt(row.totalOrders) || 0,
                totalQty: parseFloat(row.totalQty) || 0,
                totalRevenue: parseFloat(row.totalRevenue) || 0,
            })),
            summary,
            meta: {
                groupBy,
                dateFrom: dateFrom || null,
                dateTo: dateTo || null,
                status: status !== undefined ? status : null,
            }
        };
    }

    // Dashboard data with cross-filtering support
    async getDashboard(query: {
        dateFrom?: string;
        dateTo?: string;
        provinceId?: number;
        agentId?: number;
        materialId?: number;
        status?: number;
    }) {
        const { dateFrom, dateTo, provinceId, agentId, materialId, status } = query;

        // Build base where conditions
        const buildWhereClause = (qb: any, alias: string = 'sell') => {
            if (dateFrom) {
                qb.andWhere(`${alias}.createdDateOnly >= :dateFrom`, { dateFrom });
            }
            if (dateTo) {
                qb.andWhere(`${alias}.createdDateOnly <= :dateTo`, { dateTo });
            }
            if (status !== undefined) {
                qb.andWhere(`${alias}.status = :status`, { status });
            }
            if (provinceId) {
                qb.andWhere(`${alias}.provinceId = :provinceId`, { provinceId });
            }
            if (agentId) {
                qb.andWhere(`${alias}.agentId = :agentId`, { agentId });
            }
            return qb;
        };

        // 1. By Province (for pie chart)
        let byProvinceQb = this.sellDetailRepository.createQueryBuilder('detail')
            .innerJoin('detail.sell', 'sell')
            .leftJoin('gas_gas_province', 'province', 'province.id = sell.provinceId')
            .select([
                'sell.provinceId as id',
                'COALESCE(province.name, CONCAT("Tỉnh #", sell.provinceId)) as name',
                'COUNT(DISTINCT sell.id) as orderCount',
                'SUM(detail.qty) as quantity',
                'SUM(detail.amount) as revenue',
            ])
            .groupBy('sell.provinceId');

        byProvinceQb = buildWhereClause(byProvinceQb);
        if (agentId) {
            byProvinceQb.andWhere('sell.agentId = :agentId', { agentId });
        }
        if (materialId) {
            byProvinceQb.andWhere('detail.materialsId = :materialId', { materialId });
        }

        const byProvince = await byProvinceQb.orderBy('revenue', 'DESC').getRawMany();

        // 2. By Agent (for table)
        let byAgentQb = this.sellDetailRepository.createQueryBuilder('detail')
            .innerJoin('detail.sell', 'sell')
            .leftJoin('sell.agent', 'agent')
            .select([
                'sell.agentId as id',
                'COALESCE(agent.firstName, agent.username, CONCAT("Đại lý #", sell.agentId)) as name',
                'COUNT(DISTINCT sell.id) as orderCount',
                'SUM(detail.qty) as quantity',
                'SUM(detail.amount) as revenue',
            ])
            .groupBy('sell.agentId');

        byAgentQb = buildWhereClause(byAgentQb);
        if (provinceId) {
            byAgentQb.andWhere('sell.provinceId = :provinceId', { provinceId });
        }
        if (materialId) {
            byAgentQb.andWhere('detail.materialsId = :materialId', { materialId });
        }

        const byAgent = await byAgentQb.orderBy('revenue', 'DESC').getRawMany();

        // 3. By Material (for bar chart)
        let byMaterialQb = this.sellDetailRepository.createQueryBuilder('detail')
            .innerJoin('detail.sell', 'sell')
            .leftJoin('detail.material', 'material')
            .select([
                'detail.materialsId as id',
                'COALESCE(material.name, CONCAT("VT #", detail.materialsId)) as name',
                'COUNT(DISTINCT sell.id) as orderCount',
                'SUM(detail.qty) as quantity',
                'SUM(detail.amount) as revenue',
            ])
            .groupBy('detail.materialsId');

        byMaterialQb = buildWhereClause(byMaterialQb);
        if (provinceId) {
            byMaterialQb.andWhere('sell.provinceId = :provinceId', { provinceId });
        }
        if (agentId) {
            byMaterialQb.andWhere('sell.agentId = :agentId', { agentId });
        }

        const byMaterial = await byMaterialQb.orderBy('quantity', 'DESC').limit(15).getRawMany();

        // 4. Totals
        let totalsQb = this.sellDetailRepository.createQueryBuilder('detail')
            .innerJoin('detail.sell', 'sell')
            .select([
                'COUNT(DISTINCT sell.id) as totalOrders',
                'SUM(detail.qty) as totalQuantity',
                'SUM(detail.amount) as totalRevenue',
            ]);

        totalsQb = buildWhereClause(totalsQb);
        if (provinceId) {
            totalsQb.andWhere('sell.provinceId = :provinceId', { provinceId });
        }
        if (agentId) {
            totalsQb.andWhere('sell.agentId = :agentId', { agentId });
        }
        if (materialId) {
            totalsQb.andWhere('detail.materialsId = :materialId', { materialId });
        }

        const totalsRaw = await totalsQb.getRawOne();

        // Format data
        const formatRow = (row: any) => ({
            id: row.id,
            name: row.name || `#${row.id}`,
            orderCount: parseInt(row.orderCount) || 0,
            quantity: parseFloat(row.quantity) || 0,
            revenue: parseFloat(row.revenue) || 0,
        });

        return {
            byProvince: byProvince.map(formatRow),
            byAgent: byAgent.map(formatRow),
            byMaterial: byMaterial.map(formatRow),
            totals: {
                totalOrders: parseInt(totalsRaw?.totalOrders) || 0,
                totalQuantity: parseFloat(totalsRaw?.totalQuantity) || 0,
                totalRevenue: parseFloat(totalsRaw?.totalRevenue) || 0,
            },
            filters: {
                dateFrom: dateFrom || null,
                dateTo: dateTo || null,
                provinceId: provinceId || null,
                agentId: agentId || null,
                materialId: materialId || null,
                status: status !== undefined ? status : null,
            },
        };
    }

    // ==================== MOBILE ORDER METHODS ====================

    /**
     * Get orders for mobile employee (PVKH/Giao nhận)
     * Tab 'new': Shows orders with actionType = 0 (not picked by anyone)
     * Tab 'my': Shows orders picked by current employee
     * Tab 'completed': Shows completed orders by current employee
     * Tab 'cancelled': Shows cancelled orders
     */
    async getMobileOrders(
        employeeId: number,
        agentId: number,
        query: {
            page?: number;
            limit?: number;
            tab?: 'new' | 'my' | 'completed' | 'cancelled';
        }
    ) {
        const { page = 1, limit = 20, tab = 'new' } = query;

        const where: any = { agentId };

        switch (tab) {
            case 'new':
                // Đơn mới chưa ai nhận (actionType = 0 hoặc employeeMaintainId = 0)
                where.status = SellStatus.NEW;
                where.employeeMaintainId = 0;
                break;
            case 'my':
                // Đơn đã nhận bởi employee này, chưa hoàn thành
                where.status = SellStatus.NEW;
                where.employeeMaintainId = employeeId;
                break;
            case 'completed':
                // Đơn đã hoàn thành bởi employee này
                where.status = SellStatus.PAID;
                where.employeeMaintainId = employeeId;
                break;
            case 'cancelled':
                // Đơn đã hủy
                where.status = SellStatus.CANCEL;
                break;
        }

        const [data, total] = await this.sellRepository.findAndCount({
            where,
            relations: ['customer', 'details', 'details.material'],
            order: { id: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        const statusLabels = this.getStatusLabels();
        const orderTypeLabels = this.getOrderTypeLabels();

        const mappedData = data.map(sell => ({
            id: sell.id,
            codeNo: sell.codeNo,
            customerName: sell.customer
                ? `${sell.customer.lastName || ''} ${sell.customer.firstName || ''}`.trim()
                : '',
            customerPhone: sell.phone?.toString() || sell.customer?.phone || '',
            customerAddress: sell.address || sell.customer?.address || '',
            status: sell.status,
            statusLabel: statusLabels[sell.status] || '',
            orderType: sell.orderType,
            orderTypeLabel: orderTypeLabels[sell.orderType] || '',
            grandTotal: sell.grandTotal,
            createdDate: sell.createdDate,
            deliveryTimer: sell.deliveryTimer,
            isTimer: sell.isTimer,
            note: sell.note,
            materialsSummary: sell.details && sell.details.length > 0
                ? sell.details.map(d => {
                    const qty = Number(d.qty);
                    const formattedQty = Number.isInteger(qty) ? qty.toString() : qty.toFixed(2);
                    return `${d.material?.name || 'VT'} x${formattedQty}`;
                }).join(', ')
                : '',
            details: sell.details?.map(d => ({
                id: d.id,
                materialId: d.materialsId,
                materialName: d.material?.name || '',
                materialTypeId: d.materialsTypeId,
                qty: d.qty,
                price: d.price,
                amount: d.amount,
            })),
        }));

        return {
            data: mappedData,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Employee picks an order (nhận đơn hàng)
     * - Updates employeeMaintainId to current employee
     * - Sets actionType = EMPLOYEE_NHAN_GIAO_HANG (1)
     */
    async pickOrder(orderId: number, employeeId: number) {
        const sell = await this.sellRepository.findOne({ where: { id: orderId } });

        if (!sell) {
            throw new NotFoundException(`Đơn hàng #${orderId} không tồn tại`);
        }

        // Check if order can be picked
        if (sell.status !== SellStatus.NEW) {
            throw new Error('Đơn hàng này không thể nhận vì đã được xử lý');
        }

        if (sell.employeeMaintainId && sell.employeeMaintainId !== 0) {
            throw new Error('Đơn hàng đã có nhân viên khác nhận');
        }

        // Update order
        sell.employeeMaintainId = employeeId;
        sell.actionType = 1; // EMPLOYEE_NHAN_GIAO_HANG
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateTime = new Date();

        await this.sellRepository.save(sell);

        // Also update all details
        await this.sellDetailRepository.update(
            { sellId: orderId },
            { employeeMaintainId: employeeId }
        );

        return { message: 'Đã nhận đơn hàng thành công', orderId };
    }

    /**
     * Employee cancels picking an order (hủy nhận đơn)
     * - Resets employeeMaintainId to 0
     * - Sets actionType = EMPLOYEE_FREE (0)
     */
    async cancelPick(orderId: number, employeeId: number) {
        const sell = await this.sellRepository.findOne({ where: { id: orderId } });

        if (!sell) {
            throw new NotFoundException(`Đơn hàng #${orderId} không tồn tại`);
        }

        // Check if employee is the one who picked
        if (sell.employeeMaintainId !== employeeId) {
            throw new Error('Bạn không thể hủy nhận đơn hàng này vì không phải bạn nhận');
        }

        // Check if order is still new (not completed/cancelled)
        if (sell.status !== SellStatus.NEW) {
            throw new Error('Không thể hủy nhận đơn hàng đã hoàn thành hoặc đã hủy');
        }

        // Reset order
        sell.employeeMaintainId = 0;
        sell.actionType = 0; // EMPLOYEE_FREE
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateTime = new Date();

        await this.sellRepository.save(sell);

        // Also update all details
        await this.sellDetailRepository.update(
            { sellId: orderId },
            { employeeMaintainId: 0 }
        );

        return { message: 'Đã hủy nhận đơn hàng', orderId };
    }

    /**
     * Employee drops/cancels an order (hủy đơn hàng)
     * - Sets status = CANCEL (3)
     * - Stores cancel reason
     */
    async dropOrder(orderId: number, employeeId: number, statusCancel: number) {
        const sell = await this.sellRepository.findOne({ where: { id: orderId } });

        if (!sell) {
            throw new NotFoundException(`Đơn hàng #${orderId} không tồn tại`);
        }

        // Check if employee is the one who picked
        if (sell.employeeMaintainId !== employeeId) {
            throw new Error('Bạn không thể hủy đơn hàng này vì không phải bạn nhận');
        }

        // Check if order can be cancelled
        if (sell.status !== SellStatus.NEW) {
            throw new Error('Đơn hàng này không thể hủy');
        }

        // Cancel order
        sell.status = SellStatus.CANCEL;
        sell.statusCancel = statusCancel;
        sell.actionType = 3; // EMPLOYEE_DROP
        sell.completeTime = new Date();
        sell.completeTimeBigint = Math.floor(Date.now() / 1000);
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateTime = new Date();

        await this.sellRepository.save(sell);

        return { message: 'Đã hủy đơn hàng', orderId };
    }

    /**
     * Employee completes an order (hoàn thành đơn - thu tiền)
     * - Sets status = PAID (2)
     * - Updates details if provided
     * - Calculates totals
     */
    async completeOrder(
        orderId: number,
        employeeId: number,
        data?: {
            details?: Array<{
                materialsId: number;
                materialsTypeId: number;
                qty: number;
                price: number;
                seri?: number;
            }>;
            promotionAmount?: number;
            ptttCode?: string;
            gasRemain?: number;
            gasRemainAmount?: number;
        }
    ) {
        const sell = await this.sellRepository.findOne({
            where: { id: orderId },
            relations: ['details'],
        });

        if (!sell) {
            throw new NotFoundException(`Đơn hàng #${orderId} không tồn tại`);
        }

        // Check if employee is the one who picked
        if (sell.employeeMaintainId !== employeeId) {
            throw new Error('Bạn không thể hoàn thành đơn hàng này vì không phải bạn nhận');
        }

        // Check if order can be completed
        if (sell.status !== SellStatus.NEW) {
            throw new Error('Đơn hàng này đã được xử lý');
        }

        // Update details if provided
        if (data?.details && data.details.length > 0) {
            // Delete old details and create new ones
            await this.sellDetailRepository.delete({ sellId: orderId });

            let total = 0;
            const detailEntities = data.details.map(detail => {
                const amount = detail.qty * detail.price;
                total += amount;
                return this.sellDetailRepository.create({
                    sellId: orderId,
                    customerId: sell.customerId,
                    agentId: sell.agentId,
                    saleId: sell.saleId || 0,
                    employeeMaintainId: employeeId,
                    uidLogin: sell.uidLogin,
                    typeCustomer: sell.typeCustomer,
                    orderType: sell.orderType,
                    source: sell.source,
                    materialsId: detail.materialsId,
                    materialsTypeId: detail.materialsTypeId,
                    qty: detail.qty,
                    price: detail.price,
                    priceRoot: detail.price,
                    amount,
                    seri: detail.seri || 0,
                    createdDateOnly: sell.createdDateOnly,
                    createdDateOnlyBigint: sell.createdDateOnlyBigint,
                });
            });

            await this.sellDetailRepository.save(detailEntities);

            sell.total = total;
            sell.grandTotal = total - (sell.amountDiscount || 0) - (data.promotionAmount || sell.promotionAmount || 0);
        }

        // Update promotion amount if provided
        if (data?.promotionAmount !== undefined) {
            sell.promotionAmount = data.promotionAmount;
            sell.grandTotal = (sell.total || 0) - (sell.amountDiscount || 0) - data.promotionAmount;
        }

        // Update PTTT code if provided
        if (data?.ptttCode) {
            sell.ptttCode = data.ptttCode;
        }

        // Update gas remain if provided
        if (data?.gasRemain !== undefined) {
            sell.gasRemain = data.gasRemain;
        }
        if (data?.gasRemainAmount !== undefined) {
            sell.gasRemainAmount = data.gasRemainAmount;
        }

        // Complete order
        sell.status = SellStatus.PAID;
        sell.actionType = 5; // EMPLOYEE_COMPLETE
        sell.completeTime = new Date();
        sell.completeTimeBigint = Math.floor(Date.now() / 1000);
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateTime = new Date();

        await this.sellRepository.save(sell);

        return {
            message: 'Đã hoàn thành đơn hàng',
            orderId,
            grandTotal: sell.grandTotal,
        };
    }

    /**
     * Get cancel reasons for mobile app dropdown
     */
    getCancelReasons() {
        return [
            { value: 6, label: 'Không bù vỏ' },
            { value: 7, label: 'KH gọi 2 bên' },
            { value: 2, label: 'Giá cao' },
            { value: 9, label: 'Giao xa' },
            { value: 10, label: 'KH đi có việc' },
            { value: 11, label: 'KH còn gas' },
            { value: 14, label: 'KH nợ tiền' },
            { value: 16, label: 'Gọi khách không nghe máy' },
            { value: 20, label: 'Nhờ đại lý khác giao hỗ trợ' },
        ];
    }
}
