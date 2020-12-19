"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    columnId: {
        type: String,
        default: Math.floor(Math.random() * 10000000000).toString()
    },
    authorId: {
        type: String,
        default: Math.floor(Math.random() * 10000000000).toString()
    }
});
const User = mongoose_1.default.model("users", exports.UserSchema);
exports.default = User;
