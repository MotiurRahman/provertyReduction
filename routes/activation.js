var express = require('express');
var router = express.Router();

var institute = require("./../libs/t_institute");


router.get('/', function(req, res, next) {

   institute.find({$or: [{ ac_status: "Request" }, { ac_status: "Inactive" }]}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

 
            switch (req.session.loginType) {
               
                case "Admin":
                    res.render('activation', { data: docs, layout: "admin_layout" });
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
