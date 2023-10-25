import { Schema , model } from "mongoose";

const productSchema  = new Schema({
  title:{
    type:String,
    require:true
  } ,
  description:{
    type:String,
  } ,
  price:{
    type:Number,
    require:true
  } ,
  category: {
    type:String,
    require:true
  } ,
  code: {
    type:String,
    require:true
  },
  stock:{
    type: Number,
    default:0,
  } ,
  status: {
    type:String,
    default:true
  } ,
  thumbnails:{
    type:[String],
  } ,
});

export const productsModel = model('Products', productSchema )