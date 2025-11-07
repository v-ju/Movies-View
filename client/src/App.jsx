import { useEffect, useState } from "react"
import { getGreeting } from "../controllers/helper"
import { api } from "../controllers/helper"
import CardComponent from "../component/CardComponent"
import Spinner from "../component/Spinner"
import ChartModal from "../component/ChartModal"


function App() {
  const greeting  = getGreeting()
  const [savedMovie, setSavedMovie] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [pageContent, setPageContent] = useState([])
  console.log("before use",pageContent)
  const startIndex = 0
  const endIndex = (pageContent.length / 2)
  const [listingMode, setListingMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchedMovies = async() => {
      try{setLoading(true)
        const movies = await api.get('/movie/')
        setPageContent(movies.data)}
      catch(err){
        console.log('Error fetching Page', err)
      }finally{
        setLoading(false)
      }
    };
    fetchedMovies()
  },[])

  useEffect(() => {
    const moviesInDB = async() => {
      try{
        const res = await api.get('/movies/list/')
        setSavedMovie(res.data)
        setSavedIds(new Set(res.data.map((m) => m.tmdb_id)));
      }catch(err){
        return console.log("Error fetching data..!")
      }
    }  
    moviesInDB()
    console.log(savedMovie)
  },[refreshKey])

  if (loading){
    return <Spinner/>
  }
  
  
  return (<div className="flex">

    <div className="text-white p-2 "> 
      <button className="border-0 rounded-2xl bg-white/20 p-2 cursor-pointer mb-3" onClick={() => setListingMode(true) }>Create List
      </button>
    </div>

    <div className="flex-1 h-screen relative ml-10">
      <div className="flex flex-col">

        <div className="items-center justify-center text-3xl py-4 text-amber-50 ">
        {greeting}
        </div>

        <div className="text-amber-50 grid grid-cols-5 grid-rows-2 gap-3">
          {
            pageContent.slice(startIndex, endIndex).map(card => (
              <CardComponent key={card.id} savedIds={savedIds} setSavedIds={setSavedIds} payload={card} imgPath={`https://image.tmdb.org/t/p/w500/${card.poster_path}`} title={card.original_title} date={card.release_date} description={card.overview} rating={card.vote_average} setRefreshKey={setRefreshKey}/>
            ))
          }
        </div> 

        
        <ChartModal open={listingMode} onClose={() => setListingMode(false)} savedMovie={savedMovie}/>
        

        <div className=" absolute mx-auto left-80 bottom-10">
          
        </div>
      </div>
    </div>  
    </div>
  )
}

export default App

