const productCtrls = require("../controllers/products.controllers");
const { authenticateUser, authorizeByRole } = require("../middlewares");

const router = require("express").Router();

router.post(
  "/",
  [authenticateUser, authorizeByRole("admin")],
  productCtrls.postProduct
);
router.get("/", productCtrls.getProducts);
router.get("/:productId", productCtrls.getSingleProduct);
router.patch(
  "/:productId",
  [authenticateUser, authorizeByRole("admin")],
  productCtrls.patchProduct
);
router.delete(
  "/:productId",
  [authenticateUser, authorizeByRole("admin")],
  productCtrls.deleteProduct
);

module.exports = router;
