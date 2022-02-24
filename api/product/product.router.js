const { insertProduct, availableProducts } = require("./product.controller");
const router = require("express").Router();


router.post("/store", insertProduct);
router.get("/fetch", availableProducts);



module.exports = router; 