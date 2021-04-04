require("dotenv").config();

const path = require("path");
const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");

const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/ordersRoute");

const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/uploadRoutes");

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 14 * 24 * 60 * 60 * 1000,
    keys: [process.env.sessionCookieKey],
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);

app.use((err, req, res, next) => {
  res.status(err.setStatus || 500).json({
    message: err.message || "unkown server error ",
  });
});

__dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname), "frontend", "build", "index.html");
  });
} else {
  app.get("/", (req, res) => {
    res.json({ hi: "hi" });
  });
}
app.listen(process.env.PORT || 5000);
