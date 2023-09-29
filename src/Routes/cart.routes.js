import {Router} from "express";
import { CartManager } from '../CartManager.js';
import __dirname from '../utils.js';

const cartManager = new CartManager(`${__dirname}/../Carts.JSON`);
const cartsRouter = Router();

// ---- Obtener todos los carritos -----
cartsRouter.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.json({carts});
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los carritos' });
  }
});

// ---- Crear carrito ----
cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el carrito' });
  }
});
// ---- Obtener un carrito por id ----
cartsRouter.get('/:cid', async (req, res) => {
  const  cid  = parseInt(req.params.cid); 
  if (isNaN(cid)) {
    res.status(400).json({ error: 'El id del carrito debe ser un numero valido' });
    return;
}
  try { 
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      res.status(404).json({ error: 'No se encontró el carrito' });
    } else {
      res.json({ cart });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el carrito' });
  }
});

// ---- Agregar producto a un carrito ----
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid , pid} = req.params;
  const {quantity} = req.body


  try {
    await cartManager.addProductToCart(+cid, +pid , quantity);
    res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
  }
});
// --- Borrar un producto del carrito ---
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartManager.removeProductFromCart(+cid, +pid);
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).json({ error: 'No se pudo eliminar el producto del carrito' });
  }
});
export default cartsRouter;
