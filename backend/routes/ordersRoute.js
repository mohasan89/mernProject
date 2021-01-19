const router = require("express").Router();
const orderCotroller = require("../controllers/ordersCotroller");
const jwtController = require("../middlewares/jwtMiddleware");

router.post("/order", jwtController.protect, orderCotroller.addOrderItems);

router.get("/order/myorders", jwtController.protect, orderCotroller.getMyOrders);

router.get("/orders/", jwtController.admin, orderCotroller.getAllOrders);

router.get("/order/:id", jwtController.protect, orderCotroller.getOrder);
router.put("/order/:id/pay", jwtController.protect, orderCotroller.updateOrderToPaid);

router.put("/order/:id/deliver", jwtController.protect, orderCotroller.updateOrderToDelivered);

module.exports = router;
