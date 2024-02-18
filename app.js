const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const web = require("./routes/web");
const connectdb = require("./db/dbcon");
// connect flash session
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

//messages
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

// cookies
app.use(cookieParser());
// for flash messages
app.use(flash());

// file uploader
const fileUpload = require("express-fileupload");

// temp file uploader
app.use(fileUpload({ useTempFiles: true }));

// Connection
connectdb();
// data get
app.use(express.urlencoded({ extended: true })); // data Get

// ejs set for html css
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
// app.use(bodyparser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static("public"));

// app.set('views', path.join(__dirname, 'views'));
//ROUTE LOAD
app.use("/", web);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
