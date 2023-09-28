import {existsSync , promises} from 'fs';
import { ProductManager } from './ProductManager.js';
import __dirname from './utils.js';

const productManager = new ProductManager(`${__dirname}../Products.JSON`);

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }
// obtener carritos
  async getCarts() {
    try {
      if (existsSync(this.path)) {
        const cartsFile = await promises.readFile(this.path, 'utf-8');
        return JSON.parse(cartsFile);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al leer archivo', error);
      throw error;
    }
  }
// crear carritos
  async createCart() {
    try {
      const carts = await this.getCarts();
      let id;
      if (!carts.length) {
        id = 1;
      } else {
        id = carts[carts.length - 1].id + 1;
      }
      const newCart = { id, products: [] };
      carts.push(newCart);
      await promises.writeFile(this.path, JSON.stringify(carts));
      return newCart;
    } catch (error) {
      console.error('Error al crear carrito', error);
      throw error;
    }
  }
// obtener carrito por id
  async getCartById(cid) {
    
      const carts = await this.getCarts();

      const cart = carts.find(cart => cart.id === cid);

      if (!cart) {
        console.error('no se encontro el carrito');
        return null;
      } else{
      return cart;
    }
  } 
  // agregar al carrito
  async addProductToCart(cid, pid) {
    try {
      const cart = await this.getCartById(cid);
  
      if (!cart) {
        throw new Error("No existe ese id de carrito");
      }
  
      const product = await productManager.getProductById(pid);
  
      if (!product) {
        throw new Error("No existe un producto con ese id");
      }
  
      const productIndex = cart.products.findIndex((p) => p.id === pid);
  
      if (productIndex === -1) {
        const newProduct = { id: pid, quantity: 1 };
        cart.products.push(newProduct);
      } else {
        cart.products[productIndex].quantity++;
      }
  
      await this.saveCarts();
      return cart;
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      throw error;
    }
  }
  
  // eliminar de carrito 
  async removeProductFromCart(cid, pid) {
    try {
      const cart = await this.getCartById(cid);
  
      if (!cart) {
        throw new Error("No existe ese id de carrito");
      }
  
      const productIndex = cart.products.find((p) => p.id === pid);
  
      if (productIndex === -1) {
        throw new Error("No existe un producto con ese id en el carrito");
      }
  
      // Elimina el producto del carrito
      cart.products.splice(productIndex, 1);
  
      await this.saveCarts();
      return cart;
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
      throw error;
    }
  }
  
  async saveCarts() {
    try {
      await promises.writeFile(this.path, JSON.stringify(this.carts));
    } catch (error) {
      console.error('Error al guardar carrito', error);
      throw error;
    }
  }

}