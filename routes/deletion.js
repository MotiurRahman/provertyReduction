var express = require('express');
var router = express.Router();

var peoples = require('./../libs/peoplesSchema');
var surveyor = require('./../libs/surveyorSchema');
var institute = require('./../libs/t_institute');

router.get('/', function(req, res, next) {
   

    switch (req.session.loginType) {
       
        case "Admin":
            res.render('deletion', { layout: "admin_layout" });
            break;
        default:
           next();

    }
});


router.delete('/institute/:id', function(req, res, next) {
    var id = req.params.id;


    console.log("institute_id:" + id);

    function instituteRevove() {

        institute.remove({ "_id": id }).exec(function(err, docs) {

            if (err) {
                res.json(err)
            } else {

                res.json("ID has been deleted successfully");

            }

        });

    }

    institute.find({ "_id": req.params.id }).exec(function(err, result) {

        if (err) {
            res.json(err)
        } else {

            if (result.length > 0) {
                instituteRevove();
            } else {
                res.json("Id does not find");
            }


        }

    });




});

router.delete('/surveyor/:id', function(req, res, next) {
    var id = req.params.id;


    console.log("surveyor_id:" + id);

    function surveyorRemove() {

        surveyor.remove({ "_id": id }).exec(function(err, docs) {

            if (err) {
                res.json(err)
            } else {

                res.json("ID has been deleted successfully");
            }

        });

    }
    surveyor.find({ "_id": req.params.id }).exec(function(err, result) {

        if (err) {
            res.json(err)
        } else {

            if (result.length > 0) {
                surveyorRemove();
            } else {
                res.json("Id does not find");
            }


        }

    });



});

router.delete('/peoples/:id', function(req, res, next) {
    var id = req.params.id;


    console.log("Ploples_id:" + id);

    function peopleRemove() {

        peoples.remove({ "_id": id }).exec(function(err, docs) {

            if (err) {
                res.json(err)
            } else {

                res.json("ID has been deleted successfully");

            }

        });
    }


    peoples.find({ "_id": req.params.id }).exec(function(err, result) {

        if (err) {
            res.json(err)
        } else {

            if (result.length > 0) {
                peopleRemove();
            } else {
                res.json("Id does not find");
            }


        }

    });



});


module.exports = router;
