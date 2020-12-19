
import mongoose, { Document } from 'mongoose';

const {
    Schema
} = mongoose;



const ColumnSchema = new Schema({
    columnId: {
        type: String,
        requrie:true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requied:true
    },
    avatar: {
        type: String
    }
})

const Column = mongoose.model<Document>("columns", ColumnSchema);

export default Column;