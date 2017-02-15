var express = require('express');
var router = express.Router();

var customer = require('./../libs/customerSchema');
var status_data = require('./../libs/social_status');


router.get('/', function(req, res, next) {

    customer.find({ $or: [{ status: "poor" }, { status: "extremelyPoor" }] }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            var resonOfPoor = status_data.resonOfPoor(docs);

            var total = docs.length;
            console.log("total:" + total);

            console.log("saving:" + resonOfPoor.yes_savings);
            console.log("no saving:" + resonOfPoor.no_savings);
            console.log("yes_t_a_trainig:" + resonOfPoor.yes_t_a_trainig);
            console.log("no_t_a_trainig:" + resonOfPoor.no_t_a_trainig);
            console.log("yes_working_scope:" + resonOfPoor.yes_working_scope);
            console.log("no_working_scope:" + resonOfPoor.no_working_scope);




            res.render('poorCharts', { data: docs, resonOfPoor: resonOfPoor, totalNum: total });
        }

    });

});




router.get('/api/:status/:post_code', function(req, res, next) {

    var status = req.params.status;
    var post_code = req.params.post_code;

    console.log("status:" + status);

    console.log("post_code:" + post_code);

    if (status == "both") {
        customer.find({ $or: [{ status: "Poor" }, { status: "Extremely Poor" }], "postCode": post_code }).sort({ _id: -1 }).exec(function(err, docs) {

            if (err) {
                res.json(err)
            } else {

                for (var i = 0; i < docs.length; i++) {
                    console.log("working_scope:" + docs[i].working_scope)
                }

                var extremlypPoor_poor = status_data.resonOfPoor(docs);

                res.json(extremlypPoor_poor);

            }

        });

    } else {



        customer.find({ "status": status, "postCode": post_code }).sort({ _id: -1 }).exec(function(err, docs) {

            if (err) {
                res.json(err)
            } else {


                var reason_Poor = status_data.resonOfPoor(docs);

                for (var i = 0; i < docs.length; i++) {
                    console.log("working_scope:" + docs[i].working_scope)
                }



                res.json(reason_Poor);

            }

        });
    }

});

module.exports = router;
