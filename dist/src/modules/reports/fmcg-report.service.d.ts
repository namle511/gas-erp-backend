import { Repository } from 'typeorm';
export declare class FmcgReportService {
    private readonly appOrderDetailRepository;
    private readonly sellDetailRepository;
    private readonly materialRepository;
    private readonly oneManyRepository;
    constructor(appOrderDetailRepository: Repository<any>, sellDetailRepository: Repository<any>, materialRepository: Repository<any>, oneManyRepository: Repository<any>);
    getReportDailyFMCG(query: {
        dateFrom: string;
        dateTo: string;
        monitoringId?: number;
        saleId?: number;
    }): Promise<{
        employeeData: Record<number, Record<number, {
            qty: number;
            amount: number;
            target: number;
        }>>;
        dailyData: Record<string, Record<number, Record<number, {
            qty: number;
            amount: number;
        }>>>;
        materials: any[];
        summary: {
            totalQty: number;
            totalAmount: number;
        };
    } | {
        data: never[];
        summary: {};
        employees: never[];
        materials: any[];
    }>;
    private getFMCGMaterials;
    private getMonitorEmployees;
    private getTargets;
    private getOutputFromAppOrder;
    private getOutputFromSell;
    private extractEmployeeIds;
    private mergeOutputData;
}
