"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("./member.controller");
const router = express_1.default.Router();
router.route("/").get(member_controller_1.getAllMembers).post(member_controller_1.createMember);
router.route("/:id").get(member_controller_1.getMember).put(member_controller_1.updateMember).delete(member_controller_1.deleteMember);
exports.MemberRoutes = router;
