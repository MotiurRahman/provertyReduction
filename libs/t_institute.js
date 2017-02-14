
var db = require('./../libs/db.js');

var mongoosePaginate = require('mongoose-paginate');

var instituteSchema = new db.Schema({
    name: String,
    short_name: String,  
    email: String,
    phone: Number, 
    training_name:String,

    division: String,
    district: String,
    ps: String,
    postCode: Number,
 
    userName:String,
    password: Number,
    re_password:String,

});

instituteSchema.plugin(mongoosePaginate);


module.exports = db.model('institute', instituteSchema);
