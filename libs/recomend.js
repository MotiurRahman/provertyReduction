exports.recomendData = function(ins_type, postCode) {

    var peoples = require('./../libs/peoplesSchema');

    console.log("ins_type:" + ins_type);

    

    switch (ins_type) {
        case "Technical":

            peoples.find({ $or: [{ t_a_trainig: "NO" }, { working_scope: "NO" }, { any_c_land: "NO" }], "postCode": postCode }).exec(function(err, docs) {
          
                if (err) {
                    console.log("database error");
                } else {
                    console.log("RecomendatedPeople:" + docs.length);

                    doc = "motiur";
                }

            });
            break;
        case "Agricultural":
            peoples.find({ $or: [{ t_a_trainig: "NO" }, { working_scope: "NO" }, { any_c_land: "YES" }], "postCode": postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {


                    doc = docs;
                }

            });
            break;

        case "Medical":
            peoples.find({ drugAddiction: "YES", "postCode": postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {


                   doc = docs;
                }

            });
            break;

        case "Information Center":
            peoples.find({ know_t_a_trainig: "NO", "postCode": postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {


                    doc = docs;
                }

            });
            break;

        case "NGO":
            peoples.find({ saving: "NO", "postCode": postCode }).exec(function(err, docs) {

                if (err) {
                    console.log("database error");
                } else {


                    doc = docs;
                }

            });
            break;
    }
return doc;

}
