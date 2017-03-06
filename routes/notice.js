var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {


    switch (req.session.loginType) {
        case "Institute":

            res.render('notice', {institute_userName: req.session.short_name, layout: "ins_layout" });
           // res.render('algorithm', {layout: "ins_layout" });

            break;
        case "Surveyor":
            res.render('notice', {surveyor_userName: req.session.userName, layout: "sur_layout" });
            break;
        case "Admin":
            res.render('notice', { layout: "admin_layout" });
            break;
        default:
            res.render('notice');

    }
});

module.exports = router;
