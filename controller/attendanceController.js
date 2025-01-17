const { attendanceModel } = require("../models");

exports.newAttendance = async (request, response) => {
    const { studentId, leaveDate } = request.body;

    try {
        const existingAttendance = await attendanceModel.findOne({
            studentId,
            leaveDate: new Date(leaveDate),
        });

        if (existingAttendance) {
            return response.status(400).json({
                message:
                    "Attendance for this user on the same date already exists.",
            });
        }

        const newAttendance = new attendanceModel(request.body);
        await newAttendance.save();

        return response.status(200).json({
            message: "Attendance has been successfully marked.",
        });
    } catch (error) {
        console.error("Error marking attendance:", error);
        return response.status(500).json({
            message: "An error has occurred while marking attendance.",
            error: error.message,
        });
    }
};

exports.getAttendance = async (request, response) => {
    const { entityType, studentId, leaveDate } = request.query;

    try {
        let existingAttendance;

        if (entityType === "all") {
            existingAttendance = await attendanceModel.find({ studentId });

            return response.status(200).json({
                results: existingAttendance,
                totalCount: existingAttendance.length,
            });
        }

        existingAttendance = await attendanceModel.findOne({
            studentId,
            leaveDate: new Date(leaveDate),
        });

        if (!existingAttendance) {
            return response.status(404).json({
                message: "No attendance record found for the given date.",
            });
        }

        return response.status(200).json({
            results: [existingAttendance],
            totalCount: 1,
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        return response.status(500).json({
            message: "An error has occurred while fetching attendance.",
            error: error.message,
        });
    }
};
