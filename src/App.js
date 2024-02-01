import Rating from "./components/Rating"
import Navbar from "./components/Navbar"
import LoadingMessage from "./components/LoadingMessage"
import ErrorMassage from "./components/ErrorMessage"
import { useEffect, useState } from "react"

export default function App() {
  const [movieName, setMovieName] = useState("")
  // State Of Collecting  Movies From API
  const [movies, setMovies] = useState([])
  // State of Current Movie ID
  const [selectedId, setSelectedId] = useState("")
  // ***********************************************************
  // State Of Showing  Loading Spinner
  const [loadingMs, setLoadingMs] = useState(false)
  // State Of Showing  Error Message
  const [errorMs, setErrorMs] = useState("")
  // State Of Need Watch Movies 
  const [needWatch, setNeedWatch] = useState([])

  // Swtich  Between Different Components on Mobile View
  const [toggle, setToggle] = useState(false)
  
  return <>
    <Navbar movieName={movieName} setMovieName={setMovieName} movies={movies} />
    <MoviesListAndMoviesSummaryBox  movieName={movieName} setMovies={setMovies} setLoadingMs={setLoadingMs} setErrorMs={setErrorMs} setSelectedId={setSelectedId} toggle={toggle}>
      <MoviesList movies={movies} loadingMs={loadingMs} errorMs={errorMs} setSelectedId={setSelectedId} />
      <Switch toggle={toggle} setToggle={setToggle}/>
      <MoviesSummaryBox selectedId={selectedId} setSelectedId={setSelectedId} needWatch={needWatch} setNeedWatch={setNeedWatch} />
    </MoviesListAndMoviesSummaryBox>
  </> 
}

// Fetching Movies and Runs Loading Message or Error Message Depends on Situation
function MoviesListAndMoviesSummaryBox({movieName, setMovies, children, setLoadingMs, setErrorMs, setSelectedId, toggle}) {
  useEffect(function() {
    const controller = new AbortController()
    async function  fetchingMovies() {
      try {
        // Showing  The Loading Spinner Before  Fetching Data
        setLoadingMs(true)
        // Fetching Movies API (OMDAPI)
        const response = await fetch(`http://www.omdbapi.com/?apikey=3a338bda&s=${movieName}`)
        //  Check If There Is An Error Of Lossing Connection
        if (!response.ok) throw new Error("Something Went Wrong Try Again")
        // The Result Of Hadling  JSON Response
        const result = await response.json()
        // Check If The Movie Name Not Found Or Exsits
        if (result.Response === "False") throw new Error(result.Error)
        // Setting  Up Error Message  And Hiding It After Successful Request
        setErrorMs("")
        // Setting Movies Result
        setMovies(result.Search)
      } catch(err) {
        // if (!err.message) console.errorMs("Movie not Found")
        if (movieName) setErrorMs(err.message || "Movie not Found")
      } finally {
        // Hidding  The Loading Spinner Before  Fetching Data
        setLoadingMs(false)
        setSelectedId("")

      }
    }
    // This Statement Stops Fetching Movies if The Movie Name Than Less Than 3 Letters and Rest The Error Message
    if (movieName.length < 3) {
      setMovies([])
      setErrorMs("")
      return
    }

    fetchingMovies()
    // Aborting  Previous Request To Avoid Memory Leaks
    return function() {
      controller.abort()
    }
  },[movieName, setMovies,setLoadingMs,setErrorMs])
  return <section className={`m-r-container ${toggle && "toggle"}` } >
          {children}
        </section>
}

// Movies List Box
function MoviesList({movies, loadingMs, errorMs, setSelectedId}) {
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

function Switch({toggle, setToggle}) {
  return <div className="switch" onClick={() => setToggle(!toggle)}>
  <img style={{width:"15px"}} src="https://cdn-icons-png.flaticon.com/128/2990/2990154.png" alt="switch"></img>
</div>
}

// Movies Summary Box
function MoviesSummaryBox({selectedId, setSelectedId, needWatch, setNeedWatch}) {
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

// Movie Component To Displays  Each Movie's Information In The Movies List Box
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

// Total Of Movies Need To Watch
function TotalMovies({needWatch, setNeedWatch}) {
  let imdb = 0, 
  rating = 0,
  mins = 0;
  //  If The Movies's Array Need To Watch Has an Movie Will Run These Statements To Handle Some Details
  if (needWatch.length > 0) {
    imdb = (needWatch?.map(w => w.imdb)?.reduce((f,s) => { return f + s}, 0)) / needWatch?.length
    rating = (needWatch?.map(w => w.userRating)?.reduce((f,s) => { return f + s}, 0)) / needWatch?.length
    mins = needWatch.map(w => w.time).reduce((f, s) => f + s)
  } 
  return <>
    <div className="watched-movies">
      <h3>movies you need Watch</h3>
      <div className="movies-total">
        <span>#️⃣ {needWatch.length ?? 0} movies </span>
        <span>⭐ {imdb.toFixed(1) || 0} </span>
        <span>🌟 {rating.toFixed(1) || 0} </span>
        <span>⏳ {mins || 0} min</span>
      </div>
    </div>
    {needWatch.map((w,i) => <SelectedMovie movie={w} needWatch={needWatch} setNeedWatch={setNeedWatch} key={i}/>)}
  </>
}

// Selected Movie Is A Child Components For TotalMovies That Display One Movie's
function SelectedMovie({movie, needWatch, setNeedWatch}) {

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

// Movie Summary  Is A Child Component For Each Movie In Total Movies And It's Showing More Information About Movie
function MovieDetails({id, onSelecteId, needWatch, setNeedWatch}) {
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

