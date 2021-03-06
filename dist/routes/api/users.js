"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const User_1 = __importDefault(require("../../models/User"));
//加密
const bcrypt_1 = require("../../utils/bcrypt");
// 生成token
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 加密和解密
const jwtSecret_1 = require("../../config/jwtSecret");
const router = new koa_router_1.default();
/**
* @route Get  api/users/register
* @desc 注册地址
* @access 接口是公开的
*/
router.post("/register", async (ctx, next) => {
    let { username, password, email } = ctx.request.body;
    console.log("username:", username, password);
    const userList = await User_1.default.find({ username });
    //TODO:各种校验
    if (userList.length > 0) {
        ctx.body = {
            code: 400,
            msg: "用户名重复"
        };
        return;
    }
    password = await bcrypt_1.enbcrypt(password);
    const newUser = new User_1.default({
        username,
        password,
        email
    });
    // 存储到数据库
    await newUser.save().then((user) => {
        ctx.body = {
            code: 200,
            msg: '注册成功'
        };
    }).catch((error) => {
        ctx.body = {
            code: 500,
            msg: error
        };
    });
});
router.post("/login", async (ctx, next) => {
    const { username, password } = ctx.request.body;
    const findUser = await User_1.default.find({ username });
    if (findUser.length === 0) {
        ctx.body = {
            code: 400,
            msg: "用户名不存在"
        };
        return;
    }
    const user = findUser[0];
    let hash = user.password;
    const checkResult = bcrypt_1.compare(password, hash);
    if (checkResult) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(payload, jwtSecret_1.jwtSecret, { expiresIn: 3600 });
        ctx.body = {
            code: 200,
            msg: 'success',
            data: {
                token: "Bearer " + token
            }
        };
    }
    else {
        ctx.body = {
            code: 400,
            msg: '密码错误'
        };
    }
});
router.get("/getUserInfo", jwtSecret_1.jwt, async (ctx) => {
    // jwt将解密后的用户信息放到ctx.state.user中
    const { id } = ctx.state.user;
    const user = await User_1.default.findById(id);
    if (user) {
        const { username, columnId, authorId, email, createdAt, _id } = user;
        ctx.body = {
            code: 200,
            data: {
                username,
                columnId,
                authorId,
                email,
                createdAt,
                _id
            },
            msg: "success"
        };
    }
    else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "用户不存在"
        };
    }
});
exports.default = router;
