import mongoose, { Document } from "mongoose";
const {
    Schema
} = mongoose;
export interface UserProps {
    username:string;
    password:string;
    email?:string;
    avatar?:string;
    date:Date
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
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model<UserProps & Document>("users",UserSchema);
export default User;