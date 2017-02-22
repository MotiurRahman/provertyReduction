var express = require('express');
var router = express.Router();

var peoples = require('./../libs/peoplesSchema');
var institute = require("./../libs/t_institute");
var surveyor = require("./../libs/surveyorSchema");



router.get('/', function(req, res, next) {
    console.log("peoples API")
    institute.find({$or: [{ ac_status: "Request" }, { ac_status: "Inactive" }]}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            res.json(docs);
        }

    });

});




router.get('/ins', function(req, res, next) {
    console.log("peoples API")


    peoples_info = {
        institute: "KEKP"
    }



    var peoples_conditions = { "ins_id": "58a74a97ca39ce1696a02d07" },
        peoples_update = { $set: peoples_info };




    peoples.update(peoples_conditions, peoples_update, callback);

    function callback(err, updatdata) {
        if (err) {
            res.json("Data is not valid");
            // mongoose.connection.close();
        } else {


            res.json(updatdata);



        }
    };


});


router.get('/all_ins', function(req, res, next) {
    console.log("peoples API")

    peoples.find({ "ins_id": "58a74a97ca39ce1696a02d07" }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            peoples_info = {
                institute: "KEKP"
            }

            var ids = [];

            for (var i = 0; i < docs.length; i++) {
                ids.push(docs[i]._id);
            }

            var peoples_conditions = { "_id": { "$in": ids } },
                peoples_update = { $set: peoples_info },
                multi = { multi: true };




            peoples.update(peoples_conditions, peoples_update, multi, callback);

            function callback(err, updatdata) {
                if (err) {
                    res.json("Data is not valid");
                    // mongoose.connection.close();
                } else {


                    res.json(updatdata);



                }
            };



        }

    });






});












router.get('/institute', function(req, res, next) {

    console.log("institute API")

    institute.find({}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            res.json(docs);
        }

    });

});


router.get('/surveyor', function(req, res, next) {
    console.log("surveyor API")
    institute.find({}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            res.json(docs);
        }

    });

});




module.exports = router;
