var express = require('express');
var router = express.Router();

var peoples = require('./../libs/peoplesSchema');



router.get('/', function(req, res, next) {

    peoples.find().exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

          

            switch (req.session.loginType) {
                case "Institute":

                    res.render('tables', { institute_userName: req.session.short_name, data: docs, layout: "ins_layout" });

                    break;
                case "Surveyor":
                    res.render('tables', { surveyor_userName: req.session.userName, data: docs, layout: "sur_layout" });
                    break;
                case "Admin":
                    res.render('tables', { data: docs, layout: "admin_layout" });
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
