import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
import __dirname from '../utils.js';

const productManager = new ProductManager(`${__dirname}/../Products.JSON`);
const viewsRouter = Router();

viewsRouter.get('/', async (req , res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
    }
)

viewsRouter.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();

    
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});


export default viewsRouter;