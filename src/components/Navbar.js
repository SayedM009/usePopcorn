export default function Navbar({movieName, setMovieName, movies}) {
  return <nav className="nav-bar">
    <h2 className="logo"><span>🍿</span>usePopCorn</h2>
    <input type="search" placeholder="Search movies..." value={movieName} onChange={(e) => setMovieName(e.target.value)}></input>
    <p>Found {movies.length} results</p>
  </nav>
}