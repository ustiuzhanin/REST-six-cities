const express = require("express");

const cityController = require("../controllers/city");

const router = express.Router();

router.use("/", cityController.getCities);

module.exports = router;
