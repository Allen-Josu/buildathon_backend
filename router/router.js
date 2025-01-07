const express = require("express");
const {
    newEntity,
    getEntity,
    newUser,
    getUser,
    getDepartment,
} = require("../controller");

const router = express.Router();

router.get("/newEntity", getEntity);
router.post("/newEntity", newEntity);

router.post("/users", newUser);
router.get("/users", getUser);

router.get("/departments", getDepartment);

module.exports = router;
