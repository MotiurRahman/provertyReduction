var express = require('express');
var router = express.Router();

var customer = require("./../libs/customerSchema");
var status = require('./../libs/social_status');

router.get('/', function(req, res, next) {

    res.render('form');

});


router.post('/', function(req, res, next) {

    var name = req.body.name;
    var father_name = req.body.father_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var nid = req.body.nid;
    var religion = req.body.religion;
    var marital_Status = req.body.marital_Status;
    var child_number = req.body.child_number;
    var dateOfBirth = req.body.dateOfBirth;
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

    var monthlyIncom = req.body.monthlyIncom;
    var occupation = req.body.occupation;

    var saving = req.body.saving;
    var t_a_trainig = req.body.t_a_trainig;
    var working_scope = req.body.working_scope;
   var know_t_a_trainig = req.body.know_t_a_trainig;
   var any_c_land = req.body.any_c_land;
   var natural_reson = req.body.natural_reson;
   var drugAddiction = req.body.drugAddiction;



    var statusValue = status.check_status(monthlyIncom);

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
    

    console.log("division:" + division);
    console.log("district:" + district);
    console.log("ps:" + ps);
    console.log("postCode:" + postCode);
    console.log("area:" + area);



    console.log("lastDegree:" + lastDegree);
    console.log("subject:" + subject);

    console.log("monthlyIncom:" + monthlyIncom);
    console.log("occupation:" + occupation);
    console.log("status:" + statusValue);

    console.log("saving:" + saving);
    console.log("t_a_trainig:" + t_a_trainig);
    console.log("working_scope:" + working_scope);
    console.log("know_t_a_trainig:" + know_t_a_trainig);
    console.log("any_c_land:" + any_c_land);
    console.log("natural_reson:" + natural_reson);
    console.log("drugAddiction:" + drugAddiction);

    var customerinfo = {
        name: name,
        father_name:father_name,
        email: email,
        phone: phone,
        gender: gender,
        nid: nid,
        religion: religion,
        marital_Status: marital_Status,
        child_number: child_number,
        dateOfBirth: dateOfBirth,
        bloadGroup: bloadGroup,
        localAgent:localAgent,
        agent_phone:agent_phone,

        division: division,
        district: district,
        ps: ps,
        postCode: postCode,
        area: area,

        lastDegree: lastDegree,
        subject: subject,


        occupation: occupation,
        monthlyIncom: monthlyIncom,
        status:statusValue,

        saving: saving,
        t_a_trainig: t_a_trainig,
        working_scope:working_scope,
        know_t_a_trainig: know_t_a_trainig,
        any_c_land: any_c_land,
        natural_reson:natural_reson,
        drugAddiction:drugAddiction


    };

    var new_customer = new customer(customerinfo);



    new_customer.save(function(err) {

        if (err) {
            res.json(err)
                // mongoose.connection.close();
        } else {
            res.redirect("/")

        }


    });

});


router.get('/api/:month', function(req, res, next) {

    var month = req.params.month;
    customer.find({ "month": month }).exec(function(err, monthlyUses) {

        if (err) {
            res.json(err)
        } else {
            console.log('monthlyUses:');
            res.json(monthlyUses)
        }

    });

});


router.delete('/api/:id', function(req, res, next) {

    var id = req.params.id;
    console.log("id:" + id)
    customer.find({ "_id": id }).remove(function(err, deleted) {

        if (err) {
            res.json(err)
        } else {

            res.json(deleted);
        }

    });

});


module.exports = router;
