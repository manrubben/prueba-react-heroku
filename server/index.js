const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require('mysql');

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = 3001;

const db = mysql.createPool({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b976cfa96691f2",
    password: "e1b56bb4",
    database: "heroku_cf5c4e9e2e2106c",
});

db.query('select 1 + 1', (err, rows) => { /* */ }); //para mantener la conexion activa con la base de datos del servidor


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);


// Register method
app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, hash],
            (err, result) => {
                console.log(err);
            }
        );
    })


});


//Method to check if a user is logged in
app.get("/login", (req, res) => {
    if(req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});


//Login method
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({ message: "Wrong username/password combination!"})
                    }
                });
            } else {
                res.send({ message: "User doesn't exist"})
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
