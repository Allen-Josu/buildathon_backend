const express = require("express");
const { newEntity, getEntity } = require("../controller");
const router = express.Router();

router.get("/newEntity", getEntity);
router.post("/newEntity", newEntity);

module.exports = router;
