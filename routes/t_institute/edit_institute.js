var express = require('express');
var router = express.Router();

var institute = require('../../libs/t_institute');




router.get('/', function(req, res, next) {
   

    switch (req.session.loginType) {
        case "Institute":

            res.render('t_institute/edit_institute', {institute_userName: req.session.userName, layout: "ins_layout" });

            break;
        
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




    };


    var conditions = { "_id": id },
        update = { $set: instituteinfo };



    institute.update(conditions, update, callback);

    function callback(err, updatdata) {
        if (err) {
            res.json("Data is not valid");
            // mongoose.connection.close();
        } else {

            res.redirect('/')
        }
    };


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
