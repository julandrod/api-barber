const router = require("express").Router();
const authCtrls = require("../controllers/auth.controllers");
const userSchemaValidator = require("../schemas/userSchema.validator");
const validateFields = require("../schemas/validateFields");
const { authenticateUser } = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [userSchemaValidator, validateFields],
  authCtrls.registerUser
);

router.post("/login", authCtrls.loginUser);

router.post("/resetPass", authenticateUser, authCtrls.changePassword);

router.post("/verifyEmail", authCtrls.verifyEmail);

module.exports = router;
