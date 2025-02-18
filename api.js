// IMPORT PACKAGES
// Here you should import the required packages for your Express app: `express` and `morgan`
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const serverless = require("serverless-http");
const router = express.Router();

// CREATE EXPRESS APP
// Here you should create your Express app:
const app = express();


// MIDDLEWARE
// Here you should set up the required middleware:
// - `express.static()` to serve static files from the `public` folder
// - `express.json()` to parse incoming requests with JSON payloads
// - `morgan` logger to log all incoming requests
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
// Start defining your routes here:
router.get("/", (req, res)=> {
    res.sendFile(__dirname + "/views/home.html");
});

router.get("/blog", (req, res)=> {
    res.sendFile(__dirname + "/views/blog.html");
});

router.get("/api/projects", (req, res)=>{
    fs.readFile(__dirname + "/data/projects.json", (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
})

router.get("/api/articles", (req, res)=>{
    fs.readFile(__dirname + "/data/articles.json", (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
})

// this didn't work for me
 router.get((req, res, next) => {
     res.status(404).sendFile(__dirname + "/views/not-found.html");
 })

//this worked for me:
app.use((req, res, next)=>{
    res.status(404).sendFile(__dirname + "/views/not-found.html");
});

// START THE SERVER
// Make your Express server listen on port 5005:
//app.listen(5005, () => {
 //   console.log("Server listening in port 5005");
//})

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);