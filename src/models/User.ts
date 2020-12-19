import mongoose, { Document } from "mongoose";
const {
    Schema
} = mongoose;
export interface UserProps {
    username: string;
    password: string;
    email?: string;
    avatar?: string;
    createdAt: Date;
    columnId: string;
    authorId:string;
}
export const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    columnId: {
        type: String,
        default: Math.floor(Math.random() * 10000000000).toString()
    },
    authorId:{
        type:String,
        default: Math.floor(Math.random() * 10000000000).toString()
    }

})

const User = mongoose.model<UserProps & Document>("users", UserSchema);
export default User;