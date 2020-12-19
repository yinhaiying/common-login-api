"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = exports.jwtSecret = void 0;
const koa_jwt_1 = __importDefault(require("koa-jwt"));
exports.jwtSecret = "secret";
exports.jwt = koa_jwt_1.default({ secret: exports.jwtSecret });
