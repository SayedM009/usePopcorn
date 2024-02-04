import { useState } from "react"
import ErrorMassage from "../Messages/ErrorMessage"
import LoadingMessage from "../Messages/LoadingMessage"

export default function MoviesList({movies, loadingMs, errorMs, setSelectedId}) {
    // State Of Showing  Movies List Box
    const [isOpenMoviesList, setIsOpenMoviesList] =  useState(true)
    // Handling Opening & Closing to Movies List Box
    function handleOpeningAndClosing(){
        setIsOpenMoviesList(!isOpenMoviesList)
    }
    return <div className={`${isOpenMoviesList ? "movies-result" : "movies-result isOpen"} ${movies.length > 4 ? "scroll" : ""}`} >
        {isOpenMoviesList ? <span className="hide" onClick={handleOpeningAndClosing}>-</span> : <span className="hide" onClick={handleOpeningAndClosing}>+</span>}
        <div className="movies-container" >
        {loadingMs && <LoadingMessage />}
        {!loadingMs && !errorMs && movies?.map((movie, i) => <Movie movie={movie} setSelectedId={setSelectedId} key={i}/>)}
        {errorMs && <ErrorMassage message={errorMs}/>}
        </div>
    </div>
}

function Movie({movie, setSelectedId}) {
    function currentId() {
        setSelectedId(movie.imdbID)
    } 
    return <div className="movie" onClick={currentId}>
        <img src={movie.Poster} alt={movie.Title}/>
        <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>📅 {movie.Year}</p>
        </div>
    </div>
}