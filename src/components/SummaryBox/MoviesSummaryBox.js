import { useEffect, useState } from "react"
import MovieDetails from "./MovieDetails"
import TotalMovies from "./TotalMovies"

export default function MoviesSummaryBox({selectedId, setSelectedId, needWatch, setNeedWatch}) {
    // State Of Showing  Movie Summary Box
    const [showingMovieSummary, setShowingMovieSummary] =  useState(true)
    // Handling Opening & Closing Movies Summary Box
    function handleOpeningAndClosing(){
    setShowingMovieSummary(!showingMovieSummary)
    }
    // Closing Movie Details With Escape Button From Keyboard
    useEffect(function() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setSelectedId("")
    })
    },[setSelectedId])
    return <div className={showingMovieSummary ? "watching-movies" : "watching-movies isOpen"}>
            {showingMovieSummary ? <span className="hide" onClick={handleOpeningAndClosing}>-</span> : <span className="hide" onClick={handleOpeningAndClosing}>+</span>}
            {showingMovieSummary ? <>
            {selectedId.length >= 1 ? <MovieDetails id={selectedId} onSelecteId={setSelectedId} needWatch={needWatch} setNeedWatch={setNeedWatch}/> : <TotalMovies needWatch={needWatch} setNeedWatch={setNeedWatch}/>}
            </> : ""}
        </div>
}







