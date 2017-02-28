var express = require('express');
var router = express.Router();

var peoples = require('./../libs/peoplesSchema');
var institute = require("./../libs/t_institute");
var surveyor = require("./../libs/surveyorSchema");
var suggest = require('./../libs/recomend');



router.get('/', function(req, res, next) {
    surveyor.find({ userName: "rana" }).exec(function(err, docs) {
        if (!docs.length) {

            res.json("this is available");
        } else {
            res.json("alreasy exist");

        }
    });

});


router.get('/tec', function(req, res, next) {
    console.log("peoples API")
    peoples.find({ $or: [{ t_a_trainig: "NO" }, { working_scope: "NO" }, { any_c_land: "NO" }], $or: [{ status: "Poor" }, { status: "Extremely Poor" }], "postCode": "6341" }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            res.json(docs);
        }

    });

});

router.get('/agr', function(req, res, next) {
    console.log("peoples API")
    peoples.find({ $or: [{ t_a_trainig: "NO" }, { working_scope: "NO" }, { any_c_land: "YES" }], $or: [{ status: "Poor" }, { status: "Extremely Poor" }], "postCode": req.session.postCode }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            res.json(docs);
        }

    });

});

router.get('/Info', function(req, res, next) {
    console.log("peoples API")
    peoples.find({ $or: [{ status: "Poor" }, { status: "Extremely Poor" }], know_t_a_trainig: "NO", "postCode": "6341" }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            res.json(docs);
        }

    });

});

router.get('/ngo', function(req, res, next) {
    console.log("peoples API")
    peoples.find({ $or: [{ status: "Poor" }, { status: "Extremely Poor" }], saving: "NO", "postCode": req.session.postCode }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            res.json(docs);
        }

    });

});

router.get('/medical', function(req, res, next) {
    console.log("peoples API")
    peoples.find({ $or: [{ status: "Poor" }, { status: "Extremely Poor" }], drugAddiction: "YES", "postCode": req.session.postCode }).exec(function(err, docs) {

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












router.get('/peoples', function(req, res, next) {

    console.log("institute API")

    peoples.find({}).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            res.json(docs);
        }

    });

});


router.get('/pass', function(req, res, next) {
    console.log("surveyor API")
    institute.find({ $and: [{ _id: "58b448e462b3ac05db35667c" }, { password: "123" }] }).exec(function(err, docs) {

        if (err) {
            req.json(err)
        } else {
            if (docs.length > 0) {

                if (new_pass == re_new_pass) {

                    var institutepass = {

                        password: pass,

                    }

                    var conditions = { "_id": id },
                        update = { $set: institutepass };



                    institute.update(conditions, update, callback);

                    function callback(err, updatdata) {
                        if (err) {
                            next("Data is not valid");
                            // mongoose.connection.close();
                        } else {

                            next("Password updated");
                        }
                    };

                } else {
                    next("Password did not match");
                }



            } else {

                next("Did not find Current Password");

            }


        }

    });

});




module.exports = router;
