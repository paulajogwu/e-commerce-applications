var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var session = require("express-session");
var mysql = require("express-mysql-session")(session);
var index = require("./routes/index");
var path = require("path");
var app = express();
app.use(cookieParser());
var hbs = require("express-handlebars");

var con = {
  host: "localhost",
  user: "root",
  password: "",
  database: "shop",
};

var sessionstore = new mysql(con);

app.use(
  session({
    secret: "secret",
    resave: false,

    saveUninitialized: true,
    store: sessionstore,
    cookie: { maxAge: 24 * 30 * 1000 },
  })
);
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up handlebars view engine
app.engine(
  "hbs",
  hbs({
    defaultLayout: "index",
    partialsDir: __dirname + "/Views/partials",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));
app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});
app.use("/", index);

app.use(function (req, res) {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});
// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at  http://localhost:" + port);
});
module.exports = app;
