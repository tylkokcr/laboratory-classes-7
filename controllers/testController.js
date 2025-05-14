const Product = require("../models/Product");
const Cart = require("../models/Cart");

async function testOperations(req, res) {
  try {
    const newProduct = {
      name: "TestProduct",
      description: "This is a test product",
      price: 99.99,
    };

    await Product.add(newProduct);
    await Cart.add("TestProduct");

    const items = await Cart.getItems();
    const quantity = await Cart.getProductsQuantity();
    const total = await Cart.getTotalPrice();

    res.json({
      message: "Test işlemleri başarılı.",
      cart: items,
      totalQuantity: quantity,
      totalPrice: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = testOperations;
