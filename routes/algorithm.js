var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {


    switch (req.session.loginType) {
        case "Institute":

            res.render('algorithm', { layout: "ins_layout" });

            break;
        case "Survayor":
            res.render('algorithm', { layout: "sur_layout" });
            break;
        case "Admin":
            res.render('algorithm', { layout: "admin_layout" });
            break;
        default:
            res.render('algorithm');

    }
});

module.exports = router;
