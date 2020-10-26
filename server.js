/* DEPRECATED -- SWAPPING TO AJAX BECAUSE WE'RE ONLY WORRIED ABOUT CLIENT SIDE ONLY */

var express = require("express");
bodyParser = require("body-parser");
var path = require("path");
const mysql = require("mysql");
// ./node_modules/.bin/nodemon server.js

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "LEnovo",
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
    "Start_Time",
    "End_Time",
    "Mtg_Start_Date",
    "Mtg_End_Date",
    "Duration",
    "Instruction Mode",
    "Building",
    "Room",
    "Instr",
    "Enrl_Cap",
    "Wait_Cap",
    "Cmbnd_Descr",
    "Cmbnd_Enrl_Cap",
];


app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    con.query(`SELECT * FROM courses;`, function(err, result){
        if(err) throw err;
        outputString = sqlToHTML(result);
        res.send(outputString);
    });
});

app.post("/search", (req, res) => {
    con.query(
        `SELECT *
        FROM courses 
        WHERE ${req.body.fields} = ${req.body.search}`,function (err, result) {
            if(err) throw err;
            outputString = sqlToHTML(result);
            res.send(outputString);
        }
    );
});

app.post("/schedule", (req, res) => {
    res.send("hi");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function sqlToHTML(result){
    outputString = `
            <!DOCTYPE html>
                <head>
                    <meta charset="UTF-8">
                    <title>CSE316 HW4</title>
                    <style>
                        table, th, td{
                            border: 1px solid black;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                        }

                        .coursename{
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <form action="http://localhost:8080/search" method="POST">
                        Search <input type="text" name="search">
                        in <select name="fields">
                            <option value="*">All Fields</option>
                            <option value="Subj">Subject</option>
                            <option value="Title">Course Title</option>
                            <option value="Instr">Instructor</option>
                            <option value="CRS">Course</option>
                        </select>
                        <button id="submit" type="submit">Find</button>
                    </form>
                    <form action="http://localhost:8080/schedule" method="POST">
                        <button id="schedule" type="submit">My Schedule</button>
                    </form>
                    <table>
                        _input_
                    </table>
                </body>
            </html>
        `;
    entriesString = ``;
    for (i = 0; i < result.length; i++) {
        entry = result[i];
        entriesString += `<tr><th>${i}</th>`;
        // Put Subj, CRS#, and Section
        entriesString += `
                <th>${entry.Subj}${entry.CRS}.${entry.Sctn}</th>
            `;
        // Put Title, Instr, Cmp, Mtg_Start_Date, Mtg_End_Date, Start_Time to End_Time, Duration, Instruction_Mode, Building, Room, Days
        entriesString += `
                <td>
                    <p class="coursename">${entry.Title}<p>
                    by ${entry.Instr}. <br>
                    ${entry.CMP} : ${entry.Mtg_Start_Date} to ${entry.Mtg_End_Date} \t on Days: ${entry.Days} <br> 
                    Time from : ${entry.Start_Time} to ${entry.End_Time} \t Duration: ${entry.Duration} <br>
                    Instruction Mode: ${entry.Instruction_Mode} \t ${entry.Building}, ${entry.Room}
                </td>
            `;
        // Put Enrl_Cap, Wait_Cap, Cmbnd_Descr, Cmbnd_Enrl_Cap
        entriesString += `
                <td>
                    Enrollment Cap: ${entry.Enrl_Cap}<br>
                    Waitlist Cap: ${entry.Wait_Cap}<br>
                    Combined Description: ${entry.Cmbnd_Descr}<br>
                    Combined Enrollment Cap: ${entry.Cmbnd_Enrl_Cap}
                </td>
            `;
        // Put button relating to adding
        entriesString += `<td><button onclick="alert('hi')">Add</button></td>`;
        entriesString += `</tr>`;
    }
    outputString = outputString.replace("_input_", entriesString);
    return outputString;
}