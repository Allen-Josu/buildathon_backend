const express = require("express");
const { newEntity, getEntity, newUser, getUser } = require("../controller");
const router = express.Router();

router.get("/newEntity", getEntity);
router.post("/newEntity", newEntity);

router.post("/users", newUser);
router.get("/users", getUser);


module.exports = router;
