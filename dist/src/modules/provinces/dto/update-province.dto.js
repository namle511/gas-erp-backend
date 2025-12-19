"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProvinceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_province_dto_1 = require("./create-province.dto");
class UpdateProvinceDto extends (0, mapped_types_1.PartialType)(create_province_dto_1.CreateProvinceDto) {
}
exports.UpdateProvinceDto = UpdateProvinceDto;
//# sourceMappingURL=update-province.dto.js.map