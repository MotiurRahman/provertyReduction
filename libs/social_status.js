exports.social_status = function(docs) {

    var richMan = 0;
    var middleClass = 0;
    var lowerMiddleClass = 0;
    var poor = 0;
    var extremelyPoor = 0;
    console.log("Length:"+docs.length);
    for (var i = 0; i < docs.length; i++) {
        switch (docs[i].status) {
            case "Rich Man":
                richMan++;
                break;
            case "Middle Class":
                middleClass++;
                break;
            case "Lower Middle Class":
                lowerMiddleClass++;
                break;
            case "Poor":
                poor++;
                break;
            case "Extremely Poor":
                extremelyPoor++;
                break;
        }
    }
console.log("Poor:"+poor);


    var data = {
        richMan: richMan,
        middleClass: middleClass,
        lowerMiddleClass: lowerMiddleClass,
        poor: poor,
        extremelyPoor: extremelyPoor,
        total: docs.length
    }


    return data;

}


exports.check_status = function(income) {

    var status = "";


    if (income >= 30000) {
        if (income >= 60000) {
            status = "Rich Man";

        } else {
            status = "Middle Class";
        }

    } else {
        if (income <= 30000 && income >= 10000) {
            status = "Lower Middle Class";
        } else {
            if (income <= 5000) {
                status = "Extremely Poor";
            } else {
                status = "Poor";
            }
        }
    }


    return status;

}


exports.check_status_urban = function(income) {

    var status = "";


    if (income >= 50000) {
        if (income >= 90000) {
            status = "Rich Man";

        } else {
            status = "Middle Class";
        }

    } else {
        if (income <= 50000 && income >= 20000) {
            status = "Lower Middle Class";
        } else {
            if (income <= 10000) {
                status = "Extremely Poor";
            } else {
                status = "Poor";
            }
        }
    }


    return status;

}


// exports.rich_poor = function(docs) {

//     var richMan = [];
//     // var middleClass = [];
//     // var lowerMiddleClass = [];
//     // var poor = [];
//     var extremelyPoor = [];


//     for (var i = 0; i < docs.length; i++) {

//         if (docs[i].monthlyIncom >= 30000) {
//             if (docs[i].monthlyIncom >= 60000) {

//                 var richman = {
//                     id: docs[i]._id,
//                     name: docs[i].name,
//                     email: docs[i].email,
//                     phone: docs[i].phone,
//                     localAgent: docs[i].localAgent,
//                     agent_phone: docs[i].agent_phone,
//                     status: "Rich Man",
//                     address: {
//                         division: docs[i].division,
//                         district: docs[i].district,
//                         ps: docs[i].ps,
//                         postCode: docs[i].postCode,
//                         area: docs[i].area
//                     }

//                 }
//                 richMan.push(richman);


//             } else {
//                 //middleClass++;
//             }

//         } else {
//             if (docs[i].monthlyIncom <= 30000 && docs[i].monthlyIncom >= 10000) {
//                 //lowerMiddleClass++;
//             } else {
//                 if (docs[i].monthlyIncom <= 5000) {
//                     var soPoor = {
//                         id: docs[i]._id,
//                         name: docs[i].name,
//                         father_name: docs[i].father_name,
//                         localAgent: docs[i].localAgent,
//                         agent_phone: docs[i].agent_phone,
//                         phone: docs[i].phone,
//                         status: "extremelyPoor",
//                         lastDegree: docs[i].lastDegree,
//                         reason: {
//                             saving: docs[i].saving,
//                             t_a_trainig: docs[i].t_a_trainig,
//                             working_scope: docs[i].working_scope,
//                             know_t_a_trainig: docs[i].know_t_a_trainig,
//                             any_c_land: docs[i].any_c_land,
//                             drugAddiction: docs[i].drugAddiction,
//                             natural_reson: docs[i].natural_reson
//                         },
//                         address: {
//                             division: docs[i].division,
//                             district: docs[i].district,
//                             ps: docs[i].ps,
//                             postCode: docs[i].postCode,
//                             area: docs[i].area
//                         }

//                     }

//                     extremelyPoor.push(soPoor);
//                 } else {
//                     //poor++
//                 }
//             }
//         }
//     }



//     var data = {
//         richMan: richMan,

//         extremelyPoor: extremelyPoor
//     }


//     return data;


// }

exports.resonOfPoor = function(result) {
    var yes_savings = 0;
    var no_savings = 0;
    var yes_t_a_trainig = 0;
    var no_t_a_trainig = 0;
    var yes_working_scope = 0;
    var no_working_scope = 0;
    var yes_know_t_a_trainig = 0;
    var no_know_t_a_trainig = 0;
    var yes_any_c_land = 0;
    var no_any_c_land = 0;
    var natural_reson = 0;
    var yes_drugAddiction = 0;
    var no_drugAddiction = 0;



    for (var i = 0; i < result.length; i++) {




        switch (result[i].saving) {
            case "YES":
                yes_savings++;
                break;
            case "NO":
                no_savings++;
                break;
        }



        switch (result[i].t_a_trainig) {
            case "YES":
                yes_t_a_trainig++;
                break;
            case "NO":
                no_t_a_trainig++;
                break;
        }


        switch (result[i].working_scope) {
            case "YES":
                yes_working_scope++;
                break;
            case "NO":
                no_working_scope++;
                break;
        }


        switch (result[i].know_t_a_trainig) {
            case "YES":
                yes_know_t_a_trainig++;
                break;
            case "NO":
                no_know_t_a_trainig++;
                break;
        }


        switch (result[i].any_c_land) {
            case "YES":
                yes_any_c_land++;
                break;
            case "NO":
                no_any_c_land++;
                break;
        }

        switch (result[i].drugAddiction) {
            case "YES":
                yes_drugAddiction++;
                break;
            case "NO":
                no_drugAddiction++;
                break;
        }



        if (result[i].natural_reson == "naturalDisaster" || result[i].natural_reson == "flood" || result[i].natural_reson == "riverErosion") {
            natural_reson++;
        }


    }



    var data = {
        yes_savings: yes_savings,
        no_savings: no_savings,
        yes_t_a_trainig: yes_t_a_trainig,
        no_t_a_trainig: no_t_a_trainig,
        yes_working_scope: yes_working_scope,
        no_working_scope: no_working_scope,
        yes_know_t_a_trainig: yes_know_t_a_trainig,
        no_know_t_a_trainig: no_know_t_a_trainig,
        yes_any_c_land: yes_any_c_land,
        no_any_c_land: no_any_c_land,
        natural_reson: natural_reson,
        yes_drugAddiction: yes_drugAddiction,
        no_drugAddiction: no_drugAddiction,
        total: result.length

    }


    return data;


}
