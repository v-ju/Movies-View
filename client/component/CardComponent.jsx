import { useEffect, useState } from "react"
import { api } from "../controllers/helper"
const CardComponent = ({imgPath, title, description, date, rating, payload,savedIds,setSavedIds}) => {
  const [expand, setExpand] = useState(false)

  const handleText = () => {
    if(!expand){
      return <div>
        {description.substring(0, 100)}...{''}
        <span onClick={() => setExpand(true)}>see more</span>
      </div>
    }else{
      return <div>
        {description}...{''}
        <span onClick={() => setExpand(false)}>see less</span>
      </div>
    }
  }
  const isSaved = savedIds.has(payload.id);

  const [statusMsg, setStatusMsg] = useState("")

  useEffect(()=>{
  if (statusMsg){
    const timer =  setTimeout(() => setStatusMsg(''), 3000);
    return () => clearTimeout(timer)
  }  
  },[statusMsg])
  
  const handleAdd = async(data) => {
    console.log(data)
    try {
      setStatusMsg("Saving...");

      const request_body = {
        tmdb_id: data.id,
        original_title: data.original_title || "",
        overview: data.overview || "",
        release_date: data.release_date || null,
        poster_path: data.poster_path || "",
        backdrop_path: data.backdrop_path || "",
        popularity: data.popularity || 0,
        vote_average: data.vote_average.toFixed(2) || 0,
        vote_count: data.vote_count || 0,
        adult: Boolean(data.adult),
        original_language: data.original_language || "",
      };

      const res = await api.post("/movies/add/", request_body);
      setSavedIds(prev => {
        const newSet = new Set(prev);
        const alreadySaved = newSet.has(payload.id);
        if (alreadySaved) newSet.delete(payload.id);
        else newSet.add(payload.id);
        return newSet;
      });

      if (res.status === 201) {
        setStatusMsg("Added to DB");
      } else if (res.status === 200) {
        setStatusMsg(" Already ");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Error saving movie");
    }
  };

  const handleRemove = async(data) => {
    try{
      setStatusMsg("Deleting..");
      const res = await api.delete(`/movies/delete/?tmdb_id=${data.id}`);

      if (res.status === 204) {
        setStatusMsg("Deleted");
      }

      setSavedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(data.id);
        return newSet;
      });
    }catch(err){
      console.log("message",err.message)
    }
  }


  return (
    <div className="  bg-white/20 relative">
      <div className="p-2">
        <img src={imgPath}/>
        <div>
          <div className="text-amber-200 ">{title}</div>
          <span className="text-sm text-amber-600">{date}</span>
        </div>
        <div className="text-white text-sm">{handleText()}</div>
        <br></br>
        <div className="absolute bottom-2 text-base">Rating: <span    className="text-sm text-amber-300">{rating.toFixed(2)}</span>      
        </div>
        <span className="absolute right-10 bottom-3 text-xs">{statusMsg}</span>
        <button className=" absolute bottom-2 right-3 cursor-pointer" onClick={isSaved ? () => handleRemove(payload) : () => handleAdd(payload)}>
          <img src={isSaved ? "/minus.svg" : "/add.svg"} alt={isSaved ? "delete" : "add"}/>
        </button>
        
      </div>
    </div>
  )
}

export default CardComponent