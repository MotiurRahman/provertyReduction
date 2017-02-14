var express = require('express');
var router = express.Router();

var institute = require("../../libs/t_institute");


router.get('/', function(req, res, next) {
  res.render('signup/govt_org');
});




router.post('/', function(req, res, next) {
    var name = req.body.name;
    var short_name = req.body.short_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var training_name = req.body.training_name;
    var userName = req.body.userName;
    var password = req.body.password;
    var re_password = req.body.re_password;
   
    var division = req.body.division;
    var district = req.body.district;
    var ps = req.body.ps;
    var postCode = req.body.postCode;

    console.log("name:" + name);
    console.log("father_name:" + father_name);
    console.log("email:" + email);
    console.log("phone:" + phone);
    console.log("gender:" + gender);
    console.log("religion:" + religion);
    console.log("marital_Status:" + marital_Status);
    console.log("child_number:" + child_number);
    console.log("nid:" + nid);
    console.log("dateOfBirth:" + dateOfBirth);
    console.log("bloadGroup:" + bloadGroup);
    console.log("localAgent:" + localAgent);
    console.log("agent_phone:" + agent_phone);
    
 
   var instituteinfo = {
        name: name,
        short_name:short_name,
        email: email,
        phone: phone,
        training_name: training_name,
        userName: userName,
        password: password,
        re_password: re_password,
        

        division: division,
        district: district,
        ps: ps,
        postCode: postCode,
        


    };

    var new_institute = new institute(instituteinfo);



    new_institute.save(function(err) {

        if (err) {
            res.json(err)
                // mongoose.connection.close();
        } else {
            res.redirect("/")

        }


    });

});

module.exports = router;