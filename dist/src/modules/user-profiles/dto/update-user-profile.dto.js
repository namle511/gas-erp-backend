"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_profile_dto_1 = require("./create-user-profile.dto");
class UpdateUserProfileDto extends (0, mapped_types_1.PartialType)(create_user_profile_dto_1.CreateUserProfileDto) {
}
exports.UpdateUserProfileDto = UpdateUserProfileDto;
//# sourceMappingURL=update-user-profile.dto.js.map