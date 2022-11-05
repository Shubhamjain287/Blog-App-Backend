const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/user");
const verify = require("../middlewares/Authentication");
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get("/user",verify,getUser);


module.exports = router;