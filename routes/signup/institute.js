var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var validator = require("validator");

var institute = require("../../libs/t_institute");


router.get('/', function(req, res, next) {

    res.render('signup/institute');
});




router.post('/', function(req, res, next) {
    var name = req.body.name;
    var short_name = req.body.short_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var training_name = req.body.training_name;
    var webAddress = req.body.webAddress;
    var password = req.body.password;
    var re_password = req.body.re_password;

    var division = req.body.division;
    var district = req.body.district;
    var ps = req.body.ps;
    var postCode = req.body.postCode;
    var ins_type = req.body.ins_type;

    console.log("name:" + name);
    console.log("short_name:" + short_name);
    console.log("email:" + email);
    console.log("phone:" + phone);
    console.log("training_name:" + training_name);
    console.log("password:" + password);
    console.log("re_password:" + re_password);
    console.log("division:" + division);
    console.log("district:" + district);
    console.log("ps:" + ps);
    console.log("postCode:" + postCode);
    console.log("ins_type:" + ins_type);
    var ac_status = "Request";

    //var message  = "Hello "+short_name+"/n"+"Thanks for your request. We will approve your account within 3 working days."
    var msgBody = "<b>Hello " + short_name + "</b> <br> Thanks for your request. We will approve your account within 3 working days.";


    var instituteinfo = {
        name: name,
        short_name: short_name,
        email: email,
        phone: phone,
        training_name: training_name,
        webAddress: webAddress,
        password: password,

        division: division,
        district: district,
        ps: ps,
        postCode: postCode,
        ins_type: ins_type,
        ac_status: ac_status



    };

    var new_institute = new institute(instituteinfo);

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

                new_institute.save(function(err) {

                    if (err) {
                        res.json(err)
                            // mongoose.connection.close();
                    } else {
                        next("Your account will be activated within 3 working days.");

                    }


                });
            }

            institute.find({ email: email }).exec(function(err, docs) {
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
        institute.find({ email: req.params.email }).exec(function(err, docs) {
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

module.exports = router;
