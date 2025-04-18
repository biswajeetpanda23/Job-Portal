// backend/model/UserModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterJobSchema = new Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "RecruiterJobModel" },
    title: String,
    position: String,
    salary: Number,
    description: String,
    responsiblities: String,
    location: String,
    company: String,
    catagory: String,
    user: String,

}, {
    versionKey: false
});

const RecruiterJobModel = mongoose.model("RecruiterJobs", RecruiterJobSchema);

module.exports = { RecruiterJobModel };

