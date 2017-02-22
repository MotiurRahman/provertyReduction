var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  

  switch (req.session.loginType) {
        case "Institute":

            res.render('solution', {institute_userName: req.session.userName, layout: "ins_layout" });

            break;
        case "Surveyor":
            res.render('solution', {surveyor_userName: req.session.userName, layout: "sur_layout" });
            break;
        case "Admin":
            res.render('solution', { layout: "admin_layout" });
            break;
        default:
           res.render('solution');

    }
});

module.exports = router;