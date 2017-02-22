var express = require('express');
var router = express.Router();

var peoples = require('./../libs/peoplesSchema');
var status = require('./../libs/social_status');


router.get('/', function(req, res, next) {

    peoples.find().exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            var socialStatus = status.social_status(docs);
            var rich_poor = status.rich_poor(docs);


            console.log("richman:" + rich_poor.richMan.length);

            console.log("extremelyPoor:" + rich_poor.extremelyPoor.length);


            switch (req.session.loginType) {
                case "Institute":

                    res.render('tables', { institute_userName: req.session.userName, data: docs, social_Status: socialStatus, rich_poor: rich_poor, layout: "ins_layout" });

                    break;
                case "Surveyor":
                    res.render('tables', { surveyor_userName: req.session.userName, data: docs, social_Status: socialStatus, rich_poor: rich_poor, layout: "sur_layout" });
                    break;
                case "Admin":
                    res.render('tables', { data: docs, social_Status: socialStatus, rich_poor: rich_poor, layout: "admin_layout" });
                    break;
                default:
                    next();

            }
        }

    });


});



router.get('/api/:status/:post_code', function(req, res, next) {

    var status = req.params.status;
    var post_code = req.params.post_code;

    console.log("status:" + status);

    console.log("post_code:" + post_code);

    peoples.find({ "status": status, "postCode": post_code }).sort({ _id: -1 }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            res.json(docs);

        }

    });


});


module.exports = router;
