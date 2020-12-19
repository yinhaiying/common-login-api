
import Router from "koa-router";
import User, { UserSchema } from "../../models/User";

//加密
import { enbcrypt, compare } from "../../utils/bcrypt"
// 生成token
import jsonwebtoken from "jsonwebtoken";
// 加密和解密
import koaJwt from "koa-jwt";
import { jwtSecret } from "../../config/jwtSecret"
const router = new Router();

const jwt = koaJwt({ secret: jwtSecret });
/**
* @route Get  api/users/register
* @desc 注册地址
* @access 接口是公开的
*/

router.post("/register", async (ctx, next) => {
    let { username, password, email } = ctx.request.body;
    console.log("username:", username, password,)
    const userList = await User.find({ username });
    //TODO:各种校验
    if (userList.length > 0) {
        ctx.body = {
            code: 400,
            msg: "用户名重复"
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


router.post("/login", async (ctx, next) => {
    const { username, password } = ctx.request.body;
    const findUser = await User.find({ username });
    if (findUser.length === 0) {
        ctx.body = {
            code: 400,
            msg: "用户名不存在"
        }
        return;
    }
    const user = findUser[0];
    let hash = user.password;
    const checkResult = compare(password, hash);
    if (checkResult) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        const token = jsonwebtoken.sign(payload, jwtSecret, { expiresIn: 3600 });
        ctx.body = {
            code: 200,
            msg: 'success',
            data: {
                token: "Bearer " + token
            }
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '密码错误'
        }
    }
})


router.get("/getUserInfo", jwt, async (ctx) => {
    // jwt将解密后的用户信息放到ctx.state.user中
    const { id } = ctx.state.user;
    const user = await User.findById(id);
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
        }
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "用户不存在"
        }
    }

})



export default router;