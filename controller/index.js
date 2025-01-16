const {
    entityModel,
    userModel,
    departmentModel,
    attendanceModel,
} = require("../models");

exports.newUser = async (request, response) => {
    const { studentId, role } = request.body;
    try {
        if (role == "user") {
            const existingUser = await userModel.findOne({ studentId });
            console.log(existingUser);

            if (existingUser) {
                return response
                    .status(400)
                    .json({ message: "User already exists" });
            }
        }

        const newUser = new userModel(request.body);

        await newUser.save();

        return response
            .status(200)
            .json({ message: "User has been registered" });
    } catch (error) {
        return response
            .status(500)
            .json({ message: "An error has been occured", error: error });
    }
};

exports.getUser = async (request, response) => {
    const { studentId, password } = request.body;
    const { entityType, entity } = request.query;
    try {
        if (entityType == "all") {
            const [userData, totalCount] = await Promise.all([
                userModel.find({ entity }),
                userModel.countDocuments({ entity }),
            ]);
            return response
                .status(200)
                .json({ results: userData, totalCount: totalCount });
        }
        const userData = await userModel.findOne({ studentId, password });

        if (!userData) {
            return response
                .status(400)
                .json({ message: "Invalid credentials" });
        }

        return response.status(200).json({ results: userData, totalCount: 1 });
    } catch (error) {
        return response
            .status(400)
            .json({ message: "An error has been occured", error: error });
    }
};

exports.newEntity = async (request, response) => {
    const { url, entity } = request.body;

    if (!["notes", "pyq"].includes(entity)) {
        return response.status(400).json({ message: "No such Entity Found" });
    }
    try {
        const exitingData = await entityModel.find({ url });

        if (exitingData.length > 0) {
            return response.status(400).json({
                message: "A user has been uploaded data with the same URL.",
            });
        }

        const newData = new entityModel(request.body);

        await newData.save();

        return response
            .status(200)
            .json({ message: "Data has been uploaded Successfully" });
    } catch (error) {
        console.log(error);
    }
};

exports.getEntity = async (request, response) => {
    const { entity } = request.query;

    if (!["notes", "pyq"].includes(entity)) {
        return response.status(400).json({ message: "No such Entity Found." });
    }

    try {
        const [entityData, totalCount] = await Promise.all([
            entityModel.find({ entity }),
            entityModel.countDocuments({ entity }),
        ]);

        return response.status(200).json({ results: entityData, totalCount });
    } catch (error) {
        return response
            .status(500)
            .json({ message: "An error has occurred.", error });
    }
};

exports.updateEntity = async (request, response) => {
    const { entityId } = request.body;
};

exports.getDepartment = async (request, response) => {
    const { entity, entityId } = request.query;

    if (entity != "departments") {
        return response
            .status(400)
            .json({ message: "No such Department found" });
    }

    if (entityId) {
        try {
            const departmentData = await departmentModel.findOne({ entityId });
            return response
                .status(200)
                .json({ results: departmentData, totalCount: 1 });
        } catch (error) {
            return response
                .status(400)
                .json({ message: "An error has been occured", error: error });
        }
    } else {
        try {
            const [departmentData, totalCount] = await Promise.all([
                departmentModel.find({ entity }),
                departmentModel.countDocuments({ entity }),
            ]);
            return response
                .status(200)
                .json({ results: departmentData, totalCount });
        } catch (error) {
            return response
                .status(400)
                .json({ message: "An error has been occured", error: error });
        }
    }
};

exports.newDepartment = async (request, response) => {
    try {
        const newDepartment = new departmentModel(request.body);
        await newDepartment.save();

        return response
            .status(200)
            .json({ message: "Department has been added" });
    } catch (error) {
        return response
            .status(400)
            .json({ message: "An error has been occured", error: error });
    }
};

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

exports.updateCollections = async (request, response) => {
    try {
        const { entity, entityId, attributesToUpdate } = request.body;

        if (!entity) {
            return response
                .status(400)
                .json({ message: "No entity provided in the request." });
        }

        if (entity === "attendance") {
            const existingAttendance = await attendanceModel.findOne({
                entityId,
            });

            if (!existingAttendance) {
                return response.status(404).json({
                    message:
                        "No such entity found. Please check the entity ID.",
                });
            }

            const updatedAttendance = await attendanceModel.findOneAndUpdate(
                { entityId },
                { $set: attributesToUpdate },
                { new: true },
            );

            return response.status(200).json({
                message: "Entity updated successfully.",
            });
        } else {
            return response
                .status(400)
                .json({ message: `No such entity found: ${entity}` });
        }
    } catch (error) {
        console.error("Error updating collections:", error);
        return response.status(500).json({
            message: "An error occurred while updating the entity.",
            error: error.message,
        });
    }
};
