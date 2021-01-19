const router = require("express").Router();

const authCotroller = require("../controllers/auth/authController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.get("/current_user", (req, res) => {
  res.json(req.user);
});

router.post("/login", authCotroller.authUser);

router.get("/user/profile", jwtMiddleware.protect, authCotroller.getProfile);

router.put("/user/update", jwtMiddleware.protect, authCotroller.updateProfile);

router.post("/user", authCotroller.createUser);

router.get("/users", jwtMiddleware.admin, authCotroller.getUsers);

router.delete("/user/:id", jwtMiddleware.admin, authCotroller.deleteUser);
router.get("/user/:id", jwtMiddleware.admin, authCotroller.getUserbyId);
router.put("/user/:id", jwtMiddleware.admin, authCotroller.updateUser);

module.exports = router;
