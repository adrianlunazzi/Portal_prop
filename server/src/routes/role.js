const express = require("express");
const router = express.Router();
const role = require("../controllers/role");

router.get("/", role.main);
router.get("/list", role.list);
router.post("/", role.create);

module.exports = router;
