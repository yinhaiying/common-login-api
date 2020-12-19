"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
const Column_1 = __importDefault(require("../../models/Column"));
const jwtSecret_1 = require("../../config/jwtSecret");
const Post_1 = __importDefault(require("../../models/Post"));
// 创建专栏
router.post("/createColumn", jwtSecret_1.jwt, async (ctx) => {
    const { title, avatar, description, columnId } = ctx.request.body;
    if (!title || !description || !columnId) {
        ctx.body = {
            code: 400,
            data: {},
            msg: "参数不正确"
        };
    }
    else {
        const column = await Column_1.default.find({ columnId: columnId });
        if (column.length > 0) {
            ctx.body = {
                code: 400,
                data: {},
                msg: "专栏已存在，无法创建"
            };
        }
        else {
            const newColumn = new Column_1.default({
                title, avatar, description, columnId
            });
            await newColumn.save().then((column) => {
                if (column) {
                    ctx.body = {
                        code: 200,
                        data: {},
                        msg: "success"
                    };
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
});
// 获取专栏列表
// TODO:暂时没有处理分页
router.get("/", jwtSecret_1.jwt, async (ctx) => {
    await Column_1.default.find().then((res) => {
        if (res) {
            ctx.body = {
                code: 200,
                data: res || [],
                msg: "success"
            };
        }
    }).catch((error) => {
        console.log(error);
    });
});
// 获取专栏的详情
router.get("/:id/posts", async (ctx) => {
    const { id } = ctx.params;
    await Post_1.default.find({ columnId: id }).then((res) => {
        if (res) {
            ctx.body = {
                code: 200,
                data: {
                    list: res,
                    msg: "success"
                }
            };
        }
    }).catch((error) => {
        console.log(error);
    });
});
exports.default = router;
