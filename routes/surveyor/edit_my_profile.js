var express = require('express');
var router = express.Router();

var surveyor = require('../../libs/surveyorSchema');

var peoples = require('../../libs/peoplesSchema');



router.get('/', function(req, res, next) {


    switch (req.session.loginType) {
        case "Survayor":

            console.log("id:" + req.session.sur_id);


            surveyor.find({ "_id": req.session.sur_id }).exec(function(err, personData) {

                if (err) {
                    res.json("DataBase error");
                } else {

                    res.render('surveyor/edit_my_profile', { data: personData, surveyor_userName: req.session.userName, layout: "sur_layout" });

                }

            });


            break;

        default:
            next();

    }


});



router.post('/', function(req, res, next) {

    var id_valu = req.session.data;
    var id = id_valu[0]._id;

    var name = req.body.name;
    var short_name = req.body.short_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var training_name = req.body.training_name;
    var webAddress = req.body.webAddress;

    var division = req.body.division;
    var district = req.body.district;
    var ps = req.body.ps;
    var postCode = req.body.postCode;
    var userName = req.body.userName;

    console.log("id:" + id);
    console.log("name:" + name);
    console.log("short_name:" + short_name);
    console.log("email:" + email);
    console.log("phone:" + phone);
    console.log("training_name:" + training_name);
    console.log("webAddress:" + webAddress);

    console.log("division:" + division);
    console.log("district:" + district);
    console.log("ps:" + ps);
    console.log("postCode:" + postCode);
    console.log("userName:" + userName);



    var instituteinfo = {
        name: name,
        short_name: short_name,
        email: email,
        phone: phone,
        training_name: training_name,
        webAddress: webAddress,
        userName: userName,

        division: division,
        district: district,
        ps: ps,
        postCode: postCode,




    };

    var conditions = { "_id": id },
        update = { $set: instituteinfo };






    surveyor.update(conditions, update, callback);

    function callback(err, updatdata) {
        if (err) {
            res.json("Data is not valid");
            // mongoose.connection.close();
        } else {



            // Find Peoles data according to the institute ID

            peoples.find({ "ins_id": id }).exec(function(err, docs) {

                if (err) {
                    res.json(err)
                } else {


                    peoples_info = {
                        institute: short_name
                    }

                    var ids = [];

                    for (var i = 0; i < docs.length; i++) {
                        ids.push(docs[i]._id);
                    }

                    var peoples_conditions = { "_id": { "$in": ids } },
                        peoples_update = { $set: peoples_info },
                        multi = { multi: true };



                    // Update the short_name of peoples data according to the institute ID


                    peoples.update(peoples_conditions, peoples_update, multi, callback);

                    function callback(err, updatdata) {
                        if (err) {
                            res.json("Data is not valid");
                            // mongoose.connection.close();
                        } else {


                            res.redirect("/");



                        }
                    };



                }

            });



        }
    };


});



router.get('/api/surveyor/:id', function(req, res, next) {

    console.log("ID:"+req.params.id);

    surveyor.find({ "_id": req.params.id }).exec(function(err, result) {

        if (err) {
            res.json(err)
        } else {

            console.log("surveyor Data");

            res.json(result);

        }

    });
});


module.exports = router;
