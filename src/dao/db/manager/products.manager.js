import { productsModel } from "../models/Product.model.js";
class ProductManager {
    async findAll(){
    const result = await productsModel.find().lean();
    return result
    }
    async findById(id){
        const result = await productsModel.findById(id)
        return result

    }
    async createOne(obj){
        const result = await productsModel.create(obj)
        return result
    }
    async updatedOne(id, obj) {
        const result = await productsModel.updateOne({ _id: id }, obj);
        return result;
    }
    async deleteOne(id) {
        try {
          const result = await productsModel.deleteOne({ _id: id });
          return result;
        } catch (error) {
          throw error;
        }
    }
}

export const productManager = new ProductManager();