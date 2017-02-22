var express = require('express');
var router = express.Router();

var institute = require("../../libs/t_institute");


router.get('/', function(req, res, next) {
    

    console.log("session:"+req.session.loginType);

    switch (req.session.loginType) {
        case "Institute":

            res.render('signup/institute', {institute_userName: req.session.userName, layout: "ins_layout" });

            break;
        case "Surveyor":
            res.render('signup/institute', {surveyor_userName: req.session.userName, layout: "sur_layout"  });
            break;
        case "Admin":
            res.render('signup/institute', { layout: "admin_layout"  });
            break;
        default:
            res.render('signup/institute' );

    }
});




router.post('/', function(req, res, next) {
    var name = req.body.name;
    var short_name = req.body.short_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var training_name = req.body.training_name;
    var webAddress = req.body.webAddress;
    var userName = req.body.userName;
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
    console.log("userName:" + userName);
    console.log("password:" + password);
    console.log("re_password:" + re_password);
    console.log("division:" + division);
    console.log("district:" + district);
    console.log("ps:" + ps);
    console.log("postCode:" + postCode);
    console.log("ins_type:" + ins_type);
    var ac_status = "Request";



    var instituteinfo = {
        name: name,
        short_name: short_name,
        email: email,
        phone: phone,
        training_name: training_name,
        webAddress: webAddress,
        userName: userName,
        password: password,

        division: division,
        district: district,
        ps: ps,
        postCode: postCode,
        ins_type: ins_type,
        ac_status: ac_status



    };

    var new_institute = new institute(instituteinfo);

    if (password == re_password) {
        new_institute.save(function(err) {

            if (err) {
                res.json(err)
                    // mongoose.connection.close();
            } else {
                res.redirect("/")

            }


        });


    } else {
        res.json("password Does not matrch");
    }


});

module.exports = router;
