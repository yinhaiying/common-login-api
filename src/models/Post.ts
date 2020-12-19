import mongoose, { Document } from "mongoose";
const {
    Schema
} = mongoose;


interface PostProps{
    title:string;
    avatar?:string;
    content:string;
    columnId:string;
    author:string;
    createdAt:Date;
}

const PostSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    avatar:String,
    content:{
        type:String,
        required:true
    },
    columnId:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const Post = mongoose.model<PostProps & Document>("posts", PostSchema);

export default Post;