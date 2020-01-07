/**
 * This Application for Learning purpose.
 */

var express = require("express");
var mysql = require("mysql");

var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  return res.send("Hello !");
});

app.listen(3000, () => {
  console.log("API is Listing to port 3000");
});

module.exports = app;

// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo-app"
});
// connect to database
dbConn.connect();

//userSignUp
app.post("/userSignUp", (req, res) => {
  var nric = req.body.nric;
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var occupation = req.body.occupation;
  var dateofbirth = req.body.dateofbirth;

  var query =
    "INSERT INTO `user`(`nric`, `name`, `username`, `password`,`occupation`, `dateofbirth`) VALUES" +
    "('" +
    nric +
    "','" +
    name +
    "','" +
    username +
    "','" +
    password +
    "','" +
    occupation +
    "','" +
    dateofbirth +
    "')";

  dbConn.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.send({
        status: 412,
        message: error.code
      });
      //return error;
    }
    res.send(result);
  });
});

//userLogin
app.post("/userLogin", (req, res) => {
  var nric = req.body.nric;
  var password = req.body.password;
  var query = "SELECT * FROM user WHERE `nric`='" + nric + "'";
  dbConn.query(query, (error, result) => {
    if (error) {
      res.send({
        status: 412,
        message: error
      });
    }
    if (result[0].password === password) {
      res.send({
        status: 200,
        data: "Successfully Logged"
      });
    } else {
      res.send({
        status: 412,
        message: "Please check your credentials"
      });
    }
  });
});

//getUsers list
app.get("/getUsers", (req, res) => {
  var query = "SELECT * FROM user";
  dbConn.query(query, (error, result) => {
    console.log("RESULT : ", JSON.stringify(result));
    res.send(result);
  });
});

//Adding todo items to user
app.post("/addtodoitem", (req, res) => {
  var nric = req.body.nric;
  var todoitem = req.body.todoitem;

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  var startdate = (newdate = year + "/" + month + "/" + day);
  var targeteddate = req.body.targeteddate;
  var status = req.body.status;

  var query =
    "INSERT INTO `tbl_todolist`(`nric`, `todoitem`, `startdate`, `targeteddate`, `status`) VALUES" +
    "('" +
    nric +
    "'," +
    "'" +
    todoitem +
    "','" +
    startdate +
    "'," +
    "'" +
    targeteddate +
    "','" +
    status +
    "')";

  console.log(query);
  dbConn.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.send({
        status: 412,
        message: error
      });
    }

    res.send({
      status: 200,
      data: "Inserted"
    });
  });
});

//Get Todo Lists for User
app.get("/getToDolist/nric/:nric", (req, res) => {
  var nric = req.params.nric;
  var query = "SELECT * FROM tbl_todolist WHERE `nric`='" + nric + "'";
  dbConn.query(query, (error, result) => {
    if (error) {
      res.send({
        status: 412,
        message: error
      });
    }
    res.send({
      status: 200,
      data: result
    });
  });
});

