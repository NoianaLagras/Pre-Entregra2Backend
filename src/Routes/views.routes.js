import { Router } from "express";
import { productManager } from "../dao/db/manager/products.manager.js";
import { messageManager } from "../dao/db/manager/message.manager.js";
import __dirname from '../utils.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req , res) => {
  
  try {
const products = await productManager.findAll();
    res.render('home', { products });} catch (error) {
    res.status(500).json({ error: 'Error al cargar la vista.' });
  }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
  try {
     const products = await productManager.findAll();
  
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});
viewsRouter.get('/chat', async (req, res) => {
  try {
    const messages = await messageManager.findAll();
    res.render('chat', { messages });
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar la vista de chat.' });
  }
});



export default viewsRouter;