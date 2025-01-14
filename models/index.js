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
        entityId: {
            required: true,
            type: String,
        },
        userId: {
            required: true,
            type: String,
            unique: true,
        },
        password: {
            required: true,
            type: String,
        },
        course: {
            type: String,
        },
        department: {
            type: String,
        },
        semester: {
            type: String,
        },
        studentId: {
            type: String,
        },
        role: {
            type: String,
        },
    },
    { timestamps: true },
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
    { timestamps: true },
);

const SubjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    subjectCode: {
        type: String,
        required: true,
    },
});

const DepartmentSchema = new mongoose.Schema(
    {
        department: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        entity: {
            type: String,
            required: true,
        },
        entityId: {
            type: String,
            required: true,
            unique: true,
        },
        subjects: {
            type: [SubjectSchema],
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const userModel = mongoose.model("users", userSchema);
const entityModel = mongoose.model("entity", entitySchema);
const departmentModel = mongoose.model("departments", DepartmentSchema);

module.exports = { userModel, entityModel, departmentModel };
