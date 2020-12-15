import Router from "koa-router";
import User from "../../models/User"
const router = new Router();

/**
* @route Get  api/users/register
* @desc 注册地址
* @access 接口是公开的
*/

router.post("/register",async (ctx,next) => {
    
})


export default router;