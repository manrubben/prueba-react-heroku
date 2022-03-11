import React, {useState, useEffect} from "react";
import Axios from "axios";

function Crud() {

    const [movieName, setMovieName] = useState("");
    const [review, setReview] = useState("");
    const [movieReviewList, setMovieList] = useState([]);

    const [newReview, setNewReview] = useState("");

    useEffect(() => {
        Axios.get("https://prueba-react-backend.herokuapp.com/api/get").then((response) => {
            setMovieList(response.data)
        });
    }, []);

    const submitReview = () => {
        Axios.post("https://prueba-react-backend.herokuapp.com/api/insert", {
            movieName: movieName,
            movieReview: review,
        })

        setMovieList([
            ...movieReviewList, {movieName: movieName, movieReview: review},
        ]);

    };


    const deleteReview = (movie) => {
        Axios.delete(`https://prueba-react-backend.herokuapp.com/api/delete/${movie}`);
    }

    const updateReview = (movie) => {
        Axios.put("https://prueba-react-backend.herokuapp.com/api/update", {
            movieName: movie,
            movieReview: newReview,
        });
        setNewReview("");
    };


    return (
        <div className="App">
            <h1>CRUD APPLICATION</h1>

            <div className="form">
                <label>Movie Name:</label>
                <input type="text"
                       name="movieName"
                       onChange={(event) => {
                           setMovieName(event.target.value);
                       }}
                />

                <label>Movie Review:</label>
                <input type="text"
                       name="movieReview"
                       onChange={(e) => {
                           setReview(e.target.value);
                       }}
                />

                <button onClick={submitReview}>Submit</button>

                {movieReviewList.map((val) => {
                    return (
                        <div className="card">
                            <h1>{val.movieName}</h1>
                            <p>{val.movieReview}</p>

                            <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>

                            <input type="text" id="updateInput" onChange={(e) => {
                                setNewReview(e.target.value)
                            }}/>
                            <button onClick={() => {updateReview(val.movieName)}}>Update</button>
                        </div>
                    );
                })};
            </div>
        </div>
    );
}

export default Crud;
