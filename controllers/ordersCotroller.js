const { update } = require("../models/orderModel");
const Order = require("../models/orderModel");

exports.addOrderItems = (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    res.json({ message: "no item found" });
  } else {
    Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
      .then((results) => {
        res.status(201);
        res.json(results);
      })
      .catch((err) => {
        res.status(500);
        res.json({ message: "database error" });
      });
  }
};

exports.getOrder = (req, res, next) => {
  const id = req.params.id;
  Order.findOne({ _id: id })
    .then((results) => {
      if (results) {
        if (results.user === req.user.id || req.user.isAdmin) {
          const data = {
            ...results._doc,
            user: { _id: req.user._id, name: req.user.name, email: req.user.email },
          };
          res.json(data);
        } else {
          res.json({ message: "unauthorized" });
        }
      } else {
        res.json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.json({ message: "server error or order not found" });
    });
};

exports.updateOrderToPaid = (req, res, next) => {
  const id = req.params.id;
  Order.findOne({ _id: id })
    .then((results) => {
      if (results) {
        results.isPaid = true;
        results.paidAt = Date.now();
        results.paymentResults = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        };
        results
          .save()
          .then((orderNew) => {
            res.json(orderNew);
          })
          .catch((err) => {
            res.json({ message: "server error faild when updating" });
          });
      } else {
        res.json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.json({ message: "server error or order not found" });
    });
};

exports.getMyOrders = (req, res, next) => {
  const user_id = req.user._id;
  Order.find({ user: user_id })
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        res.json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.json({ message: "server error or orders not found" });
    });
};

exports.getAllOrders = (req, res, next) => {
  Order.aggregate([
    {
      $lookup: {
        from: "usersmodels",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
  ])
    .append([
      {
        $project: {
          user: { $arrayElemAt: ["$user", 0] },
          totalPrice: 1,
          taxPrice: 1,
          shippingPrice: 1,
          isPaid: 1,
          orderItems: 1,
          shippingAddress: 1,
          isDelivered: 1,
          paymentMethod: 1,
          createdAt: 1,
          updatedAt: 1,
          paidAt: 1,
          itemsPrice: 1,
          deliveredAt: 1,
        },
      },
    ])
    .append([
      {
        $project: {
          user: { _id: "$user._id", name: "$user.name" },
          deliveredAt: 1,
          totalPrice: 1,
          taxPrice: 1,
          shippingPrice: 1,
          isPaid: 1,
          orderItems: 1,
          shippingAddress: 1,
          isDelivered: 1,
          paymentMethod: 1,
          createdAt: 1,
          updatedAt: 1,
          paidAt: 1,
          itemsPrice: 1,
        },
      },
    ])
    .sort({ createdAt: -1 })
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        res.json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.json({ message: "server error or orders not found" });
    });
};

exports.updateOrderToDelivered = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Order.findOne({ _id: id })
    .then((results) => {
      if (results) {
        results.isDelivered = true;
        results.deliveredAt = Date.now();
        results.save().then((updated) => res.status(200).json(updated));
      } else {
        res.status(404).json({ message: "order not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "enternal error" });
    });
};
