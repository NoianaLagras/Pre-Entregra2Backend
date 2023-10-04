import {Router} from "express";
import { ProductManager } from "../ProductManager.js";
import __dirname from "../utils.js";

const productManager = new ProductManager(`${__dirname}/../Products.JSON`);
const productsRouter = Router();

//     ------ Obtener Productos -------
productsRouter.get('/', async (req, res) => {
    try {
        // limite de consulta
        const limit = req.query.limit; 
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit); 
            res.json({limitedProducts});
        } else {
            res.json({products});
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});

// Ruta para obtener un producto por ID
productsRouter.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);

    if (isNaN(pid)) {
        res.status(400).json({ error: 'El id del producto debe ser un numero valido' });
        return;
    }

    try {
        const product = await productManager.getProductById(pid);

        if (product) {
            res.json({product});
        } else {
            res.status(404).json({ error: 'Producto no encontrado..' });
        }
    } catch (error) {
        res.status(500).json({ error:  ' Error al obtener el producto.' });
    }
});

//  --- Agregar Producto ---- 
productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, category, code, stock, status, thumbnails } = req.body;
        await productManager.addProduct(title, description, price, category, code, stock, status, thumbnails);
        res.status(200).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//      ----  Actualizar un producto por id   ----
productsRouter.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);

    if (isNaN(pid)) {
        res.status(400).json({ error: 'El id debe ser un numero valido' });
        return;
    }

    try {
        const updatedData = req.body;
        await productManager.updateProduct(pid, updatedData);
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ---  Eliminar por id    -----
productsRouter.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);

    if (isNaN(pid)) {
        res.status(400).json({ error: 'El id debe ser un numero valido.' });
        return;
    }

    try {
        await productManager.deleteProduct(pid);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


export default productsRouter;
