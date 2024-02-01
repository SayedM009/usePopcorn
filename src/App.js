import { useEffect, useState } from "react"

export default function App() {
    const [count, setCount] = useState(0)
    const [from, setFrom] = useState("EUR")
    const [to, setTo] = useState("USD")
    const [amount, setAmount] = useState("")
  useEffect(function () {

    const host = 'api.frankfurter.app';  
    const fetchinPrice = async function() {
        try {
          const res = await  fetch(`https://${host}/latest?amount=${count}&from=${from}&to=${to}`);
          if(!res.ok) throw new Error("Something went wrong")
          const  data = await res.json();
          if(!data.amount) throw new Error("amount is 0")
          const rate = Object.values(data.rates)[0]
          setAmount(rate)
        } catch(err) {
          console.log(err.message)
        }
    }
    if(from === to) {
      // alert('Please select different currencies')
      setAmount(count)
      return
    }
    fetchinPrice()

  }, [count, from, to])

  return <>
    <div>
    <input type="text" value={count} onChange={(e) => setCount(e.target.value)}></input>
    
    <select value={from} onChange={(e) => setFrom(e.target.value)}>
      <option value="USD" >USD</option>
      <option value="EUR">EUR</option>
      <option value="EGP">EGP</option>
      <option value="INR">INR</option>
    </select>
    <select value={to}  onChange={(e) => setTo(e.target.value)}>
      <option value="USD" >USD</option>
      <option value="EUR">EUR</option>
      <option value="EGP">EGP</option>
      <option value="CAD">CAD</option>
    </select>
  </div>
  <div>{amount}</div>
  </>
}


















// import Rating from "./Rating"
// import Navbar from "./Navbar"
// import LoadingMessage from "./LoadingMessage"
// import ErrorMassage from "./ErrorMessage"
// import { useEffect, useState } from "react"

// export default function App() {
//   const [movieName, setMovieName] = useState("")
//   // State Of Collecting  Movies From API
//   const [movies, setMovies] = useState([])
//   // State of Current Movie
//   const [selectedId, setSelectedId] = useState("")
//   // ***********************************************************
//   // State Of Showing  Loading Spinner
//   const [loading, setLoading] = useState(false)
//   // State Of Showing  Error Message
//   const [error, setError] = useState("")
//   // State Of Watched Movies 
//   const [watched, setWateched] = useState([])

//   return <>
//     <Navbar movieName={movieName} onSetMovieName={setMovieName} moviesLength={movies.length} />
//     <MoviesListAndMoviesSummaryBox movieName={movieName} setMovies={setMovies} setLoading={setLoading} setError={setError}>
//       <MoviesList movies={movies} loading={loading} error={error} onSetSelectedId={setSelectedId} />
//       <MoviesSummaryBox selectedId={selectedId} setSelectedId={setSelectedId}  watched={watched} setWateched={setWateched} />
//     </MoviesListAndMoviesSummaryBox>
//   </> 
// }





// function MoviesListAndMoviesSummaryBox({movieName, setMovies, children, setLoading, setError}) {
//   useEffect(function() {
//     const controller = new AbortController()
//     async function  fetchingMovies() {
//       try {
//         // Showing  The Loading Spinner Before  Fetching Data
//         setLoading(true)
//         // Fetching Movies API (OMDAPI)
//         const response = await fetch(`http://www.omdbapi.com/?apikey=3a338bda&s=${movieName}`)
//         //  Check If There Is An Error Of Lossing Connection
//         if (!response.ok) throw new Error("Something Went Wrong Try Again")
//         // The Result Of Hadling  JSON Response
//         const result = await response.json()
//         // Check If The Movie Name Not Found Or Exsits
//         if (result.Response === "False") throw new Error(result.Error)
//         // Setting  Up Error Message  And Hiding It After Successful Request
//         setError("")
//         // Setting Movies Result
//         setMovies(result.Search)
//       } catch(err) {
//         // if (!err.message) console.error("Movie not Found")
//         if (movieName) setError(err.message || "Movie not Found")
//       } finally {
//         // Hidding  The Loading Spinner Before  Fetching Data
//         setLoading(false)
//       }
//     }
//     if (movieName.length < 3) {
//       setMovies([])
//       setError("")
//       return
//     }
//     fetchingMovies()

//     return function() {
//       controller.abort()
//     }
      
//   },[movieName])



//   return <section className="m-r-container" >
//           {children}
//         </section>
// }

// function MoviesList({movies, loading, error, onSetSelectedId}) {
//   // State Of Showing  Movies Results Box
//   const [isOpenMoviesList, setIsOpenMoviesList] =  useState(true)
//   // Handling Opening & Closing
//   function handleOpeningAndClosing(){
//     setIsOpenMoviesList(!isOpenMoviesList)
//   }
//   return <div className={`${isOpenMoviesList ? "movies-result" : "movies-result isOpen"} ${movies.length > 4 ? "scroll" : ""}`} >
//     {isOpenMoviesList ? <span className="hide" onClick={handleOpeningAndClosing}>-</span> : <span className="hide" onClick={handleOpeningAndClosing}>+</span>}
//     <div className="movies-container" >
//       {loading && <LoadingMessage />}
//       {!loading && !error && movies?.map((movie, i) => <Movie movie={movie} onSetSelectedId={onSetSelectedId} key={i}/>)}
//       {error && <ErrorMassage message={error}/>}
//     </div>
//   </div>
// }

