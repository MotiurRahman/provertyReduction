var express = require('express');
var router = express.Router();

var peoples = require('../../libs/peoplesSchema');




router.get('/', function(req, res, next) {

    peoples.find({ "ins_id": req.session.ins_id }).exec(function(err, docs) {

        if (err) {
            res.json(err)
        } else {


            switch (req.session.loginType) {
                case "Institute":

                    res.render('t_institute/addTo', {institute_userName: req.session.userName, data: docs, layout: "ins_layout" });

                    break;
               
                case "Admin":
                    res.render('t_institute/addTo', { data: docs, layout: "admin_layout" });
                    break;
                default:
                   next();

            }

        }

    });

});


router.post('/', function(req, res, next) {

    var id = req.body.id;
    var dept = req.body.dept;
    var institute = req.session.short_name;


    console.log("id:" + id);
    console.log("dept:" + dept);
    console.log("institute:" + institute);


    var instituteInfo = {
        dept: dept,
        institute: institute,
        ins_id:req.session.ins_id
    }

    var conditions = { "_id": id },
        update = { $set: instituteInfo };



    peoples.update(conditions, update, callback);

    function callback(err, updatdata) {
        if (err) {
            res.json("Data is not valid");
            // mongoose.connection.close();
        } else {

            res.redirect("/addTo");
        }
    };




});


router.put('/api/:id', function(req, res, next) {

    var id = req.body.id;


    console.log("id:" + id);



    var instituteInfo = {
        dept: "",
        institute: "",
        ins_id:""
    }

    var conditions = { "_id": id },
        update = { $set: instituteInfo };



    peoples.update(conditions, update, callback);

    function callback(err, updatdata) {
        if (err) {
            res.json("Data is not valid");
            // mongoose.connection.close();
        } else {

            res.json(updatdata);
        }
    };




});



module.exports = router;
