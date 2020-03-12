// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const router = express.Router();
let reservationArray = []


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));

  
});

// Displays all characters
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
    
});

app.get("/tables/data", function (req, res) {
    res.json(reservationArray);
})



app.post("/reserve/:customerName/:phoneNumber/:customerEmail/:customerID", function(req, res) {
    console.log("test has been passed")
    console.log(req.params.customerName, req.params.phoneNumber, req.params.customerEmail, req.params.customerID)
    let newReservation = req.body
    newReservation.waiting = reservationArray.length>4;
    reservationArray.push(newReservation)

    res.json(reservationArray)
});

app.post("/clear",function(req, res){
    reservationArray.length = 0;
    console.log(reservationArray)
})



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
