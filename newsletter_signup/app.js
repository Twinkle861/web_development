//jshint esversion: 6
// // ID
// // 03d3147ad4
// // Key
// // c5d294f1fa64acbcb48512da2c2f3497-us6
// https://us6.api.mailchimp.com/3.0/lists/03d3147ad4
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: process.env.OPTION_URL,
    method: "POST",
    mode: 'no-cors',
    headers: {
      "Authorization": process.env.OPTION_AUTHORIZATION,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: jsonData
  };

  request(options, (error, response, body) =>{
    if(error || response.statusCode !== 200) {
      console.log(response.statusCode);
      res.sendFile(__dirname + "/failure.html");
    }
    else {
      console.log(response.statusCode);
      res.sendFile(__dirname + "/success.html");
    }
  });

});

app.post("/failure", (req, res) => {
  res.redirect("/");
});
