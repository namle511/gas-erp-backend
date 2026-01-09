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
exports.FmcgReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let FmcgReportService = class FmcgReportService {
    appOrderDetailRepository;
    sellDetailRepository;
    materialRepository;
    oneManyRepository;
    constructor(appOrderDetailRepository, sellDetailRepository, materialRepository, oneManyRepository) {
        this.appOrderDetailRepository = appOrderDetailRepository;
        this.sellDetailRepository = sellDetailRepository;
        this.materialRepository = materialRepository;
        this.oneManyRepository = oneManyRepository;
    }
    async getReportDailyFMCG(query) {
        const { dateFrom, dateTo, monitoringId, saleId } = query;
        const [fmcgMaterials, monitorEmployees, targets,] = await Promise.all([
            this.getFMCGMaterials(),
            this.getMonitorEmployees(monitoringId),
            this.getTargets(dateFrom),
        ]);
        const materialIds = fmcgMaterials.map(m => m.id);
        const employeeIds = this.extractEmployeeIds(monitorEmployees);
        if (employeeIds.length === 0) {
            return { data: [], summary: {}, employees: [], materials: fmcgMaterials };
        }
        const [appOrderOutput, sellOutput,] = await Promise.all([
            this.getOutputFromAppOrder(dateFrom, dateTo, employeeIds, materialIds),
            this.getOutputFromSell(dateFrom, dateTo, employeeIds, materialIds),
        ]);
        const result = this.mergeOutputData(monitorEmployees, targets, appOrderOutput, sellOutput, fmcgMaterials);
        return result;
    }
    async getFMCGMaterials() {
        const fmcgTypeIds = [5, 6, 7];
        return this.materialRepository
            .createQueryBuilder('m')
            .where('m.materials_type_id IN (:...types)', { types: fmcgTypeIds })
            .andWhere('m.status = 1')
            .select(['m.id', 'm.name', 'm.materials_type_id', 'm.exchange_materials_id', 'm.exchange_qty'])
            .getMany();
    }
    async getMonitorEmployees(monitoringId) {
        const qb = this.oneManyRepository.createQueryBuilder('om')
            .leftJoinAndSelect('om.many', 'employee')
            .where('om.type IN (:...types)', {
            types: [1, 2, 3, 4]
        })
            .andWhere('employee.status = 1');
        if (monitoringId) {
            qb.andWhere('om.one_id = :monitoringId', { monitoringId });
        }
        return qb.getMany();
    }
    async getTargets(dateFrom) {
        const date = new Date(dateFrom);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return this.oneManyRepository
            .createQueryBuilder('om')
            .where('om.type = :type', { type: 8 })
            .andWhere('MONTH(om.date_apply) = :month', { month })
            .andWhere('YEAR(om.date_apply) = :year', { year })
            .select(['om.one_id', 'om.many_id', 'om.other_value'])
            .getMany();
    }
    async getOutputFromAppOrder(dateFrom, dateTo, employeeIds, materialIds) {
        const dateFromTs = Math.floor(new Date(dateFrom).getTime() / 1000);
        const dateToTs = Math.floor(new Date(dateTo).getTime() / 1000) + 86400;
        return this.appOrderDetailRepository
            .createQueryBuilder('d')
            .innerJoin('d.order', 'o')
            .leftJoin('o.customer', 'c')
            .where('d.date_delivery_bigint >= :dateFrom', { dateFrom: dateFromTs })
            .andWhere('d.date_delivery_bigint < :dateTo', { dateTo: dateToTs })
            .andWhere('o.status = :status', { status: 5 })
            .andWhere('d.materials_id IN (:...mats)', { mats: materialIds })
            .andWhere('d.price > 0')
            .andWhere('d.discount_amount = 0')
            .andWhere('(c.sale_id IN (:...emps) OR o.uid_login IN (:...emps))', { emps: employeeIds })
            .select([
            'COALESCE(c.sale_id, o.uid_login) as employeeId',
            'd.materials_id as materialId',
            'd.materials_type_id as materialTypeId',
            'DATE(FROM_UNIXTIME(d.date_delivery_bigint)) as deliveryDate',
            'SUM(d.qty) as qty',
            'SUM(d.amount) as amount',
        ])
            .groupBy('employeeId, d.materials_id, d.materials_type_id, deliveryDate')
            .getRawMany();
    }
    async getOutputFromSell(dateFrom, dateTo, employeeIds, materialIds) {
        return this.sellDetailRepository
            .createQueryBuilder('d')
            .innerJoin('d.sell', 's')
            .leftJoin('s.customer', 'c')
            .where('s.created_date_only >= :dateFrom', { dateFrom })
            .andWhere('s.created_date_only <= :dateTo', { dateTo })
            .andWhere('s.status = :status', { status: 2 })
            .andWhere('d.materials_id IN (:...mats)', { mats: materialIds })
            .andWhere('d.price > 0')
            .andWhere('c.sale_id IN (:...emps)', { emps: employeeIds })
            .select([
            'c.sale_id as employeeId',
            'd.materials_id as materialId',
            's.created_date_only as deliveryDate',
            'SUM(d.qty) as qty',
            'SUM(d.amount) as amount',
        ])
            .groupBy('c.sale_id, d.materials_id, s.created_date_only')
            .getRawMany();
    }
    extractEmployeeIds(monitorEmployees) {
        const ids = new Set();
        monitorEmployees.forEach(m => {
            ids.add(m.one_id);
            ids.add(m.many_id);
        });
        return Array.from(ids);
    }
    mergeOutputData(monitorEmployees, targets, appOrderOutput, sellOutput, materials) {
        const employeeData = {};
        const dailyData = {};
        const targetMap = {};
        targets.forEach(t => {
            targetMap[`${t.one_id}-${t.many_id}`] = Number(t.other_value);
        });
        appOrderOutput.forEach(row => {
            const empId = row.employeeId;
            const matId = row.materialId;
            const date = row.deliveryDate;
            if (!employeeData[empId])
                employeeData[empId] = {};
            if (!employeeData[empId][matId]) {
                employeeData[empId][matId] = { qty: 0, amount: 0, target: targetMap[`${empId}-${matId}`] || 0 };
            }
            employeeData[empId][matId].qty += Number(row.qty);
            employeeData[empId][matId].amount += Number(row.amount);
            if (!dailyData[date])
                dailyData[date] = {};
            if (!dailyData[date][empId])
                dailyData[date][empId] = {};
            if (!dailyData[date][empId][matId])
                dailyData[date][empId][matId] = { qty: 0, amount: 0 };
            dailyData[date][empId][matId].qty += Number(row.qty);
            dailyData[date][empId][matId].amount += Number(row.amount);
        });
        sellOutput.forEach(row => {
            const empId = row.employeeId;
            const matId = row.materialId;
            const date = row.deliveryDate;
            if (!employeeData[empId])
                employeeData[empId] = {};
            if (!employeeData[empId][matId]) {
                employeeData[empId][matId] = { qty: 0, amount: 0, target: targetMap[`${empId}-${matId}`] || 0 };
            }
            employeeData[empId][matId].qty += Number(row.qty);
            employeeData[empId][matId].amount += Number(row.amount);
            if (!dailyData[date])
                dailyData[date] = {};
            if (!dailyData[date][empId])
                dailyData[date][empId] = {};
            if (!dailyData[date][empId][matId])
                dailyData[date][empId][matId] = { qty: 0, amount: 0 };
            dailyData[date][empId][matId].qty += Number(row.qty);
            dailyData[date][empId][matId].amount += Number(row.amount);
        });
        let totalQty = 0;
        let totalAmount = 0;
        Object.values(employeeData).forEach(emp => {
            Object.values(emp).forEach(mat => {
                totalQty += mat.qty;
                totalAmount += mat.amount;
            });
        });
        return {
            employeeData,
            dailyData,
            materials,
            summary: { totalQty, totalAmount },
        };
    }
};
exports.FmcgReportService = FmcgReportService;
exports.FmcgReportService = FmcgReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)('gas_app_order_c_detail_real')),
    __param(1, (0, typeorm_1.InjectRepository)('gas_sell_detail')),
    __param(2, (0, typeorm_1.InjectRepository)('gas_materials')),
    __param(3, (0, typeorm_1.InjectRepository)('gas_one_many')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FmcgReportService);
//# sourceMappingURL=fmcg-report.service.js.map