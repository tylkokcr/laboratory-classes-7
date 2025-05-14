const express = require("express");
const router = express.Router();

const testOperations = require("../controllers/testController");

router.get("/", testOperations);

module.exports = router;
