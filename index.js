const express = require ('express');
const cookieParser= require('cookie-parser');
const app = express();
const port = 3000;

const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
// used for session cookie

const session = require('express-session');
const passport = require('passport');
const passportLocal= require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);

const customMware = require('./config/middleware');
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(cookieParser());
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'node auth',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
const flash = require('connect-flash');
app.use(flash());
// app.use(customMware.setFlash);
app.use(function(req,res,next){ 
    res.locals.flash={
     'success':req.flash('success'),
     'error':req.flash('error')
    }
    next();
   });




app.use('/', require('./routes'));
app.listen(port, function(err) {
    if(err){
        return;
    }
    console.log('server running on', port);
})