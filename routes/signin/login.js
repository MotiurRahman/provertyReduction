var express = require('express');
var router = express.Router();

var peoples = require('../../libs/peoplesSchema');
var status = require('../../libs/social_status');
var institute = require("../../libs/t_institute");
var surveyor = require("../../libs/surveyorSchema");

router.get('/', function(req, res, next) {

    res.render('signin/login');

});


router.post('/', function(req, res, next) {

    var loginType = req.body.loginType;
    var userName = req.body.userName;
    var password = req.body.password;

    console.log("loginType:" + loginType);
    console.log("userName:" + userName);
    console.log("password:" + password);

    req.session.loginType = loginType;

    console.log("session:" + req.session.loginType);

    peoples.find().sort({ _id: -1 }).limit(100).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            var socialStatus = status.social_status(docs);
            switch (req.session.loginType) {
                case "Institute":



                    institute.find({ $and: [{ userName: userName }, { password: password },{ac_status:"Active"}] }).exec(function(err, personData) {

                        if (err) {
                            res.json("Database Error");
                        } else {

                            // res.json(personData);
                            console.log("personData:" + personData.length);

                            if (personData.length > 0) {
                                req.session.ins_id = personData[0]._id;
                                console.log("ins_id:"+req.session.ins_id);
                                req.session.ins_type = personData[0].ins_type;
                                req.session.postCode  = personData[0].postCode;
                                
                                req.session.userName = personData[0].userName;
                                req.session.short_name = personData[0].short_name;
                                req.session.data = personData;
                                res.render('index', { data: docs, institute_userName: req.session.userName, social_Status: socialStatus, layout: "ins_layout" });

                            } else {
                                 res.json("Your Account is not active");
                                 req.session.destroy();
                            }

                        }

                    });


                    break;
                case "Surveyor":


                    surveyor.find({ $and: [{ userName: userName }, { password: password },{ac_status:"Active"}] }).exec(function(err, surveyor_Data) {

                        if (err) {
                            res.json("password Does not match");
                        } else {

                            console.log("personData:" + surveyor_Data.length);


                            if (surveyor_Data.length > 0) {
                                req.session.sur_id = surveyor_Data[0]._id;
                                 req.session.userName = surveyor_Data[0].userName;
                                res.render('index', { data: docs, surveyor_userName: req.session.userName, social_Status: socialStatus, layout: "sur_layout" });

                            } else {
                                res.json("Your Account is not active");
                                req.session.destroy();

                            }

                        }

                    });

                    break;
                case "Admin":
                    res.render('index', { data: docs, social_Status: socialStatus, layout: "admin_layout" });
                    break;
                default:
                    res.render('index', { data: docs, social_Status: socialStatus });

            }


        }

    });



});




module.exports = router;
