
var db = require('./../libs/db.js');

var mongoosePaginate = require('mongoose-paginate');

var distSchema = new db.Schema({
    dist_name: String,
    ps: String
   
});

distSchema.plugin(mongoosePaginate);


module.exports = db.model('dist_PS', distSchema);
