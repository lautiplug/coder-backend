class ProductManager {
  constructor() {
    this.products = []
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, desc, price, url, stock, id) {
    const product = {
      id: this.#getProductById() + 1,
      title,
      desc,
      price,
      url,
      stock,
    }
    this.products.push(product)
  }

  #getProductById() {
    let prId = 0
    this.products.map((event) => {
      if (event.id > prId) prId = event.id
      else {
        console.log('Not Found!')
      }
    });
    return prId;
  }
}

const productManager = new ProductManager();
productManager.addProduct('samsung s23 Ultra', 'Nuevo, en caja sellada', 1299, 'www.img.com', 20)
productManager.addProduct('iPhone 14 Pro Max', 'Nuevo, en caja sellada', 1099, 'www.img.com', 12)
console.log(productManager.getProducts())