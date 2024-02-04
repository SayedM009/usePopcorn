import SelectedMovie from "./SelectedMovie";
// Total Of Movies Need To Watch
export default function TotalMovies({needWatch, setNeedWatch}) {
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