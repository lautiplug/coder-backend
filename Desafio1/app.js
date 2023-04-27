class ProductManager {
  constructor() {
    this.products = []
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, desc, price, url, stock, code) {
    if(!title || !desc || !price || !url || !stock || !code) {
      console.error('Todos los campos son obligatorios.');
      return;
    }
    if(this.products.some((item) => item.code === code)) {
      console.error('Ya existe un producto con ese Codigo, deberías cambiarlo.')
    } else {
      const product = {
        code,
        title,
        desc,
        price,
        url,
        stock,
      }
      this.products.push(product)
    }
  }

  getProductById(code) {
    const product = this.products.find(product => product.code === code);
    if (!product) {
      console.error('Not found');
      return;
    }
    return product.code;
  }
}

const productManager = new ProductManager();
// titulo, desc, precio, url, stock, id
productManager.addProduct('samsung s23 Ultra', 'Nuevo, en caja sellada', 1299, 'www.img.com', 40, 1)
productManager.addProduct('iPhone 14 Pro Max', 'Nuevo, en caja sellada', 1099, 'www.img.com', 12, 2)
productManager.addProduct('nike air force 1', 'Nuevo, en caja sellada', 1499, 'www.img2.com', 40, 1)
console.log(productManager.getProducts())

productManager.getProductById(1);
console.log(productManager.getProductById(1)); // muestra el primer producto agregado
productManager.getProductById(2);
console.log(productManager.getProductById(2)); // muestra el segundo producto agregado