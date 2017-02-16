var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  

  switch (req.session.loginType) {
        case "Institute":

            res.render('solution', { layout: "ins_layout" });

            break;
        case "Survayor":
            res.render('solution', { layout: "sur_layout" });
            break;
        case "Admin":
            res.render('solution', { layout: "admin_layout" });
            break;
        default:
           res.render('solution');

    }
});

module.exports = router;