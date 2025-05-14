const { getDatabase } = require("../database");

const COLLECTION_NAME = "products";

class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static async getAll() {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME).find().toArray();
  }

  static async add(product) {
    const db = getDatabase();
    const existingProduct = await db.collection(COLLECTION_NAME).findOne({ name: product.name });
    if (existingProduct) {
      throw new Error("Product with this name already exists.");
    }
    await db.collection(COLLECTION_NAME).insertOne(product);
  }

  static async findByName(name) {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME).findOne({ name });
  }

  static async deleteByName(name) {
    const db = getDatabase();
    await db.collection(COLLECTION_NAME).deleteOne({ name });
  }

  static async getLast() {
    const db = getDatabase();
    const result = await db.collection(COLLECTION_NAME)
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    return result[0];
  }
}

module.exports = Product;
