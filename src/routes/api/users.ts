import Router from "koa-router";
import User from "../../models/User"
const router = new Router();

/**
* @route Get  api/users/register
* @desc 注册地址
* @access 接口是公开的
*/

router.post("/register",async (ctx,next) => {
    const {username,password,email} = ctx.request.body;
    console.log("username:",username,password,)
    const userList = await User.find({username});
    if (userList.length >0){
        ctx.body = {
            code:400,
            msg:"用户名重复"
        };
        return;
    }
    const newUser = new User({
        username,
        password,
        email
    });
    // 存储到数据库
    await newUser.save().then((user) => {
        ctx.body = {
            code: 200,
            msg: '注册成功'
        }
    }).catch((error) => {
        ctx.body = {
            code: 500,
            msg: error
        }
    })
    
})


export default router;