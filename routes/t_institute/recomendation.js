var express = require('express');
var router = express.Router();

var peoples = require('../../libs/peoplesSchema');
var suggest = require('../../libs/recomend');



router.get('/', function(req, res, next) {

    switch (req.session.ins_type) {
        case "Technical":

            peoples.find({ $or: [{ t_a_trainig: "NO" }, { working_scope: "NO" }, { any_c_land: "NO" }], "postCode": req.session.postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {
                    console.log("RecomendatedPeople:" + docs.length);

                    res.render('t_institute/recomendation', { institute_userName: req.session.userName, data: docs, layout: "ins_layout" });
                }

            });
            break;
        case "Agricultural":
            peoples.find({ $or: [{ t_a_trainig: "NO" }, { working_scope: "NO" }, { any_c_land: "YES" }], "postCode": req.session.postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {


                    res.render('t_institute/recomendation', { institute_userName: req.session.userName, data: docs, layout: "ins_layout" });
                }

            });
            break;

        case "Medical":
            peoples.find({ drugAddiction: "YES", "postCode": req.session.postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {


                    res.render('t_institute/recomendation', { institute_userName: req.session.userName, data: docs, layout: "ins_layout" });
                }

            });
            break;

        case "Information Center":
            peoples.find({ know_t_a_trainig: "NO", "postCode": req.session.postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {


                    res.render('t_institute/recomendation', { institute_userName: req.session.userName, data: docs, layout: "ins_layout" });
                }

            });
            break;

        case "NGO":
            peoples.find({ saving: "NO", "postCode": req.session.postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {


                    res.render('t_institute/recomendation', { institute_userName: req.session.userName, data: docs, layout: "ins_layout" });
                }

            });
            break;
    }





});




module.exports = router;
