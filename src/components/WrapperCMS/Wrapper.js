import { useEffect } from "react";
export default function Wrapper ({movieName, setMovies, children, setLoadingMs, setErrorMs, setSelectedId, toggle}) {
  useEffect(function() {
    const controller = new AbortController()
    async function  fetchingMovies() {
      try {
        // Showing  The Loading Spinner Before  Fetching Data
        setLoadingMs(true)
        // Fetching Movies API (OMDAPI)
        const response = await fetch(`http://www.omdbapi.com/?apikey=3a338bda&s=${movieName}`,{signal:controller.signal})
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

    
  },[movieName, setMovies,setErrorMs,setLoadingMs,setSelectedId])
  return <section className={`m-r-container ${toggle && "toggle"}` } >
          {children}
        </section>
}