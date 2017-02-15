var express = require('express');
var router = express.Router();

var institute = require('../../libs/t_institute');




router.get('/', function(req, res, next) {

    institute.find().exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {

            res.render('t_institute/list_institute', { data: docs });

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
