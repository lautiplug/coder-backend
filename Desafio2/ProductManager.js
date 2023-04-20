const fs = require('fs');

class ProductManager {
  constructor() {
    this.idContador = 0;
    this.path = "./products.json";
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productos = await fs.promises.readFile(this.path, 'utf8');
        const productosJS = JSON.parse(productos);
        return productosJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(title, description, price, url, code, stock) {
    try {
      const productosArchivo = await this.getProducts();
      const codigoExistente = productosArchivo.find(
        (producto) => producto.codigo === code
      );

      if (codigoExistente) {
        console.log(`Ya existe un producto con el código ${code}`);
      } else {
        const ultimoProducto = productosArchivo[productosArchivo.length - 1];
        const nuevoId = ultimoProducto === ultimoProducto.id + 1;
        const producto = {
          id: nuevoId,
          nombre: title,
          descripcion: description,
          precio: price,
          imagen: url,
          codigo: code,
          stock,
        };

        productosArchivo.push(producto);
        await fs.promises.writeFile(this.path, JSON.stringify(productosArchivo));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(idProducto) {
    try {
      const productosArchivo = await this.getProducts();
      const indiceProducto = productosArchivo.findIndex((producto) => producto.id === idProducto);
  
      if (indiceProducto === -1) {
        console.log('No se encontró el producto con el ID especificado');
      } else {
        productosArchivo.splice(indiceProducto, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productosArchivo));
        console.log(`Producto con ID ${idProducto} eliminado exitosamente`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(idProducto, camposActualizados) {
    try {
      const productosArchivo = await this.getProducts();
      const indiceProducto = productosArchivo.findIndex((producto) => producto.id === idProducto);
  
      if (indiceProducto === -1) {
        console.log('No se encontró el producto con el ID especificado');
      } else {
        const productoActualizado = {
          ...productosArchivo[indiceProducto],
          ...camposActualizados,
          id: idProducto, // aseguramos que no se cambie el ID original
        };
        productosArchivo[indiceProducto] = productoActualizado;
        await fs.promises.writeFile(this.path, JSON.stringify(productosArchivo));
        console.log(`Producto actualizado exitosamente`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(idProducto, camposActualizados) {
    try {
      const archivoProductos = await this.getProducts();
      const indiceProducto = archivoProductos.findIndex((producto) => producto.id === idProducto);
  
      if (indiceProducto === -1) {
        console.log('No se encontró el producto con el ID especificado');
      } else {
        const productoActualizado = {
          ...archivoProductos[indiceProducto],
          ...camposActualizados,
          id: idProducto,
        };
        archivoProductos[indiceProducto] = productoActualizado;
        await fs.promises.writeFile(this.path, JSON.stringify(archivoProductos));
        console.log(`Producto actualizado exitosamente`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #existingProduct(idProducto) {
    try {
      const archivoProductos = await this.getProducts();
      return archivoProductos.find((productos) => productos.id === idProducto);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(idProducto) {
    try {
      const producto = this.#existingProduct(idProducto);
      if (!producto) {
        console.log('Not found');
      } else {
        return producto;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Se crea la instancia de GestionadorDeProductos
const productManager = new ProductManager();

// Se obtienen los productos devuelve un Array vacío
const test = async () => {

  const obtener1 = await productManager.getProducts();
  console.log("Consulta inicial: ", obtener1);
  // Se agrega un producto (si tiene el mismo Code arroja error y no se agrega al file)
  await productManager.addProduct(
    "iphone 14",
    "producto nuevo caja sellada",
    1100,
    "www.iphoneimg.com",
    "gettingstuff0123",
    25
  );

  // Consulta  de producto por ID
  const obtener2 = await productManager.getProductById(2);
  console.log("Consulta mediante ID: ", obtener2);

  // Consulta del Array de productos
  const obtener3 = await productManager.getProducts();
  console.log("Segunda consulta: ", obtener3);

  //Eliminar producto por ID
  await productManager.deleteProduct(2);
  const obtener4 = await productManager.getProducts();
  console.log("Tercer consulta: ", obtener4);

  // Actualizar producto por ID (Precio y Stock)
  await productManager.updateProduct(3, { 
    precio: 3000,
    stock: 30,
  });

  // Consulta Final
  const obtener5 = await productManager.getProducts();
  console.log("Tercer Consulta: ", obtener5);
};

test();