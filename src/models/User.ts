import mongoose from "mongoose";
const {
    Schema
} = mongoose;

const UserSchema = new Schema({
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

const User = mongoose.model("users",UserSchema);
export default User;