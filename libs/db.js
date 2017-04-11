var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/customerinfo', function(){
//     console.log('mongodb connected')
// });

mongoose.connect('mongodb://mahdi:motiur08034@ds157320.mlab.com:57320/peopleinfo', function(){
    console.log('mongodb connected')
})

module.exports = mongoose
