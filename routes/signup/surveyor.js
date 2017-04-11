var express = require('express');
var router = express.Router();
var validator = require("validator");
var nodemailer = require('nodemailer');

var surveyor = require("../../libs/surveyorSchema");
var dist = require("../../libs/dist");



router.get('/', function(req, res, next) {

    res.render('signup/surveyor');
});


router.post('/', function(req, res, next) {

    var name = req.body.name;
    var father_name = req.body.father_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var nid = req.body.nid;
    var religion = req.body.religion;
    var dateOfBirth = req.body.dateOfBirth;
    var residence = req.body.residence;
    var bloadGroup = req.body.bloadGroup;
    var localAgent = req.body.localAgent;
    var agent_phone = req.body.agent_phone;



    var division = req.body.division;
    var district = req.body.district;
    var ps = req.body.ps;
    var postCode = req.body.postCode;
    var area = req.body.area;



    var lastDegree = req.body.lastDegree;
    var subject = req.body.subject;
    var occupation = req.body.occupation;

    var password = req.body.password;
    var re_password = req.body.re_password;



    console.log("name:" + name);
    console.log("father_name:" + father_name);
    console.log("email:" + email);
    console.log("phone:" + phone);
    console.log("gender:" + gender);
    console.log("religion:" + religion);
    console.log("nid:" + nid);
    console.log("dateOfBirth:" + dateOfBirth);
    console.log("residence:" + residence);
    console.log("bloadGroup:" + bloadGroup);
    console.log("localAgent:" + localAgent);
    console.log("agent_phone:" + agent_phone);


    console.log("division:" + division);
    console.log("district:" + district);
    console.log("ps:" + ps);
    console.log("postCode:" + postCode);
    console.log("area:" + area);



    console.log("lastDegree:" + lastDegree);
    console.log("subject:" + subject);
    console.log("occupation:" + occupation);

    console.log("password:" + password);
    console.log("re_password:" + re_password);
    var ac_status = "Request";
    var msgBody = "<b>Hello " + name + "</b> <br> Thanks for your request. We will approve your account within 3 working days.";


    var surveyorinfo = {
        name: name,
        father_name: father_name,
        email: email,
        phone: phone,
        gender: gender,
        nid: nid,
        religion: religion,

        dateOfBirth: dateOfBirth,
        residence: residence,
        bloadGroup: bloadGroup,
        localAgent: localAgent,
        agent_phone: agent_phone,

        division: division,
        district: district,
        ps: ps,
        postCode: postCode,
        area: area,

        lastDegree: lastDegree,
        subject: subject,
        occupation: occupation,
        password: password,
        ac_status: ac_status

    };

    var new_surveyor = new surveyor(surveyorinfo);


    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'motiur.mbstu@gmail.com', // Your email id
            pass: 'cvifcxpetookuwts' // Your password
        }
    });


    var mailOptions = {
        from: 'motiur.mbstu@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Account Releated Information", // Subject line
        // text: message //, // plaintext body
        html: msgBody // You can choose to send an HTML body instead
    };

    if (password == re_password) {

        if (validator.isEmail(email)) {

            function userCheck() {

                new_surveyor.save(function(err) {

                    if (err) {
                        res.json(err)
                            // mongoose.connection.close();
                    } else {
                        next("Your account will be activated within 3 working days.");

                    }


                });
            }

            surveyor.find({ email: email }).exec(function(err, docs) {
                if (docs.length > 0) {

                    next("Email Already Exist");
                } else {
                    userCheck();

                }
            });


        } else {
            next("Email is not valid");
        }
    } else {
        next("Password Does Not Match");
    }


});

router.get('/userNamecheck/:email', function(req, res, next) {

    if (validator.isEmail(req.params.email)) {

        surveyor.find({ email: req.params.email }).exec(function(err, docs) {
            if (docs.length > 0) {

                res.json("Email Already Exist");
            } else {

                res.json("User Email is OK");
            }
        });
    } else {
        res.json("Email is not valid");

    }


});


router.get('/district/:district', function(req, res, next) {

    dist.find({ dist_name: req.params.district }).exec(function(err, docs) {
        if (err) {

            res.json("Something went wrong");

        } else {

            console.log("upzilaNumber:"+docs.length);

            res.json(docs);
        }
    });



});


router.post('/district', function(req, res, next) {

    var dist_name = req.body.dist_name;
    var ps = req.body.ps;

    //console.log("name:" + name);
    //console.log("PS:" + PS);

    var dist_ps = {
        dist_name: dist_name,
        ps: ps
    };

    var new_dist_ps = new dist(dist_ps);
    new_dist_ps.save(function(err) {

        if (err) {
            res.json(err)

        } else {
            res.json("Data Inserted successfully");
        }


    });


});

router.get('/district', function(req, res, next) {


    dist.find().exec(function(err, docs) {
        res.json(docs);
    });



});

router.delete('/district/:district', function(req, res, next) {


    dist.remove({ dist_name: req.params.district }).exec(function(err, docs) {
        res.json(docs);
    });



});





module.exports = router;
