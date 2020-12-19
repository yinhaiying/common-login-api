import Router from "koa-router";
const router = new Router();
import Column from "../../models/Column"
import {jwt} from "../../config/jwtSecret";




// 创建专栏
router.post("/createColumn", jwt, async (ctx) => {
    const { title, avatar, description, columnId } = ctx.request.body;
    if (!title || !description || !columnId ) {
        ctx.body = {
            code: 400,
            data: {},
            msg: "参数不正确"
        }
    } else {

        const column = await Column.find({ columnId: columnId});
        if(column.length > 0){
            ctx.body = {
                code: 400,
                data: {},
                msg: "专栏已存在，无法创建"
            }
        }else{
            const newColumn = new Column({
                title, avatar, description, columnId
            });
            await newColumn.save().then((column) => {
                if (column) {
                    ctx.body = {
                        code: 200,
                        data: {},
                        msg: "success"
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
})


// 获取专栏列表
// TODO:暂时没有处理分页
router.get("/",jwt,async (ctx) => {
    await Column.find().then((res) => {
        if(res){
            ctx.body = {
                code: 200,
                data: res || [],
                msg: "success"
            }
        }
    }).catch((error) => {
        console.log(error);
    })
})

// 获取专栏的详情
router.get("/:id", jwt, async (ctx) => {
    const {id} = ctx.params;
})


export default router;