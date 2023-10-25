import {Router} from "express";
import { cartsManager } from "../dao/db/manager/carts.manager.js";

const cartsRouter = Router();

// ---- Obtener todos los carritos -----
export default cartsRouter;
cartsRouter.get("/" , async (req , res) => {
  try {
    const carts = await cartsManager.findAll();
    res.status(200).json({message: "Carritos", carts })
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Carts' });
  }
})

cartsRouter.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = await cartsManager.findCartById(idCart);

  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  }
  res.json({ cart });
});

cartsRouter.post('/', async (req, res) => {
  try {
      const createCarts = await cartsManager.createCart(req.body)
       res.status(200).json({ message: 'Carrito creado correctamente', Cart : createCarts});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

cartsRouter.post('/:idCart/products/:idProduct',async (req, res) =>{
  try {
    const {idCart , idProduct}= req.params;
    const cart = cartsManager.addProductToCarts(idCart,idProduct)
    res.json({ cart })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})
cartsRouter.delete("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  
  try {
      const deletedCart = await cartsManager.deleteCart(idCart);
      if (!deletedCart) {
          return res.status(404).json({ message: "Carrito no encontrado" });
      }
      return res.json({ message: "Carrito Eliminado" });
  } catch (error) {
      return res.status(500).json({ message: "Error al eliminar Carrito." });
  }
})

cartsRouter.delete("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;

  try {
      const updatedCart = await cartsManager.removeProductFromCart(idCart, idProduct);
      if (!updatedCart) {
          return res.status(404).json({ message: " Not Found" });
      }
      return res.json(updatedCart);
  } catch (error) {
      return res.status(500).json({ message: "Error al eliminar producto del carrito" });
  }
});