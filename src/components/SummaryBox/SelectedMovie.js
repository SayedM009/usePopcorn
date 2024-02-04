import { useState } from "react"

// Selected Movie Is A Child Components For TotalMovies That Display One Movie's
export default function SelectedMovie({movie, needWatch, setNeedWatch}) {

    // Controlling of Showing Closing Movie X
    const [display, setDisplay] = useState(false)
    // Remove  the movie from the array that needs to be watched
    function handlingRemoveMovie() {
        setNeedWatch(needWatch.filter(m =>  m.imdbID !== movie.imdbID))
    }

    return <div className="movie to-watch" onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
    <img src={movie.poster === "N/A" ? "https://img.freepik.com/free-vector/cinema-realistic-poster-with-illuminated-bucket-popcorn-drink-3d-glasses-reel-tickets-blue-background-with-tapes-vector-illustration_1284-77070.jpg" : movie.poster} alt={movie.title}/>
    <div className="movie-info">
        <h3>{movie.title}</h3>
        <span>🌟 {movie.imdb} </span>
        <span>⭐ {movie.userRating} </span>
        <span>⌛{movie.time ? `${movie.time} mins` : "Not known time"}</span>
        {display && <span className="closing-movie" onClick={handlingRemoveMovie}>❌</span>}
    </div>
    </div>
}