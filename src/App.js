import Navbar from "./components/Navbar/Navbar"
import Wrapper from "./components/WrapperCMS/Wrapper"
import MoviesList from "./components/ListingBox/MoviesList"
import Switch from "./components/Switch/Switch"
import MoviesSummaryBox from "./components/SummaryBox/MoviesSummaryBox"
import { useState } from "react"

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
    <Wrapper  movieName={movieName} setMovies={setMovies} setLoadingMs={setLoadingMs} setErrorMs={setErrorMs} setSelectedId={setSelectedId} toggle={toggle}>
      <MoviesList movies={movies} loadingMs={loadingMs} errorMs={errorMs} setSelectedId={setSelectedId} />
      <Switch toggle={toggle} setToggle={setToggle}/>
      <MoviesSummaryBox selectedId={selectedId} setSelectedId={setSelectedId} needWatch={needWatch} setNeedWatch={setNeedWatch} />
    </Wrapper>
  </> 
}

