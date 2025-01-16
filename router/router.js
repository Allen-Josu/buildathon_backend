const express = require("express");
const {
    newEntity,
    getEntity,
    newUser,
    getUser,
    getDepartment,
    newDepartment,
    newAttendance,
    getAttendance,
    updateCollections,
} = require("../controller");

const router = express.Router();

router.get("/newEntity", getEntity);
router.post("/newEntity", newEntity);

router.post("/users", newUser);
router.get("/users", getUser);

router.get("/departments", getDepartment);
router.post("/departments", newDepartment);

router.get("/attendance", getAttendance);
router.post("/attendance", newAttendance);


router.patch("/update-entity",updateCollections)

module.exports = router;
