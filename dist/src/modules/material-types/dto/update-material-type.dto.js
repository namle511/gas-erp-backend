"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaterialTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_material_type_dto_1 = require("./create-material-type.dto");
class UpdateMaterialTypeDto extends (0, mapped_types_1.PartialType)(create_material_type_dto_1.CreateMaterialTypeDto) {
}
exports.UpdateMaterialTypeDto = UpdateMaterialTypeDto;
//# sourceMappingURL=update-material-type.dto.js.map