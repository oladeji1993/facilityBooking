const { createUser, login, verify } = require("./user.controller");
// const { checkToken } = require("../auth/token_validation");
const router = require("express").Router();


router.post("/register", createUser);
router.post("/login", login);
router.post("/verify", verify);


module.exports = router;      