export default function  SearchInput({movieName, setMovieName}) {
    return <input type="search" placeholder="Search movies..." value={movieName} onChange={(e) => setMovieName(e.target.value)}></input>
}