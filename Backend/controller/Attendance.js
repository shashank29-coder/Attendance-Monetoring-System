const Attendance = require("../model/Attendance");
const User = require("../model/User");



const markAttendance = async (req, res) => {

    try {

        const userId = req.user.id;

        const { status, date } = req.body;


        if (!status) {

            return res.status(400).json({
                success: false,
                message: "Attendance status is required"
            });

        }


        if (
            status !== "Present" &&
            status !== "Absent"
        ) {

            return res.status(400).json({
                success: false,
                message: "Status must be Present or Absent"
            });

        }


        const user =
            await User.findById(userId);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }


        const attendanceDate =
            date ||
            new Date().toISOString().split("T")[0];


        
        const alreadyMarked =
            await Attendance.findOne({
                studentId: user._id,
                date: attendanceDate
            });


        if (alreadyMarked) {

            return res.status(400).json({
                success: false,
                message:
                    "Attendance already marked for today"
            });

        }


        const attendance =
            await Attendance.create({

                studentId: user._id,

                studentName: user.name,

                studentEmail: user.email,

                date: attendanceDate,

                status: status

            });


        res.status(201).json({

            success: true,

            message:
                "Attendance marked successfully",

            attendance

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




const getAttendance = async (req, res) => {

    try {

        const attendance =
            await Attendance.find()
                .sort({ createdAt: -1 });


        res.status(200).json({

            success: true,

            attendance

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




const getStudentAttendance = async (
    req,
    res
) => {

    try {

        const userId = req.user.id;


        const attendance =
            await Attendance.find({
                studentId: userId
            })
            .sort({ date: -1 });


        res.status(200).json({

            success: true,

            attendance

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {
    markAttendance,
    getAttendance,
    getStudentAttendance
};