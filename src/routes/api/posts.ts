import Router from "koa-router";
const router = new Router();
import post from "../../models/Post"

import koaJwt from "koa-jwt";
import { jwtSecret } from "../../config/jwtSecret"
import Post from "../../models/Post";
const jwt = koaJwt({ secret: jwtSecret });



router.post("/createPost",jwt,async(ctx) => {
    const { title, avatar, content,columnId,author} = ctx.request.body;
    if(!title || !content || !columnId||!author){
        ctx.body = {
            code:400,
            data:{},
            msg:"参数不正确"
        }
    }else{
        const newPost = new Post({
            title, avatar, content, columnId, author
        });
        await newPost.save().then((post) => {
            if(post){
                ctx.body = {
                    code:200,
                    data:{},
                    msg:"success"
                }
            }
        }).catch((error )=> {
            console.log(error);
        })

    }
})

/* 



*/
router.get("/:id", jwt, async (ctx) => {
    const { id } = ctx.params;
    console.log("id:",id)
    if (!id) {
        ctx.body = {
            code: 400,
            data: {},
            msg: "参数错误"
        }
    } else {
       await Post.findById({_id:id}).then((post) => {
            console.log("post:",post)
          if(post){
              ctx.body = {
                  code:200,
                  data:post,
                  msg:"success"
              }
          }else{
              ctx.body = {
                  code: 400,
                  data: {},
                  msg: "文章不存在"
              }
          }
        })

    }
})


export default router;