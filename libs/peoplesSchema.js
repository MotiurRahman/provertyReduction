
var db = require('./../libs/db.js');

var mongoosePaginate = require('mongoose-paginate');

var peopleSchema = new db.Schema({
    name: String,
    father_name: String,  
    email: String,
    phone: Number, 
    gender:String,
    religion:String,
    marital_Status:String,
    child_number:String,
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
    monthlyIncom: Number,
    status:String,

    saving:String,
    t_a_trainig:String,
    working_scope:String,
    know_t_a_trainig:String,
    any_c_land:String,
    drugAddiction:String,
    natural_reson:String,

    dept:String,
    institute: String
});

peopleSchema.plugin(mongoosePaginate);


module.exports = db.model('peoples', peopleSchema);
