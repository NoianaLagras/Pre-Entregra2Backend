import { CartModel } from "../models/Cart.model.js";

class CartsManager {
async createCart(){
    const newCart = { products: [] };
    const response = await CartModel.create(newCart)
    return response

}
async findAll(){
    const response  =await CartModel.find().lean();
    return response 
}
async findCartById(idCart){
    const response = await CartModel.findById(idCart)
    return response
}
async deleteCart(id){
    try {
        const response = await CartModel.deleteOne({ _id: id });
        return response;
      } catch (error) {
        throw error;
      }
}
async addProductToCarts (idCart, idProduct){
    const cart = await CartModel.findById(idCart)
    const productIndex = cart.products.findIndex(p=> p.product.toString() === idProduct)
    if (productIndex ===-1){
        cart.products.push({product: idProduct, quantity : 1})
    }else {
        cart.products[productIndex].quantity++;
    }
    return cart.save();
}
async removeProductFromCart(idCart, idProduct) {
    const cart = await CartModel.findById(idCart);

    if (!cart) {
        return null; 
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === idProduct);

    if (productIndex === -1) {
        return null; 
     } else {
           cart.products.splice(productIndex, 1);
        await cart.save();
        return cart;
    }
}
} 
export const cartsManager = new CartsManager();