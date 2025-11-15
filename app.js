

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();  // load .env variables
const mongoose = require('mongoose'); // load mongoose

const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async function() {
    console.log('Connection to DB succeeded');

    // ---- MOVED RESEED INTO HERE ----
    async function recreateDB() {
        // Delete all existing Artifact documents
        await Artifact.deleteMany();

        // Create three Artifact instances
        let artifact1 = new Artifact({ artifact_name: "Ancient Vase", age: 120, material: "Clay" });
        let artifact2 = new Artifact({ artifact_name: "Golden Amulet", age: 300, material: "Gold" });
        let artifact3 = new Artifact({ artifact_name: "Mystic Scroll", age: 500, material: "Parchment" });

        // Save each artifact
        artifact1.save().then(doc => { console.log("First object saved"); }).catch(err => { console.error(err); });
        artifact2.save().then(doc => { console.log("Second object saved"); }).catch(err => { console.error(err); });
        artifact3.save().then(doc => { console.log("Third object saved"); }).catch(err => { console.error(err); });
    }

    // Turn on reseeding
    let reseed = true;
    if (reseed) { await recreateDB(); }
    // ---- END OF FIX ----
});

const Artifact = require('./models/artifact');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artifactsRouter = require('./routes/artifacts');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');


var app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artifacts', artifactsRouter); // your artifact routes
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
