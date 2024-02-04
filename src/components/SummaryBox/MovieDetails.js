import LoadingMessage from "../Messages/LoadingMessage"
import Rating from "../ReusableCM/Rating"
import { useState, useEffect } from "react"
export default function MovieDetails({id, onSelecteId, needWatch, setNeedWatch}) {
    // State Of Storing Movie that Came By ID
    const [movieDetails, setMovieDetails] = useState({})
    //  State of Showing loading Message or not
    const [isLoading, setIsLoading] = useState(false)
    // State Of Movie Rating That Comes From Rating Component
    const [rating, setRating] = useState(null)

    function handleAdding() {
        if (!rating)  { 
        alert('Please Add a rating')
        return
        }
        const movieWithRating = {
        title: movieDetails.Title,
        poster:  movieDetails.Poster,
        imdb: Number(movieDetails.imdbRating) || 0 ,
        userRating: rating,
        time: movieDetails.Runtime === "N/A" ? 0 :Number.parseFloat(movieDetails.Runtime),
        imdbID: id
        }
        // Adding  the Newly Created Movie Object To The List of Movies Need To Watch
        setNeedWatch([...needWatch,  movieWithRating])
        // Rest The Current ID To Return To Total Movies Component
        onSelecteId("")
    }

    // Fetching  Data About The Movie From IMDB API Whenever There By Selected ID
    useEffect(function() {
        async function fetching() {
        try {
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?apikey=3a338bda&i=${id}`)
            const data = await res.json()
            setMovieDetails(data)
            setIsLoading(false)
        } catch(err) {
            console.errorMs("Something Went Erro Try Again")
        }
        }

        //  Check If There Is A Movie Inside needWatch State Has The Same ID Or Not
        const checkMovie = needWatch.filter(w => w.imdbID === id)
        if(checkMovie.length <= 0) {
        fetching()
        } else {
        alert("You Already Have This Movies,,,,,,")
        // Rest Current ID
        onSelecteId("")
        }
    }, [id,  needWatch, onSelecteId])

    // Set Document Title  According to The Current Displayed Movie And Cleaning The useEffect
    useEffect(function() {
        if(!movieDetails.Title) return
        document.title = `Movie : ${movieDetails.Title}`
        return function() {
        document.title = `usePopcorn`
        }
    },[movieDetails.Title])

    return <>
        {isLoading ? <LoadingMessage /> : 
        <div className="movie-summary">
        <span className="back" onClick={() => onSelecteId("")}>⬅</span>
        <div className="summary">
            <img src={movieDetails.Poster} alt={movieDetails.Title}></img>
            <div className="info">
            <h2>{movieDetails.Title}</h2>
            <p>{movieDetails.Released} {movieDetails?.Runtime}</p>
            <p>{movieDetails.Genre}</p>
            <p>⭐ {movieDetails.imdbRating} IMDB Rating</p>
            </div>
        </div>
        <div className="rating">
            {/* External Rating Component */}
            <Rating maxLength={10} color="yellow"  ratingValue={rating} setRating={setRating}/>
            <button onClick={() => handleAdding()}>+ Add to List</button>
        </div>
        <div className="story">
            <p>{movieDetails.Plot}</p>
        </div>
    </div>
        }
    </> 
}