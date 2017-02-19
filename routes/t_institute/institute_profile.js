var express = require('express');
var router = express.Router();

var institute = require('../../libs/t_institute');




router.get('/', function(req, res, next) {

console.log("loginType:"+req.session.loginType);
    switch (req.session.loginType) {
        case "Institute":

            console.log("id:" + req.session.ins_id);


            institute.find({ "_id": req.session.ins_id }).exec(function(err, personData) {

                if (err) {
                    res.json("DataBase error");
                } else {

                    res.render('t_institute/institute_profile', { data: personData, institute_userName: req.session.userName, layout: "ins_layout" });

                }

            });


            break;

        default:
            next();

    }



});


module.exports = router;
