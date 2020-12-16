"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.enbcrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
exports.enbcrypt = (password) => {
    return bcrypt_1.default.hash(password, saltRounds);
};
exports.compare = (password, hash) => {
    return bcrypt_1.default.compare(password, hash);
};
