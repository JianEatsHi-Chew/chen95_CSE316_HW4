var express = require("express");
bodyParser = require("body-parser");
var path = require("path");
app = express();
app.use(bodyParser.urlencoded({ extended: true })); //app.use(express.bodyParser()); works too

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/", (req, res) => {
    res.send(`Full name is:${req.body.fname}.`);
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


/*------------MYSQL-------------*/

const mysql = require("mysql");
// ./node_modules/.bin/nodemon scripts.js

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "LEnovothemacv",
    database: "316hw4",
});

con.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    //console.log("Connection established");
});

con.query("SELECT * FROM courses", (err, rows) => {
    if (err) throw err;
    //console.log("Data received from Db:");
    //console.log(rows);
});

con.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
    //console.log("Connection ended");
});
