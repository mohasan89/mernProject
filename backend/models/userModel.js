const schema = require("mongoose").Schema;
const db = require("./database");

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = db.model("UsersModel", userSchema);

module.exports = UserModel;
