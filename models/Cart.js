const { getDatabase } = require("../database");
const Product = require("./Product");

const COLLECTION_NAME = "carts";

class Cart {
  constructor() {}

  static async add(productName) {
    const db = getDatabase();
    const product = await Product.findByName(productName);

    if (!product) {
      throw new Error(`Product '${productName}' not found.`);
    }

    const cart = await db.collection(COLLECTION_NAME).findOne();

    if (!cart) {
      // Eğer hiç sepet yoksa, yeni bir tane oluştur
      await db.collection(COLLECTION_NAME).insertOne({
        items: [{ product, quantity: 1 }],
      });
      return;
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.name === productName
    );

    if (existingItemIndex !== -1) {
      // Ürün zaten sepette varsa, miktarını artır
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Ürün yoksa, yeni ürün ekle
      cart.items.push({ product, quantity: 1 });
    }

    await db.collection(COLLECTION_NAME).updateOne(
      { _id: cart._id },
      { $set: { items: cart.items } }
    );
  }

  static async getItems() {
    const db = getDatabase();
    const cart = await db.collection(COLLECTION_NAME).findOne();
    return cart?.items || [];
  }

  static async getProductsQuantity() {
    const items = await this.getItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  static async getTotalPrice() {
    const items = await this.getItems();
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  static async clearCart() {
    const db = getDatabase();
    await db.collection(COLLECTION_NAME).deleteMany({});
  }
}

module.exports = Cart;
