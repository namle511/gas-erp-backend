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
exports.UserProfilesController = void 0;
const common_1 = require("@nestjs/common");
const user_profiles_service_1 = require("./user-profiles.service");
const create_user_profile_dto_1 = require("./dto/create-user-profile.dto");
const update_user_profile_dto_1 = require("./dto/update-user-profile.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UserProfilesController = class UserProfilesController {
    userProfilesService;
    constructor(userProfilesService) {
        this.userProfilesService = userProfilesService;
    }
    getDropdowns() {
        return this.userProfilesService.getAllDropdownOptions();
    }
    findByUserId(userId) {
        return this.userProfilesService.findByUserId(userId);
    }
    findOne(id) {
        return this.userProfilesService.findOne(id);
    }
    create(createDto) {
        return this.userProfilesService.create(createDto);
    }
    update(id, updateDto) {
        return this.userProfilesService.update(id, updateDto);
    }
    upsertByUserId(userId, updateDto) {
        return this.userProfilesService.upsertByUserId(userId, updateDto);
    }
    remove(id) {
        return this.userProfilesService.remove(id);
    }
};
exports.UserProfilesController = UserProfilesController;
__decorate([
    (0, common_1.Get)('dropdowns'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "getDropdowns", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_profile_dto_1.CreateUserProfileDto]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_profile_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_profile_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "upsertByUserId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserProfilesController.prototype, "remove", null);
exports.UserProfilesController = UserProfilesController = __decorate([
    (0, common_1.Controller)('user-profiles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_profiles_service_1.UserProfilesService])
], UserProfilesController);
//# sourceMappingURL=user-profiles.controller.js.map