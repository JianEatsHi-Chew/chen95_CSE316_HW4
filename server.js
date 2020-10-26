var express = require("express");
bodyParser = require("body-parser");
var path = require("path");
const mysql = require("mysql");
// ./node_modules/.bin/nodemon server.js

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "LEnovothemacv",
    database: "316hw4",
});
app = express();
app.use(bodyParser.urlencoded({ extended: true })); //app.use(express.bodyParser()); works too
const port = 8080;
labels = [
    "Subj",
    "CRS",
    "Title",
    "Cmp",
    "Sctn",
    "Days",
    "Start Time",
    "End Time",
    "Mtg Start Date",
    "Mtg End Date",
    "Duration",
    "Instruction Mode",
    "Building",
    "Room",
    "Instr",
    "Enrl Cap",
    "Wait Cap",
    "Cmbnd Descr",
    "Cmbnd Enrl Cap",
];


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.post("/search", (req, res) => {
    con.query(
        `SELECT *
        FROM courses 
        WHERE ${req.body.fields} = ${req.body.search}`,
        function (err, result) {
            if(err) throw err;
            string = "<table>";
            for(i = 0; i < result.length; i++){
                innerstring = "";
                for(x = 0; x < labels.length; x++){
                    innerstring += result[i][labels[x]] + "  ";
                }
                string += innerstring + "<br>";
            }
            res.send(`Searching:. ${string}`);
        }
    );
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});