var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var validator = require("validator");

var institute = require('../../libs/t_institute');




router.get('/', function(req, res, next) {


    switch (req.session.loginType) {

        case "Admin":
            res.render('t_institute/edit_institute', { layout: "admin_layout" });
            break;
        default:
            next();

    }


});



router.post('/', function(req, res, next) {


    var id = req.body.id;

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
    var ins_type = req.body.ins_type;
    var ac_status = req.body.ac_status;
    var notification_check = req.body.notification_check;
    var notification_mail = req.body.notification_mail;

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
    console.log("ins_type:" + ins_type);
    console.log("ac_status:" + ac_status);
    console.log("notification_check:" + notification_check);






    var instituteinfo = {
        name: name,
        short_name: short_name,
        email: email,
        phone: phone,
        training_name: training_name,
        webAddress: webAddress,

        division: division,
        district: district,
        ps: ps,
        postCode: postCode,
        ins_type: ins_type,
        ac_status: ac_status

    };


    var conditions = { "_id": id },
        update = { $set: instituteinfo };


    if (notification_check == "on") {
        console.log("notification_mail:" + notification_mail);


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
            text: notification_mail //, // plaintext body
                // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };

        if (validator.isEmail(email)) {
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    console.log("Please try again");
                } else {
                    
                    console.log("Message has been send successfully");

                    institute.update(conditions, update, callback);

                    function callback(err, updatdata) {
                        if (err) {
                            res.json("Data is not valid");
                            // mongoose.connection.close();
                        } else {

                            res.redirect('/')
                        }
                    };

                };
            });


        } else {
            res.json("Email is not valid");
        }
    } else {


        if (validator.isEmail(email)) {
            institute.update(conditions, update, callback);

            function callback(err, updatdata) {
                if (err) {
                    res.json("Data is not valid");
                    // mongoose.connection.close();
                } else {

                    res.redirect('/')
                }
            };

        } else {
            res.json("Email is not valid");
        }
    }



});


router.get('/api/institute/:id', function(req, res, next) {

    institute.find({ "_id": req.params.id }).exec(function(err, result) {

        if (err) {
            res.json(err)
        } else {

            console.log("institute Data");

            res.json(result);

        }

    });
});


module.exports = router;
