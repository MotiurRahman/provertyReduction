
var db = require('./../libs/db.js');

var mongoosePaginate = require('mongoose-paginate');

var surveyorSchema = new db.Schema({
    name: String,
    father_name: String,  
    email: String,
    phone: Number, 
    gender:String,
    religion:String,
    nid:Number,
    dateOfBirth:String,
    residence:String,
    bloadGroup:String,
    localAgent:String,
    agent_phone:String,

    division: String,
    district: String,
    ps: String,
    postCode: Number,
    area:String,

    lastDegree:String,
    subject:String,
    occupation:String,

    password: String,
    ac_status: String,
   
  

});

surveyorSchema.plugin(mongoosePaginate);


module.exports = db.model('surveyor', surveyorSchema);
