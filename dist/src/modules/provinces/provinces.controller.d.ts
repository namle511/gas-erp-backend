import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
export declare class ProvincesController {
    private readonly provincesService;
    constructor(provincesService: ProvincesService);
    findAll(status?: string, search?: string): Promise<import("../../database/entities").Province[]>;
    getDropdownList(): Promise<import("../../database/entities").Province[]>;
    findOne(id: number): Promise<import("../../database/entities").Province>;
    create(createProvinceDto: CreateProvinceDto): Promise<import("../../database/entities").Province>;
    update(id: number, updateProvinceDto: UpdateProvinceDto): Promise<import("../../database/entities").Province>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
