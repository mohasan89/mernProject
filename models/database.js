const mongoose = require("mongoose");

mongoose.connect(process.env.mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose;
