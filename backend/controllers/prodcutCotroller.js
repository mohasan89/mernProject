// const products = require("../data/products");
const Products = require("../models/productModel");

exports.getProducts = (req, res, next) => {
  const items = Number(process.env.PAGEITEM);
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {};
  let count;
  Products.count({ ...keyword })
    .then((results) => {
      count = results;
      Products.find({ ...keyword })
        .skip((page - 1) * items)
        .limit(items)
        .then((products) => {
          res.status(200).json({ products, page, pages: Math.ceil(count / items) });
        });
    })
    .catch((err) => {
      error = new Error(err.message);
      error.setStatus = 404;
      next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Products.findOne({ _id: id })
    .then((prod) => {
      res.status(200).json(prod);
    })
    .catch((err) => {
      error = new Error(err.message);
      error.setStatus = 404;
      next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;
  Products.deleteOne({ _id: id })
    .then((product) => {
      if (product) {
        return res.status(200).json({ message: "deleted" });
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

exports.createProduct = (req, res, next) => {
  const productCreated = req.body;
  Products.create(productCreated)
    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

exports.topReview = (req, res, next) => {
  Products.find()
    .sort({ rating: -1 })
    .limit(3)
    .then((product) => {
      res.json(product);
    });
};

exports.updateProduct = (req, res, next) => {
  const id = req.params.id;
  const productUpdate = req.body;
  Products.updateOne({ _id: id }, productUpdate)
    .then((product) => {
      Products.findById(id).then((product) => {
        return res.status(200).json(product);
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

exports.addReviewProduct = (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  const { rating, comment } = req.body;
  Products.findOne({ _id: id })
    .then((product) => {
      if (product) {
        const alreadyReviewd = product.reviews.find(
          (review) => review.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewd) {
          res.json({ message: "already reviewd" });
        } else {
          const review = {
            user: userId,
            name: req.user.name,
            rating,
            comment,
          };
          product.reviews.push(review);
          product.numReviews = product.reviews.length;
          product.rating =
            product.reviews.reduce((acc, rev) => rev.rating + acc, 0) / product.numReviews;
          product.save().then((newProd) => res.status(201).json({ message: "updated" }));
        }
      } else {
        return res.json({ message: "not found" });
      }
    })
    .catch((err) => {
      return res.json({ message: err.message });
    });
};
