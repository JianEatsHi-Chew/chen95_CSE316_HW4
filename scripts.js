const mysql = require("mysql");
// ./node_modules/.bin/nodemon scripts.js

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "LEnovothemacv",
});

con.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connection established");
});

con.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
    console.log("Connection ended");
});
