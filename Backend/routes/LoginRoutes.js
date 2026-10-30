const express = require('express');
const router = express.Router();
const {LoginDetails} = require("../controller/Login");

router.post("/Login",LoginDetails)

module.exports = router;