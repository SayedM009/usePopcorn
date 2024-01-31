export default function Navbar({children}) {
  return <nav className="nav-bar">
    {children}
  </nav>
}

function Logo() {
  return <h2 className="logo"><span>🍿</span>usePopCorn</h2>
}

function SearchBar({movieName,  onSetMovieName}) {
  return <input type="search" placeholder="Search movies..." value={movieName} onChange={(e) => onSetMovieName(e.target.value)}></input>
}

function MoviesResultCount({moviesLength}) {
  return <p>Found {moviesLength} results</p>
}