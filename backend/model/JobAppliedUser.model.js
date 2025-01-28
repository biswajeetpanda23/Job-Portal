
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobAppliedSchema = new Schema({
    jobData: Object,
    user: String
}, {
    versionKey: false
});

const UserJobApplyModel = mongoose.model("usersjobapply", JobAppliedSchema);

module.exports = { UserJobApplyModel };
