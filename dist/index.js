"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const mongoose_1 = __importDefault(require("mongoose"));
const koa_body_1 = __importDefault(require("koa-body"));
const users_1 = __importDefault(require("./routes/api/users"));
const db_1 = __importDefault(require("./config/db"));
const app = new koa_1.default();
app.use(koa_body_1.default());
const router = new koa_router_1.default();
mongoose_1.default.connect(db_1.default.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongodb 连接成功');
}).catch((err) => {
    console.log('mongodb连接失败:' + err);
});
router.use("/api/users", users_1.default.routes());
app.use(router.routes()).use(router.allowedMethods());
;
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server runnint on port ${port}`);
});
