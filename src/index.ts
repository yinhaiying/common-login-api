import  Koa from "koa";
import  Router from "koa-router";
import  users from "./routes/api/users";
import mongoose from "mongoose";
import dbConfig from "./config/db";
const app = new Koa();
const router = new Router();



mongoose.connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongodb 连接成功');
}).catch((err) => {
    console.log('mongodb连接失败:' + err);
})



router.use("/api/users",users.routes());


app.use(router.routes()).use(router.allowedMethods());;
const port = 3000;
app.listen(port,() => {
    console.log(`server runnint on port ${port}`)
});
