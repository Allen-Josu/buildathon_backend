const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        entity: {
            required: true,
            type: String,
        },
        username: {
            required: true,
            type: String,
        },
        userId: {
            required: true,
            type: String,
            unique: true,
        },
        course: {
            required: true,
            type: String,
        },
        department: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);

const entitySchema = new mongoose.Schema(
    {
        entity: {
            type: String,
            required: true,
        },
        entityId: {
            type: String,
            required: true,
            unique: true,
        },
        course: {
            type: String,
            required: true,
        },
        subjectName: {
            type: String,
            required: true,
        },
        subjectCode: {
            type: String,
            required: true,
        },
        uploadedBy: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
                },
                message: "Invalid URL",
            },
        },
        likes: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
const entityModel = mongoose.model("entity", entitySchema);

module.exports = { userModel, entityModel };