// function MoviesSummaryBox({selectedId, setSelectedId, watched, setWateched}) {
//   // State Of Showing  Movie Summary Box
//   const [showingMovieSummary, setShowingMovieSummary] =  useState(true)
//   // Handling Opening & Closing
//   function handleOpeningAndClosing(){
//     setShowingMovieSummary(!showingMovieSummary)
//   }
//   return <div className={showingMovieSummary ? "watching-movies" : "watching-movies isOpen"}>
//           {showingMovieSummary ? <span className="hide" onClick={handleOpeningAndClosing}>-</span> : <span className="hide" onClick={handleOpeningAndClosing}>+</span>}
//           {showingMovieSummary ? <>
//           {selectedId.length >= 1 ? <MovieSummary id={selectedId} onSelecteId={setSelectedId} watched={watched} setWateched={setWateched}/> : <WatchedMovies watched={watched}/>}
//           </> : ""}
//         </div>
// }

// function Movie({movie, onSetSelectedId}) {
//   function currentId() {
//     onSetSelectedId(movie.imdbID)
//   } 
//   return <div className="movie" onClick={currentId}>
//     <img src={movie.Poster} alt={movie.Title}/>
//     <div className="movie-info">
//       <h3>{movie.Title}</h3>
//       <p>📅 {movie.Year}</p>
//     </div>
// </div>
// } 

// function WatchedMovies({watched}) {
//   let imdb = 0;
//   let rating = 0;
//   let mins = 0

    
//   if (watched.length > 0) {
//     imdb = (watched?.map(w => w.imdb)?.reduce((f,s) => { return f + s}, 0)) / watched?.length

//     rating = (watched?.map(w => w.userRating)?.reduce((f,s) => { return f + s}, 0)) / watched?.length
    
//     mins = watched.map(w => w.time).reduce((f, s) => f + s)
//   } 
//   return <>
//     <div className="watched-movies">
//       <h3>movies you watched</h3>
//       <div className="movies-total">
//         <span>#️⃣ {watched.length ?? 0} movies </span>
//         <span>⭐ {imdb.toFixed(1) || 0} </span>
//         <span>🌟 {rating.toFixed(1) || 0} </span>
//         <span>⏳ {mins || 0} min</span>
//       </div>
//     </div>
//     {watched.map((w,i) => <ToWatch movie={w} key={i}/>)}
//   </>
// }

// function ToWatch({movie}) {
  
//   return <div className="movie to-watch" >
//   <img src={movie.poster === "N/A" ? "https://img.freepik.com/free-vector/cinema-realistic-poster-with-illuminated-bucket-popcorn-drink-3d-glasses-reel-tickets-blue-background-with-tapes-vector-illustration_1284-77070.jpg" : movie.poster} alt={movie.title}/>
//   <div className="movie-info">
//     <h3>{movie.title}</h3>
//     <span>🌟 {movie.imdb} </span>
//     <span>⭐ {movie.userRating} </span>
//     <span>⌛{movie.time ? `${movie.time} mins` : "Not known time"}</span>
//   </div>
// </div>
// }

// function MovieSummary({id, onSelecteId, watched, setWateched}) {
//   // State Of Storing Movie that Came By ID
//   const [movieDetails, setMovieDetails] = useState({})
//   //  State of loading or not
//   const [isLoading, setIsLoading] = useState(false)
//   // State Of Movie Rating
//   const [rating, setRating] = useState(null)

//   function handleAdding() {
//     if (!rating)  { 
//       alert('Please Add a rating')
//       return
//     }
//     const movieWithRating = {
//       title: movieDetails.Title,
//       poster:  movieDetails.Poster,
//       imdb: Number(movieDetails.imdbRating) || 0 ,
//       userRating: rating,
//       time: movieDetails.Runtime === "N/A" ? 0 :Number.parseFloat(movieDetails.Runtime),
//       imdbID: id
//     }
//     setWateched([...watched,  movieWithRating])
//     onSelecteId("")
//   }

//   useEffect(function() {
//     async function fetching() {
//       try {
//         setIsLoading(true)
//         const res = await fetch(`http://www.omdbapi.com/?apikey=3a338bda&i=${id}`)
//         const data = await res.json()
//         setMovieDetails(data)
//         setIsLoading(false)
//       } catch(err) {
//         console.error("Something Went Erro Try Again")
//       }
//     }

//     const checkMovie = watched.filter(w => w.imdbID === id)
//     if(checkMovie.length <= 0) {
//       fetching()
//     } else {
//       alert("You Already Have This Movies,,,,,,")
//       onSelecteId("")
//     }
    
//   }, [id])

//   useEffect(function() {
//     if(!movieDetails.Title) return
//     document.title = `Movie : ${movieDetails.Title}`

//     return function() {
//       document.title = `usePopcorn`
//     }
//   },[movieDetails.Title])

//   return <>
//     {isLoading ? <LoadingMessage /> : 
//     <div className="movie-summary">
//       <span className="back" onClick={() => onSelecteId("")}>⬅</span>
//       <div className="summary">
//         <img src={movieDetails.Poster} alt={movieDetails.Title}></img>
//         <div className="info">
//           <h2>{movieDetails.Title}</h2>
//           <p>{movieDetails.Released} {movieDetails?.Runtime}</p>
//           <p>{movieDetails.Genre}</p>
//           <p>⭐ {movieDetails.imdbRating} IMDB Rating</p>
//         </div>
//       </div>
//       <div className="rating">
//         <Rating maxLength={10} color="yellow"  ratingValue={rating} setRating={setRating}/>
//         <button onClick={() => handleAdding()}>+ Add to List</button>
//       </div>
//       <div className="story">
//         <p>{movieDetails.Plot}</p>
//       </div>
//   </div>
//     }
//   </> 
// }

