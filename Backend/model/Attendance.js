const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        studentName: {
            type: String,
            required: true
        },

        studentEmail: {
            type: String,
            required: true
        },

        date: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Present", "Absent"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Attendance = mongoose.model(
    "attendance",
    attendanceSchema
);

module.exports = Attendance;