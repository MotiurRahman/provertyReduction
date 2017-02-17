var express = require('express');
var router = express.Router();

var institute = require('../../libs/t_institute');




router.get('/', function(req, res, next) {

    institute.find().exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            

            switch (req.session.loginType) {
        case "Institute":

            res.render('t_institute/list_institute', {institute_userName: req.session.userName, data: docs, layout: "ins_layout" });

            break;
        case "Survayor":
            res.render('t_institute/list_institute', {surveyor_userName: req.session.userName, data: docs, layout: "sur_layout" });
            break;
        case "Admin":
            res.render('t_institute/list_institute', { data: docs, layout: "admin_layout" });
            break;
        default:
           res.render('t_institute/list_institute', { data: docs });

    }

        }

    });

});



router.get('/api/:post_code', function(req, res, next) {

	var post_code = req.params.post_code;
	console.log("post_code:"+post_code);

    institute.find({postCode:post_code}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            res.json(docs);

        }

    });

});

module.exports = router;
