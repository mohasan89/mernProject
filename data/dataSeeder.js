require("dotenv").config();
const db = require("../models/database");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

// const user = require("./user");
const products = require("./products");

console.log(products);

// Users.insertMany(user);
Products.insertMany(products)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
