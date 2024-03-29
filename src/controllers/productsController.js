const req = require("express/lib/request");
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products, toThousand });
    // Do the magic
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let product = products.find((product) => product.id == req.params.id);
    let finalPrice = (
      product.price *
      ((100 - product.discount) / 100)
    ).toFixed();
    res.render("detail.ejs", {
      product,
      toThousand,
      finalPrice,
    });
    // Do the magic
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    // no Funciona
    let id = products[products.length - 1].id + 1;

    let newProduct = {
      id,
      ...req.body,
      image: "default-image.png",
    };

    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");

    res.redirect("/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    let id = req.params.id;
    let product = products.find((product) => product.id == id);
    res.render("product-edit-form", { product, toThousand });
    // Do the magic
  },
  // Update - Method to update
  update: (req, res) => {
    let idProduct = req.params.id;
    let product = products.filter((producto) => producto.id != idProduct);
    productEdit = { id: idProduct, ...req.body, image: "default-image.png" };
    product.push(productEdit);
    fs.writeFileSync(productsFilePath, JSON.stringify(product));
    res.redirect("/");
    // Do the magic
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let id = req.params.id;
    let productDelite = products.filter((product) => product.id != id); // busco en el json con filter el id y elimina el que es el id buscar
    fs.writeFileSync(productsFilePath, JSON.stringify(productDelite), "utf-8");
    res.redirect("/");
    // Do the magic
  },
};

module.exports = controller;
