const orderCtrls = require("../controllers/orders.controllers");

const router = require("express").Router();

router.post("/addtocart", orderCtrls.postAddToCart);

module.exports = router;
