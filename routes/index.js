var express = require('express');
var router = express.Router();

var customer = require('./../libs/customerSchema');
var status = require('./../libs/social_status');

/* GET home page. */
router.get('/', function(req, res, next) {


    customer.find().sort({ _id: -1 }).limit(100).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            var socialStatus = status.social_status(docs);



            switch (req.session.loginType) {
                case "Institute":

                    res.render('index', { data: docs, social_Status: socialStatus, layout: "ins_layout" });

                    break;
                case "Survayor":
                    res.render('index', { data: docs, social_Status: socialStatus, layout: "sur_layout" });
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



router.get('/api/:status', function(req, res, next) {

    var status = req.params.status;


    console.log("status:" + status);

    customer.find({ "status": status }).sort({ _id: -1 }).limit(100).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            res.json(docs);

        }

    });


});

module.exports = router;
