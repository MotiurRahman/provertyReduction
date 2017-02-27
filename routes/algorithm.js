var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {


    switch (req.session.loginType) {
        case "Institute":

            res.render('algorithm', {institute_userName: req.session.short_name, layout: "ins_layout" });
           // res.render('algorithm', {layout: "ins_layout" });

            break;
        case "Surveyor":
            res.render('algorithm', {surveyor_userName: req.session.userName, layout: "sur_layout" });
            break;
        case "Admin":
            res.render('algorithm', { layout: "admin_layout" });
            break;
        default:
            res.render('algorithm');

    }
});

module.exports = router;
