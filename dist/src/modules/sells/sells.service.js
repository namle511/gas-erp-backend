"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sell_entity_1 = require("../../database/entities/sell.entity");
const sell_detail_entity_1 = require("../../database/entities/sell-detail.entity");
let SellsService = class SellsService {
    sellRepository;
    sellDetailRepository;
    constructor(sellRepository, sellDetailRepository) {
        this.sellRepository = sellRepository;
        this.sellDetailRepository = sellDetailRepository;
    }
    getStatusLabels() {
        return {
            [sell_entity_1.SellStatus.NEW]: 'Mới',
            [sell_entity_1.SellStatus.PAID]: 'Hoàn thành',
            [sell_entity_1.SellStatus.CANCEL]: 'Hủy',
        };
    }
    getOrderTypeLabels() {
        return {
            [sell_entity_1.SellOrderType.NORMAL]: 'Bình thường',
            [sell_entity_1.SellOrderType.BO_BINH]: 'Bộ bình',
            [sell_entity_1.SellOrderType.THE_CHAN]: 'Thế chân',
            [sell_entity_1.SellOrderType.THU_VO]: 'Thu vỏ',
            [sell_entity_1.SellOrderType.BAN_GAS_VO]: 'Gas + Vỏ',
            [sell_entity_1.SellOrderType.WATER]: 'Bán nước uống',
            [sell_entity_1.SellOrderType.WATER_THE_CHAN]: 'Thế chân vỏ nước',
            [sell_entity_1.SellOrderType.WATER_THU_VO]: 'Thu vỏ nước',
            [sell_entity_1.SellOrderType.FREE]: 'Tặng KH',
            [sell_entity_1.SellOrderType.CONSUMER_GOODS]: 'Hàng tiêu dùng',
            [sell_entity_1.SellOrderType.ELECTRIC]: 'Hàng điện máy',
            [sell_entity_1.SellOrderType.GIAT_UI]: 'Giặt ủi',
        };
    }
    getSourceLabels() {
        return {
            [sell_entity_1.SellSource.WINDOW]: 'PMBH',
            [sell_entity_1.SellSource.APP]: 'APP',
            [sell_entity_1.SellSource.WEB]: 'Call Center',
            [sell_entity_1.SellSource.AUTO_SALES]: 'Auto Sales',
            [sell_entity_1.SellSource.MOMO]: 'Momo',
            [sell_entity_1.SellSource.SENDO]: 'Sendo',
            [sell_entity_1.SellSource.TIKI]: 'Tiki',
            [sell_entity_1.SellSource.HIFPT]: 'Hifpt',
            [sell_entity_1.SellSource.WEB_GAS24H]: 'WebGas24h',
            [sell_entity_1.SellSource.TECHRES]: 'Techres',
        };
    }
    getPaymentTypeLabels() {
        return {
            [sell_entity_1.SellPaymentType.CASH]: 'Tiền mặt',
            [sell_entity_1.SellPaymentType.VNPAY]: 'VNPay',
            [sell_entity_1.SellPaymentType.MOMO]: 'MOMO',
            [sell_entity_1.SellPaymentType.SENDO]: 'Sendo',
            [sell_entity_1.SellPaymentType.NAPAS]: 'Napas',
            [sell_entity_1.SellPaymentType.TIKI]: 'Tiki',
            [sell_entity_1.SellPaymentType.HIFPT]: 'Hifpt',
            [sell_entity_1.SellPaymentType.QR_BANK_TRANSFER]: 'QR Code chuyển khoản',
        };
    }
    async findAll(query) {
        const { page = 1, limit = 20, status, orderType, source, agentId, customerId, dateFrom, dateTo, codeNo, sortBy = 'id', sortOrder = 'DESC', } = query;
        const where = {};
        if (status)
            where.status = status;
        if (orderType)
            where.orderType = orderType;
        if (source)
            where.source = source;
        if (agentId)
            where.agentId = agentId;
        if (customerId)
            where.customerId = customerId;
        if (codeNo)
            where.codeNo = (0, typeorm_2.Like)(`%${codeNo}%`);
        if (dateFrom && dateTo) {
            where.createdDateOnly = (0, typeorm_2.Between)(new Date(dateFrom), new Date(dateTo));
        }
        else if (dateFrom) {
            where.createdDateOnly = (0, typeorm_2.Between)(new Date(dateFrom), new Date());
        }
        let data = [];
        let total = 0;
        try {
            [data, total] = await this.sellRepository.findAndCount({
                where,
                relations: ['customer', 'agent', 'employeeMaintain', 'sale', 'details', 'details.material', 'userLogin'],
                order: { [sortBy]: sortOrder },
                skip: (page - 1) * limit,
                take: limit,
            });
        }
        catch (error) {
            console.error('Error in findAll sells:', error);
            [data, total] = await this.sellRepository.findAndCount({
                where,
                order: { [sortBy]: sortOrder },
                skip: (page - 1) * limit,
                take: limit,
            });
        }
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
            agentName: sell.agent?.firstName || sell.agent?.nameAgent || sell.agent?.username || '',
            employeeMaintainName: sell.employeeMaintain
                ? `${sell.employeeMaintain.lastName || ''} ${sell.employeeMaintain.firstName || ''}`.trim()
                : '',
            materialsSummary: sell.details && sell.details.length > 0
                ? sell.details.map(d => {
                    const qty = Number(d.qty);
                    const formattedQty = Number.isInteger(qty) ? qty.toString() : qty.toFixed(2);
                    return `${d.material?.name || 'VT'} x${formattedQty}`;
                }).join(', ')
                : '',
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
    async findOne(id) {
        let sell = null;
        try {
            sell = await this.sellRepository.findOne({
                where: { id },
                relations: ['customer', 'agent', 'employeeMaintain', 'sale', 'userLogin', 'details', 'details.material'],
            });
        }
        catch (error) {
            console.error('Error in findOne sell:', error);
            sell = await this.sellRepository.findOne({
                where: { id },
            });
        }
        if (!sell) {
            throw new common_1.NotFoundException(`Đơn hàng #${id} không tồn tại`);
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
    async create(createSellDto, userId) {
        const now = new Date();
        const dateOnly = createSellDto.createdDateOnly
            ? new Date(createSellDto.createdDateOnly)
            : new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const codeNo = await this.generateCodeNo();
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
        const sell = this.sellRepository.create({
            codeNo,
            customerId: createSellDto.customerId,
            agentId: createSellDto.agentId,
            saleId: createSellDto.saleId,
            employeeMaintainId: createSellDto.employeeMaintainId,
            typeCustomer: createSellDto.typeCustomer || 1,
            orderType: createSellDto.orderType || sell_entity_1.SellOrderType.NORMAL,
            source: createSellDto.source || sell_entity_1.SellSource.WEB,
            paymentType: createSellDto.paymentType || sell_entity_1.SellPaymentType.CASH,
            phone: parseInt(createSellDto.phone?.replace(/\D/g, '') || '0'),
            address: createSellDto.address,
            note: createSellDto.note,
            provinceId: createSellDto.provinceId,
            amountDiscount,
            promotionAmount,
            total,
            grandTotal,
            status: sell_entity_1.SellStatus.NEW,
            uidLogin: userId,
            createdDateOnly: dateOnly,
            createdDate: now,
            deliveryTimer: createSellDto.deliveryTimer ? new Date(createSellDto.deliveryTimer) : null,
            isTimer: createSellDto.deliveryTimer ? 1 : 0,
        });
        const savedSell = await this.sellRepository.save(sell);
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
                    orderType: createSellDto.orderType || sell_entity_1.SellOrderType.NORMAL,
                    source: createSellDto.source || sell_entity_1.SellSource.WEB,
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
                });
            });
            await this.sellDetailRepository.save(detailEntities);
        }
        return this.findOne(savedSell.id);
    }
    async update(id, updateSellDto, userId) {
        const sell = await this.sellRepository.findOne({ where: { id } });
        if (!sell) {
            throw new common_1.NotFoundException(`Đơn hàng #${id} không tồn tại`);
        }
        Object.assign(sell, {
            ...updateSellDto,
            lastUpdateBy: userId,
            lastUpdateTime: new Date(),
        });
        if (updateSellDto.details && updateSellDto.details.length > 0) {
            await this.sellDetailRepository.delete({ sellId: id });
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
                });
            });
            await this.sellDetailRepository.save(detailEntities);
            sell.total = total;
            sell.grandTotal = total - (sell.amountDiscount || 0) - (sell.promotionAmount || 0);
        }
        await this.sellRepository.save(sell);
        return this.findOne(id);
    }
    async updateStatus(id, status, userId, statusCancel) {
        const sell = await this.sellRepository.findOne({ where: { id } });
        if (!sell) {
            throw new common_1.NotFoundException(`Đơn hàng #${id} không tồn tại`);
        }
        sell.status = status;
        sell.lastUpdateBy = userId;
        sell.lastUpdateTime = new Date();
        if (status === sell_entity_1.SellStatus.PAID) {
            sell.completeTime = new Date();
        }
        if (status === sell_entity_1.SellStatus.CANCEL && statusCancel) {
            sell.statusCancel = statusCancel;
        }
        await this.sellRepository.save(sell);
        return this.findOne(id);
    }
    async remove(id) {
        const sell = await this.sellRepository.findOne({ where: { id } });
        if (!sell) {
            throw new common_1.NotFoundException(`Đơn hàng #${id} không tồn tại`);
        }
        await this.sellDetailRepository.delete({ sellId: id });
        await this.sellRepository.remove(sell);
        return { message: `Đã xóa đơn hàng #${id}` };
    }
    async generateCodeNo() {
        const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
        const year = new Date().getFullYear().toString().slice(-2);
        const prefix = `S${year}`;
        const generateRandomString = (length) => {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
            }
            return result;
        };
        let maxAttempts = 100;
        while (maxAttempts > 0) {
            const codeNo = `${prefix}${generateRandomString(7)}`;
            const existing = await this.sellRepository.findOne({
                where: { codeNo },
            });
            if (!existing) {
                return codeNo;
            }
            maxAttempts--;
        }
        const timestamp = Date.now().toString(36).toUpperCase();
        return `${prefix}${timestamp.slice(-7).padStart(7, '0')}`;
    }
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
    async getReport(query) {
        const { dateFrom, dateTo, groupBy, status } = query;
        let qb = this.sellDetailRepository.createQueryBuilder('detail')
            .innerJoin('detail.sell', 'sell')
            .leftJoin('sell.agent', 'agent')
            .leftJoin('sell.userLogin', 'creator')
            .leftJoin('gas_gas_province', 'province', 'province.id = sell.provinceId')
            .leftJoin('detail.material', 'material');
        if (dateFrom) {
            qb = qb.andWhere('sell.createdDateOnly >= :dateFrom', { dateFrom });
        }
        if (dateTo) {
            qb = qb.andWhere('sell.createdDateOnly <= :dateTo', { dateTo });
        }
        if (status !== undefined) {
            qb = qb.andWhere('sell.status = :status', { status });
        }
        let selectFields;
        let groupByFields;
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
    async getDashboard(query) {
        const { dateFrom, dateTo, provinceId, agentId, materialId, status } = query;
        const buildWhereClause = (qb, alias = 'sell') => {
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
        const formatRow = (row) => ({
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
    async getMobileOrders(employeeId, agentId, query) {
        const { page = 1, limit = 20, tab = 'new' } = query;
        try {
            const where = {
                status: tab === 'cancelled' ? sell_entity_1.SellStatus.CANCEL :
                    (tab === 'completed' ? sell_entity_1.SellStatus.PAID : sell_entity_1.SellStatus.NEW),
            };
            if (agentId && agentId > 0) {
                where.agentId = agentId;
            }
            if (tab === 'new') {
            }
            else if (tab === 'my' || tab === 'completed') {
                where.employeeMaintainId = employeeId;
            }
            const [data, total] = await this.sellRepository.findAndCount({
                where,
                select: [
                    'id', 'codeNo', 'status', 'orderType', 'grandTotal', 'createdDate',
                    'deliveryTimer', 'isTimer', 'note', 'employeeMaintainId', 'agentId',
                    'phone', 'address', 'customerId'
                ],
                relations: ['customer'],
                order: { id: 'DESC' },
                skip: (page - 1) * limit,
                take: limit,
            });
            let filteredData = data;
            let filteredTotal = total;
            if (tab === 'new') {
                filteredData = data.filter(sell => !sell.employeeMaintainId || sell.employeeMaintainId === 0);
            }
            const statusLabels = this.getStatusLabels();
            const orderTypeLabels = this.getOrderTypeLabels();
            const mappedData = filteredData.map(sell => ({
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
                materialsSummary: '',
                details: [],
            }));
            return {
                data: mappedData,
                meta: {
                    total: filteredTotal,
                    page,
                    limit,
                    totalPages: Math.ceil(filteredTotal / limit),
                },
            };
        }
        catch (error) {
            console.error('Error in getMobileOrders:', error);
            throw error;
        }
    }
    async pickOrder(orderId, employeeId) {
        const sell = await this.sellRepository.findOne({ where: { id: orderId } });
        if (!sell) {
            throw new common_1.NotFoundException(`Đơn hàng #${orderId} không tồn tại`);
        }
        if (sell.status !== sell_entity_1.SellStatus.NEW) {
            throw new Error('Đơn hàng này không thể nhận vì đã được xử lý');
        }
        if (sell.employeeMaintainId && sell.employeeMaintainId !== 0) {
            throw new Error('Đơn hàng đã có nhân viên khác nhận');
        }
        sell.employeeMaintainId = employeeId;
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateTime = new Date();
        await this.sellRepository.save(sell);
        await this.sellDetailRepository.update({ sellId: orderId }, { employeeMaintainId: employeeId });
        return { message: 'Đã nhận đơn hàng thành công', orderId };
    }
    async cancelPick(orderId, employeeId) {
        const sell = await this.sellRepository.findOne({ where: { id: orderId } });
        if (!sell) {
            throw new common_1.NotFoundException(`Đơn hàng #${orderId} không tồn tại`);
        }
        if (sell.employeeMaintainId !== employeeId) {
            throw new Error('Bạn không thể hủy nhận đơn hàng này vì không phải bạn nhận');
        }
        if (sell.status !== sell_entity_1.SellStatus.NEW) {
            throw new Error('Không thể hủy nhận đơn hàng đã hoàn thành hoặc đã hủy');
        }
        sell.employeeMaintainId = 0;
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateTime = new Date();
        await this.sellRepository.save(sell);
        await this.sellDetailRepository.update({ sellId: orderId }, { employeeMaintainId: 0 });
        return { message: 'Đã hủy nhận đơn hàng', orderId };
    }
    async dropOrder(orderId, employeeId, statusCancel) {
        const sell = await this.sellRepository.findOne({ where: { id: orderId } });
        if (!sell) {
            throw new common_1.NotFoundException(`Đơn hàng #${orderId} không tồn tại`);
        }
        if (sell.employeeMaintainId !== employeeId) {
            throw new Error('Bạn không thể hủy đơn hàng này vì không phải bạn nhận');
        }
        if (sell.status !== sell_entity_1.SellStatus.NEW) {
            throw new Error('Đơn hàng này không thể hủy');
        }
        sell.status = sell_entity_1.SellStatus.CANCEL;
        sell.statusCancel = statusCancel;
        sell.completeTime = new Date();
        sell.completeTime = new Date();
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateTime = new Date();
        await this.sellRepository.save(sell);
        return { message: 'Đã hủy đơn hàng', orderId };
    }
    async completeOrder(orderId, employeeId, data) {
        const sell = await this.sellRepository.findOne({
            where: { id: orderId },
            relations: ['details'],
        });
        if (!sell) {
            throw new common_1.NotFoundException(`Đơn hàng #${orderId} không tồn tại`);
        }
        if (sell.employeeMaintainId !== employeeId) {
            throw new Error('Bạn không thể hoàn thành đơn hàng này vì không phải bạn nhận');
        }
        if (sell.status !== sell_entity_1.SellStatus.NEW) {
            throw new Error('Đơn hàng này đã được xử lý');
        }
        if (data?.details && data.details.length > 0) {
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
                });
            });
            await this.sellDetailRepository.save(detailEntities);
            sell.total = total;
            sell.grandTotal = total - (sell.amountDiscount || 0) - (data.promotionAmount || sell.promotionAmount || 0);
        }
        if (data?.promotionAmount !== undefined) {
            sell.promotionAmount = data.promotionAmount;
            sell.grandTotal = (sell.total || 0) - (sell.amountDiscount || 0) - data.promotionAmount;
        }
        if (data?.ptttCode) {
            sell.ptttCode = data.ptttCode;
        }
        if (data?.gasRemain !== undefined) {
            sell.gasRemain = data.gasRemain;
        }
        if (data?.gasRemainAmount !== undefined) {
            sell.gasRemainAmount = data.gasRemainAmount;
        }
        sell.status = sell_entity_1.SellStatus.PAID;
        sell.completeTime = new Date();
        sell.lastUpdateBy = employeeId;
        sell.lastUpdateTime = new Date();
        await this.sellRepository.save(sell);
        return {
            message: 'Đã hoàn thành đơn hàng',
            orderId,
            grandTotal: sell.grandTotal,
        };
    }
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
};
exports.SellsService = SellsService;
exports.SellsService = SellsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sell_entity_1.Sell)),
    __param(1, (0, typeorm_1.InjectRepository)(sell_detail_entity_1.SellDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SellsService);
//# sourceMappingURL=sells.service.js.map