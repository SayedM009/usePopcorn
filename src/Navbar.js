export default function Navbar({movieName, onSetMovieName, moviesLength}) {
  return <nav className="nav-bar">
    <Logo />
    <SearchBar movieName={movieName} onSetMovieName={onSetMovieName}/>
    <MoviesResultCount moviesLength={moviesLength}/>
  </nav>
}

export function Logo() {
  return <h2 className="logo"><span>🍿</span>usePopCorn</h2>
}

export function SearchBar({movieName,  onSetMovieName}) {
  return <input type="search" placeholder="Search movies..." value={movieName} onChange={(e) => onSetMovieName(e.target.value)}></input>
}

export function MoviesResultCount({moviesLength}) {
  return <p>Found {moviesLength} results</p>
}