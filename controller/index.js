const { entityModel, userModel, departmentModel } = require("../models");

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
