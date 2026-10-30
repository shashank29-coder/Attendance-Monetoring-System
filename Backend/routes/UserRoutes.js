const express = require('express');
const router = express.Router();
const Userdetails = require("../controller/User");

router.post("/users",Userdetails)

module.exports = router;