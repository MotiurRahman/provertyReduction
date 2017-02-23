var express = require('express');
var router = express.Router();

var institute = require("./../libs/t_institute");
var surveyor = require('./../libs/surveyorSchema');



router.get('/', function(req, res, next) {

   institute.find({$or: [{ ac_status: "Request" }, { ac_status: "Inactive" }]}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

 
            switch (req.session.loginType) {
               
                case "Admin":
                    res.render('activation', { data: docs, layout: "admin_layout" });
                    break;
                default:
                    next();

            }
        }

    });


});

//surveyor request and inactive account

router.get('/api/surveyor', function(req, res, next) {

   surveyor.find({$or: [{ ac_status: "Request" }, { ac_status: "Inactive" }]}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {
       console.log("surveyor inactive data");
 
            res.json(docs);

            }
      

    });


});


//institute request and inactive account

router.get('/api/institute', function(req, res, next) {

   institute.find({$or: [{ ac_status: "Request" }, { ac_status: "Inactive" }]}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            console.log("institute inactive data");

 
           res.json(docs);
        }

    });


});


module.exports = router;
