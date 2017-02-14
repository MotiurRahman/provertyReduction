var express = require('express');
var router = express.Router();

var customer = require('../../libs/customerSchema');




router.get('/', function(req, res, next) {

    customer.find({ "institute": "bktc" }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            res.render('t_institute/addTo', { data: docs });

        }

    });

});


router.post('/', function(req, res, next) {

    var id = req.body.id;
    var dept = req.body.dept;
    var institute = "bktc";


    console.log("id:" + id);
    console.log("dept:" + dept);
    console.log("institute:" + institute);


    var instituteInfo = {
        dept: dept,
        institute: institute
    }

    var conditions = { "_id": id },
        update = { $set: instituteInfo };



    customer.update(conditions, update, callback);

    function callback(err, updatdata) {
        if (err) {
            res.json("Data is not valid");
            // mongoose.connection.close();
        } else {

            res.redirect("/addTo");
        }
    };




});


module.exports = router;
