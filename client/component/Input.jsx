import { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title,Tooltip,Legend);

const Input = ({open, onClose, savedMovie}) => {
    if(!open)return null
const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (!Array.isArray(savedMovie) || !savedMovie.length) return;

    const labels = savedMovie.map((m) => m.original_title || "Untitled");
    const ratings = savedMovie.map((m) => Number(m.vote_average?.toFixed(2) || 0));

    setChartData({
      labels,
      datasets: [
        {
          label: "Average Rating",
          data: ratings,
          borderColor: "#82ca9d",
          backgroundColor: "rgba(130, 202, 157, 0.3)",
          tension: 0.3,
        },
      ],
    });
  }, [savedMovie]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Movie Ratings (from DB)" },
    },
  };

  if (!chartData.labels) return null;

    return (<>
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50"/>
    <div className="w-100 h-70 bg-white fixed top-1/5 left-2/5 z-1000"> 
        <div className="relative flex flex-col ">

            <Line data={chartData} options={options}/>

            <button onClick={onClose} >
                <img src="/close.svg" className="absolute right-2 top-2 cursor-pointer"/>
            </button> 
        </div>    
    </div>    
    </>)
}

export default Input
