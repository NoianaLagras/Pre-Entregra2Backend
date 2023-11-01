import { Schema , model } from "mongoose";

const MessageSchema  = new Schema({
email:{
    type:String,
    require:true,
    index: true,
},
message:{
    type:String,
    require:true
}
})

export const MessageModel = model('Chat', MessageSchema )