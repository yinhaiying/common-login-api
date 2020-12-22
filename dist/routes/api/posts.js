"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const jwtSecret_1 = require("../../config/jwtSecret");
const Post_1 = __importDefault(require("../../models/Post"));
const jwt = koa_jwt_1.default({ secret: jwtSecret_1.jwtSecret });
router.post("/createPost", jwt, async (ctx) => {
    const { title, avatar, content, columnId, author } = ctx.request.body;
    if (!title || !content || !columnId || !author) {
        ctx.body = {
            code: 400,
            data: {},
            msg: "参数不正确"
        };
    }
    else {
        const newPost = new Post_1.default({
            title, avatar, content, columnId, author
        });
        await newPost.save().then((post) => {
            if (post) {
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
});
/*



*/
router.get("/:id", jwt, async (ctx) => {
    const { id } = ctx.params;
    console.log("id:", id);
    if (!id) {
        ctx.body = {
            code: 400,
            data: {},
            msg: "参数错误"
        };
    }
    else {
        await Post_1.default.findById({ _id: id }).then((post) => {
            console.log("post:", post);
            if (post) {
                ctx.body = {
                    code: 200,
                    data: post,
                    msg: "success"
                };
            }
            else {
                ctx.body = {
                    code: 400,
                    data: {},
                    msg: "文章不存在"
                };
            }
        });
    }
});
exports.default = router;
