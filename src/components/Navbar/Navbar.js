import Logo from "./Logo"
import SearchInput from "./SearchInput"
import MoviesCount from "./MoviesCount"

export default function Navbar({movieName, setMovieName, movies}) {
  return <header>
    <nav className="nav-bar">
      <Logo />
      <SearchInput movieName={movieName}  setMovieName={setMovieName}/>
      <MoviesCount movies={movies} />
    </nav>
  </header>
}





