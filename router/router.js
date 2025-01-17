const express = require("express");
const { getEntity, newEntity } = require("../controller/entityController");
const { getAttendance, newAttendance } = require("../controller/attendanceController");
const { getDepartment, newDepartment } = require("../controller/departmentController");
const { newUser, getUser } = require("../controller/userController");
const { updateCollections } = require("../controller/updateCollection");


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
