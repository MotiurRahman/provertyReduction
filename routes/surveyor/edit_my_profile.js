var express = require('express');
var router = express.Router();

var surveyor = require('../../libs/surveyorSchema');

var peoples = require('../../libs/peoplesSchema');



router.get('/', function(req, res, next) {


    switch (req.session.loginType) {
        case "Surveyor":

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

    var id = req.session.sur_id;

    var name = req.body.name;
    var father_name = req.body.father_name;
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
   

    console.log("id:" + id);
    console.log("name:" + name);
    console.log("father_name:" + father_name);
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
    



    var surveyorinfo = {
        name: name,
        father_name: father_name,
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
      


    };

    var conditions = { "_id": id },
        update = { $set: surveyorinfo };



    surveyor.update(conditions, update, callback);

    function callback(err, updatdata) {
        if (err) {
            res.json("Data is not valid");
            // mongoose.connection.close();
        } else {

            res.redirect('/')
        }
    };


});


router.get('/api/surveyor/:id', function(req, res, next) {

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
