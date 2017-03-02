var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');

var app = express();
app.disable('x-powered-by');


var routes = require('./routes/index');
var users = require('./routes/users');
var charts = require('./routes/charts');
var poorCharts = require('./routes/poorCharts');
var peoples_form = require('./routes/peoples_form');
var edit_peoplesInfo = require('./routes/edit_peoplesInfo');
var tables = require('./routes/tables');
var algorithm = require('./routes/algorithm');
var solution = require('./routes/solution');
var surveyor = require('./routes/signup/surveyor');
var institute = require('./routes/signup/institute');
var addTo = require('./routes/t_institute/addTo');
var list_institute = require('./routes/t_institute/list_institute');
var edit_institute = require('./routes/t_institute/edit_institute');
var institute_profile = require('./routes/t_institute/institute_profile');
var edit_my_institute = require('./routes/t_institute/edit_my_institute');
var recomendation = require('./routes/t_institute/recomendation');
var list_surveyor = require('./routes/surveyor/list_surveyor');
var edit_surveyor = require('./routes/surveyor/edit_surveyor');
var edit_my_profile = require('./routes/surveyor/edit_my_profile');
var surveyor_profile = require('./routes/surveyor/surveyor_profile');
var deletion = require('./routes/deletion');
var login = require('./routes/signin/login');
var logout = require('./routes/signin/logout');
var APIs = require('./routes/allAPI');
var activation = require('./routes/activation');
var passChange = require('./routes/setting/passChange');




var sess = {
    name: "session-cookie",
    secret: 'motiur8034',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy 
    sess.cookie.secure = true // serve secure cookies 
}

app.use(session(sess));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);


app.use('/', routes);
app.use('/users', users);
app.use('/charts', charts);
app.use('/poorCharts', poorCharts);
app.use('/peoples_form', peoples_form);
app.use('/edit_peoplesInfo', edit_peoplesInfo);
app.use('/tables', tables);
app.use('/algorithm', algorithm);
app.use('/solution', solution);
app.use('/surveyor_signup', surveyor);
app.use('/institute_signup', institute);
app.use('/addTo', addTo);
app.use('/list_institute', list_institute);
app.use('/list_surveyor', list_surveyor);
app.use('/edit_surveyor', edit_surveyor);
app.use('/surveyor_profile', surveyor_profile);
app.use('/edit_my_profile', edit_my_profile);
app.use('/edit_institute', edit_institute);
app.use('/edit_my_institute', edit_my_institute);
app.use('/institute_profile', institute_profile);
app.use('/deletion', deletion);
app.use('/login', login);
app.use('/logout', logout);
app.use('/APIs', APIs);
app.use('/activation', activation);
app.use('/recomendation', recomendation);
app.use('/passChange', passChange);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('404 Page Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    switch (req.session.loginType) {
        case "Institute":

            res.render('error', { error: err, institute_userName: req.session.short_name, layout: "ins_layout" });
            // res.render('algorithm', {layout: "ins_layout" });



            break;
        case "Surveyor":
            res.render('error', { error: err, surveyor_userName: req.session.userName, layout: "sur_layout" });


            break;
        case "Admin":
            res.render('error', { error: err, layout: "admin_layout" });

            break;
        case "failed":
            res.render('error', { error: err });
            break;
        default:
            es.render('error', { error: err });


    }

});




module.exports = app;
