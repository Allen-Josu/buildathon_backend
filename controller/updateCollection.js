const { attendanceModel, entityModel } = require("../models");

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

            await attendanceModel.findOneAndUpdate(
                { entityId },
                { $set: attributesToUpdate },
                { new: true },
            );

            return response.status(200).json({
                message: "Entity updated successfully.",
            });
        } else if (entity === "notes" || entity === "pyq") {
            const existingEntities = await entityModel.findOne({
                entityId,
            });

            if (!existingEntities) {
                return response.status(404).json({
                    message:
                        "No such entity found. Please check the entity ID.",
                });
            }
            await entityModel.findOneAndUpdate(
                { entityId },
                { $set: attributesToUpdate },
                { new: true },
            );

            return response.status(200).json({
                message: "Entity Updated Successfully",
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
