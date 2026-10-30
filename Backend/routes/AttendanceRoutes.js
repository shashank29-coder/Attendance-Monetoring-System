const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
    markAttendance,
    getAttendance,
    getStudentAttendance
} = require("../controller/Attendance");

router.post(
    "/attendance",
    auth,
    markAttendance
);

router.get(
    "/attendance",
    auth,
    getAttendance
);




router.get(
    "/student-attendance",
    auth,
    getStudentAttendance
);


module.exports = router;