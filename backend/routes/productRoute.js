const router = require("express").Router();
const jwtMiddle = require("../middlewares/jwtMiddleware");
const productCotroller = require("../controllers/prodcutCotroller");

router.get("/products", productCotroller.getProducts);

router.get("/product/top", productCotroller.topReview);

router.get("/product/:id", productCotroller.getProduct);

router.get("/product/:id", productCotroller.getProduct);

router.delete("/product/:id", jwtMiddle.admin, productCotroller.deleteProduct);

router.post("/product/new", jwtMiddle.admin, productCotroller.createProduct);

router.put("/product/:id/edit", jwtMiddle.admin, productCotroller.updateProduct);

router.put("/product/:id/review", jwtMiddle.protect, productCotroller.addReviewProduct);

module.exports = router;
