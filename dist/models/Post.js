"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    avatar: String,
    content: {
        type: String,
        required: true
    },
    columnId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Post = mongoose_1.default.model("posts", PostSchema);
exports.default = Post;
