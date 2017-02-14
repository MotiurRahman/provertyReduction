var express = require('express');
var router = express.Router();

var customer = require('./../libs/customerSchema');
var status = require('./../libs/social_status');


router.get('/', function(req, res, next) {

    customer.find().exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            var socialStatus = status.social_status(docs);
            var rich_poor = status.rich_poor(docs);


            console.log("richman:" + rich_poor.richMan.length);

            console.log("extremelyPoor:" + rich_poor.extremelyPoor.length);


            res.render('tables', { data: docs, social_Status: socialStatus, rich_poor: rich_poor });
        }

    });


});



router.get('/api/:status/:post_code', function(req, res, next) {

    var status = req.params.status;
    var post_code = req.params.post_code;

    console.log("status:" + status);

    console.log("post_code:" + post_code);

    customer.find({ "status": status, "postCode": post_code }).sort({ _id: -1 }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            res.json(docs);

        }

    });


});


module.exports = router;
