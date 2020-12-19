"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ColumnSchema = new Schema({
    columnId: {
        type: String,
        requrie: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requied: true
    },
    avatar: {
        type: String
    }
});
const Column = mongoose_1.default.model("columns", ColumnSchema);
exports.default = Column;
