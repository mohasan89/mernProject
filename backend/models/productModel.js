const schema = require("mongoose").Schema;
const db = require("./database");

const reviewSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: db.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      required: true,
      ref: "UsersModel",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    categroy: {
      type: String,
      required: true,
      default: "Electronics",
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    Price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Products = db.model("Products", productSchema);

module.exports = Products;
