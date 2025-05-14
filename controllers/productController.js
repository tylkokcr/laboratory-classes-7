const Product = require("../models/Product");

async function getProductsPage(req, res) {
  try {
    const products = await Product.getAll();

    res.render("products", {
      headTitle: "Products",
      products
    });
  } catch (error) {
    res.status(500).send("Błąd podczas pobierania produktów: " + error.message);
  }
}

module.exports = { getProductsPage };
