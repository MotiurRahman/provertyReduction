var express = require('express');
var router = express.Router();


var institute = require("../../libs/t_institute");
var surveyor = require("../../libs/surveyorSchema");

router.get('/ins_pass_change', function(req, res, next) {
	console.log("this is ins_pass_change page");

   res.render('setting/ins_pass_change', { institute_userName: req.session.short_name, layout: "ins_layout" });


});



router.get('/sur_pass_change', function(req, res, next) {
	console.log("this is sur_pass_change page");

    res.render('setting/sur_pass_change',{surveyor_userName: req.session.userName, layout: "sur_layout" });

});


module.exports = router;