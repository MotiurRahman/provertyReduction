var express = require('express');
var router = express.Router();

var customer = require('../../libs/customerSchema');
var status = require('../../libs/social_status');

router.get('/', function(req, res, next) {
    req.session.loginType = "all";

    res.render('signin/logout');

});


router.post('/', function(req, res, next) {

    var loginType = req.body.loginType;
    var userName = req.body.userName;
    var password = req.body.password;

    console.log("loginType:" + loginType);
    console.log("userName:" + userName);
    console.log("password:" + password);

    req.session.loginType = loginType
    console.log("session:" + req.session.loginType);

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




module.exports = router;
