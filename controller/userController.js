const { userModel } = require("../models");

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
