var express = require('express');
var router = express.Router();

var surveyor = require("../../libs/surveyorSchema");


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

    var userName = req.body.userName;
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

    console.log("userName:" + userName);
    console.log("password:" + password);
    console.log("re_password:" + re_password);


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
        userName: userName,
        password: password,

    };

    var new_surveyor = new surveyor(surveyorinfo);


    if (password == re_password) {
        new_surveyor.save(function(err) {

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
