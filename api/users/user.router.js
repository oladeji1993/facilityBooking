const { createUser, login, verify, sellerReg } = require("./user.controller");
// const { checkToken } = require("../auth/token_validation");
const router = require("express").Router();


router.post("/register", createUser);
router.post("/login", login);
router.post("/verify", verify);
router.post("/register-seller", sellerReg);



module.exports = router;      