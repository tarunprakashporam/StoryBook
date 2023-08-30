const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
//load config
dotenv.config({ path: './config/config.env' });
//passport config
require('./config/passport')(passport)
connectDB()
const app = express();

//logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//sessions
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    cookie:{secure:true}
}))
//pasport middleware

app.use(passport.initialize());
app.use(passport.session());


//static folder
app.use(express.static(path.join(__dirname, 'public')));



//routes
app.use('/', require('./routes/index'))

const Port = process.env.PORT || 3000

app.listen(
    Port,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${Port}`)
)