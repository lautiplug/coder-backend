import express from 'express'
import ProductManager from './ProductManager.js';

const app = express();

// Crear una instancia de ProductManager
const productManager = new ProductManager('./products.json');

// Definir el endpoint para obtener todos los productos
app.get('/products/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    console.log('Limit:', limit);
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Definir el endpoint para obtener un producto específico
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseFloat(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});