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

                    res.render('charts', {institute_userName: req.session.userName, data: docs, social_Status: socialStatus, rich_poor: rich_poor, layout: "ins_layout" });

                    break;
                case "Surveyor":
                    res.render('charts', {surveyor_userName: req.session.userName, data: docs, social_Status: socialStatus, rich_poor: rich_poor, layout: "sur_layout" });
                    break;
                case "Admin":
                    res.render('charts', { data: docs, social_Status: socialStatus, rich_poor: rich_poor, layout: "admin_layout" });
                    break;
                default:
                    res.render('charts', { data: docs, social_Status: socialStatus, rich_poor: rich_poor });

            }




        }

    });

});



router.get('/api/:post_code', function(req, res, next) {

    var post_code = req.params.post_code;

    console.log("post_code:" + post_code);

    peoples.find({ "postCode": post_code }).sort({ _id: -1 }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            var population = status.social_status(docs);

            console.log("population");

            res.json(population);

        }

    });


});

module.exports = router;
