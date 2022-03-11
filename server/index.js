const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require('mysql');

const PORT = 3001;

const db = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b3a2c8ad8676fb",
    password: "d7b3892b",
    database: "heroku_b05adc70f7e74f2",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Register method
app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    );
});


//Login method
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username/password combination!"})
            }
        }
    );
});


// List method
app.get("/api/get", (req, res) => {

    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});


// Create method
app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    });
});


// Delete method
app.delete("/api/delete/:movieName", (req, res) => {
    const name = req.params.movieName;

    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });
});


// Update method
app.put("/api/update", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;

    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    // los atributos del array se ponen en orden segun la query. En la query se usa primero la review y luego el name
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    });
});


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
