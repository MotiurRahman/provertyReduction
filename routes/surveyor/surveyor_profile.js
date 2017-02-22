var express = require('express');
var router = express.Router();

var surveyor = require('../../libs/surveyorSchema');




router.get('/', function(req, res, next) {

console.log("loginType:"+req.session.loginType);
    switch (req.session.loginType) {
        case "Surveyor":

            console.log("id:" + req.session.sur_id);


            surveyor.find({ "_id": req.session.sur_id }).exec(function(err, surveyorData) {

                if (err) {
                    res.json("DataBase error");
                } else {

                    res.render('surveyor/surveyor_profile', { data: surveyorData, surveyor_userName: req.session.userName, layout: "sur_layout" });

                }

            });


            break;

        default:
            next();

    }



});


module.exports = router;
