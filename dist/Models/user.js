"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const USER = new Schema({
    email: {
        type: String,
        required: true,
        validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/
    },
    psw: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('user', USER);
//# sourceMappingURL=user.js.map