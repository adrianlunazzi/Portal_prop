const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.get("/", user.main);
router.get("/list", user.list);
router.get("/list/:id", user.detail);
router.put("/list/:id", user.edit);
router.delete("/list/:id", user.delete);

module.exports = router;
