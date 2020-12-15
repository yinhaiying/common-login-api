import  Koa from "koa";
import  Router from "koa-router";
import  users from "./routes/api/users";
const app = new Koa();
const router = new Router();


router.use("/api/users",users.routes());


app.use(router.routes()).use(router.allowedMethods());;
const port = 3000;
app.listen(port,() => {
    console.log(`server runnint on port ${port}`)
});
