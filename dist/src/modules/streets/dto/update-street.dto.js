"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStreetDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_street_dto_1 = require("./create-street.dto");
class UpdateStreetDto extends (0, mapped_types_1.PartialType)(create_street_dto_1.CreateStreetDto) {
}
exports.UpdateStreetDto = UpdateStreetDto;
//# sourceMappingURL=update-street.dto.js.map