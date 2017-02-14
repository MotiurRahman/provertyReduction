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


            res.render('index', { data: docs, social_Status: socialStatus});
        }

    });

});



router.get('/api/:status', function(req, res, next) {

    var status = req.params.status;
    

    console.log("status:" + status);

    customer.find({ "status": status}).sort({ _id: -1 }).limit(100).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            res.json(docs);

        }

    });


});

module.exports = router;
