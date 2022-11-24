// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let now = new Date();
  res.json(
    {"unix": now.getTime(),
    "utc": now.toUTCString()}
    );
});

app.get("/api/:date", (req,res)=>{
  const date_string = req.params.date;
  let d;

  if(date_string) {
    if(isNaN(date_string)){   // If date is a string value
      d = new Date(date_string)
    }
    else{
      d = new Date(parseInt(date_string)) // If date is in integer
    }
  }
  
  if(d.toString() !== 'Invalid Date'){
    res.json(
       { "unix" : d.getTime(),
     "utc" : d.toUTCString() })
    
  } else{
    res.json({ "error" : "Invalid Date" });
  }
  
});











// app.get("/api/:date", (req,res)=>{
//   let date_String = req.params.date;


//   let passedInValue = new Date(date_String);
//   if(passedInValue == "Invalid Date"){

//     if(parseInt(date_String) > 10000) {
//       let unixTime = new Date(parseInt(date_String))
//       res.json(
//         {"unix" : unixTime.getTime(),
//         "utc" : unixTime.toUTCString()}
//       )
  
//     } else{
//       res.json({"error" : "Invalid Date"});
//     }
//   }
//   else {
//     res.json(
//     {"unix" : passedInValue.getTime(),
//     "utc" : passedInValue.toUTCString()}
//   )
//   } 
// })


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
