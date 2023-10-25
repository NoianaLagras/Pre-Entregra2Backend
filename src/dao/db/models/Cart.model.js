import { Schema, SchemaTypes, model } from "mongoose";

const CartSchema  = new Schema({
    products:[
       { 
        product:{
        type: SchemaTypes.ObjectId,
        ref: 'products',
        },

        quantity:{
            type:Number,
        },
        _id:false,
    }
 ]
})
    
    export const CartModel = model('Carts', CartSchema )