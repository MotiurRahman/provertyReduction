var express = require('express');
var router = express.Router();


var institute = require("../../libs/t_institute");
var surveyor = require("../../libs/surveyorSchema");

router.get('/ins_pass_change', function(req, res, next) {
    console.log("this is ins_pass_change page");

    res.render('setting/ins_pass_change', { institute_userName: req.session.short_name, layout: "ins_layout" });


});

router.post('/ins_pass_change', function(req, res, next) {
    console.log("this is ins_pass_change page");

    var cur_pass = req.body.cur_pass;
    var new_pass = req.body.new_pass;
    var re_new_pass = req.body.re_new_pass;

    institute.find({ $and: [{ _id: req.session.ins_id }, { password: cur_pass }] }).exec(function(err, docs) {

        if (err) {
            req.json(err)
        } else {
            if (docs.length > 0) {

                if (new_pass == re_new_pass) {

                    var institutepass = {

                        password: new_pass,

                    }

                    var conditions = { "_id": req.session.ins_id },
                        update = { $set: institutepass };



                    institute.update(conditions, update, callback);

                    function callback(err, updatdata) {
                        if (err) {
                            next("Data is not valid");
                            // mongoose.connection.close();
                        } else {

                            res.redirect("/logout");
                        }
                    };

                } else {
                    next("Password did not match");
                }



            } else {

                next("Did not find Current Password");

            }


        }

    });
});







router.get('/sur_pass_change', function(req, res, next) {
    console.log("this is sur_pass_change page");

    res.render('setting/sur_pass_change', { surveyor_userName: req.session.userName, layout: "sur_layout" });

});

router.post('/sur_pass_change', function(req, res, next) {
    console.log("this is sur_pass_change page");

    console.log("this is ins_pass_change page");

    var cur_pass = req.body.cur_pass;
    var new_pass = req.body.new_pass;
    var re_new_pass = req.body.re_new_pass;

    surveyor.find({ $and: [{ _id: req.session.sur_id }, { password: cur_pass }] }).exec(function(err, docs) {

        if (err) {
            req.json(err)
        } else {
            if (docs.length > 0) {

                if (new_pass == re_new_pass) {

                    var surveyorpass = {

                        password: new_pass,

                    }

                    var conditions = { "_id": req.session.sur_id },
                        update = { $set: surveyorpass };

                        console.log("Session_Id:"+req.session.sur_id);



                    surveyor.update(conditions, update, callback);

                    function callback(err, updatdata) {
                        if (err) {
                            next("Data is not valid");
                            // mongoose.connection.close();
                        } else {

                            res.redirect("/logout");
                        }
                    };

                } else {
                    next("Password did not match");
                }



            } else {

                next("Did not find Current Password");

            }


        }

    });

});



module.exports = router;
