import Router from "koa-router";
import User, { UserSchema} from "../../models/User";

//加密
import { enbcrypt, compare} from "../../utils/bcrypt"
// 生成token
import jwt from "jsonwebtoken";
const router = new Router();


/**
* @route Get  api/users/register
* @desc 注册地址
* @access 接口是公开的
*/

router.post("/register",async (ctx,next) => {
    let {username,password,email} = ctx.request.body;
    console.log("username:",username,password,)
    const userList = await User.find({username});
    if (userList.length >0){
        ctx.body = {
            code:400,
            msg:"用户名重复"
        };
        return;
    }
    password = await enbcrypt(password);
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


router.post("/login",async (ctx,next) => {
  const {username,password} = ctx.request.body;
  const findUser = await User.find({ username });
  if(findUser.length === 0){
      ctx.body = {
          code:400,
          msg:"用户名不存在"
      }
      return;
  }
  const user = findUser[0];
  let hash = user.password;
  const checkResult = compare(password, hash); 
  if(checkResult){
      const payload = {
          id:user.id,
          username:user.username,
          email:user.email
      }
      const token = jwt.sign(payload, "secret", { expiresIn: 3600 });
      ctx.body = {
          code: 200,
          msg: 'success',
          token: "Bearer " + token
      }
  }else{
      ctx.body = {
          code: 400,
          msg: '密码错误'
      }
  }
})

export default router;