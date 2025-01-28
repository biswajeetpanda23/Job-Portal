// backend/model/UserModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
 name:String,
 email:String,
 mobile:Number,
 password:String,
 avatar:String,
 company:String,
 about_company:String,
 compnay_start_date:String,
},{
    versionKey:false
});

const RecruterModel = mongoose.model("recruiters", RecruiterSchema);

module.exports = {RecruterModel};
