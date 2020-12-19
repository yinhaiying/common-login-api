import  Koa from "koa";
import  Router from "koa-router";
import mongoose from "mongoose";
import kodBody  from "koa-body";
import  users from "./routes/api/users";
import posts from "./routes/api/posts";
import columns from "./routes/api/columns";

import dbConfig from "./config/db";
import cors from "koa2-cors";
const app = new Koa();
app.use(kodBody())
const router = new Router();


app.use(cors());



mongoose.connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongodb 连接成功');
}).catch((err) => {
    console.log('mongodb连接失败:' + err);
})






router.use("/api/users",users.routes());
router.use("/api/posts",posts.routes());
router.use("/api/columns",columns.routes());





app.use(router.routes()).use(router.allowedMethods());;
const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`server runnint on port ${port}`)
});
