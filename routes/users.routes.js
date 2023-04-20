const express = require("express");
const { checkSchema } = require("express-validator");
const {
  authenticateUser,
  authorizeByRole,
} = require("../middlewares/auth.middleware");
const {
  getAllUsers,
  showMe,
  getUserById,
  updateUserById,
  deleteUser,
  changeRole,
  getAnalyticsBarber,
  getAllBarbers,
  getAllClients,
} = require("../controllers/users.controllers");
const router = express.Router();

router.get("/showMe", authenticateUser, showMe);

router.get("/all/barber",  getAllBarbers);

router.get("/all/client", authenticateUser, getAllClients);

router.get("/:id", authenticateUser, getUserById);

router.patch("/:id", authenticateUser, updateUserById);

router.delete("/:id", authenticateUser, deleteUser);

router.patch(
  "/changeRole/:id",
  [authenticateUser, authorizeByRole("admin")],
  changeRole
);

router.get("/analyticsbarber/:barberId", [authenticateUser, authorizeByRole("admin")], getAnalyticsBarber)

module.exports = router;
