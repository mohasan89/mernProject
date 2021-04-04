const bycrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@exmaple.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@exmaple.com",
    password: bycrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "Jane@exmaple.com",
    password: bycrypt.hashSync("123456", 10),
  },
];

module.exports = users;
