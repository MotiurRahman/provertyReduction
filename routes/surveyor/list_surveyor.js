var express = require('express');
var router = express.Router();

var surveyor = require('../../libs/surveyorSchema');




router.get('/', function(req, res, next) {

    surveyor.find().exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            switch (req.session.loginType) {
                case "Institute":

                    res.render('surveyor/list_surveyor', {institute_userName: req.session.userName, data: docs, layout: "ins_layout" });

                    break;
                case "Surveyor":
                    res.render('surveyor/list_surveyor', {surveyor_userName: req.session.userName, data: docs, layout: "sur_layout" });
                    break;
                case "Admin":
                    res.render('surveyor/list_surveyor', { data: docs, layout: "admin_layout" });
                    break;
                default:
                    res.render('surveyor/list_surveyor',{data: docs});

            }

        }

    });

});



router.get('/api/:post_code', function(req, res, next) {

    var post_code = req.params.post_code;
    console.log("post_code:" + post_code);

    surveyor.find({ postCode: post_code }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            res.json(docs);

        }

    });

});

module.exports = router;
