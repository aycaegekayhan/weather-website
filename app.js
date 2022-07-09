const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
    console.log(__dirname);

});

app.post("/", function(req, res) {

    
    const query = req.body.cityName;
    const apiKey = "0e0e1091f2e9b698ab80fdc239ce2d76";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" +units;
    
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const des = weatherData.weather[0].description;
            console.log(des);
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius!</h1>");
            res.write("<p>The weather is currently " + des + "</p>");
            res.write("<img src=" + imgURL +">")
            res.send();
            
        });
    });
    
});



app.listen(3000, function() {
    console.log("Server is running on port 3000");
});