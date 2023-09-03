"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const JOKE = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        require: true
    },
    joke: {
        type: String,
        require: true
    },
    punchLine: {
        type: String
    }
});
exports.default = mongoose_1.default.model('joke', JOKE);
//# sourceMappingURL=joke.js.map