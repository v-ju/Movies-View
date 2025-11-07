import { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title,Tooltip,Legend);

const ChartModal = ({open, onClose, savedMovie}) => {
  
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
  if (!open) return null;
  if (!chartData.labels) return null;

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white rounded-xl p-6 w-[600px] shadow-xl">
        {chartData ? (
          <Line data={chartData} />
        ) : (
          <p className="text-center text-gray-600">Loading chart...</p>
        )}

        <button onClick={onClose}>
          <img
            src="/close.svg"
            alt="Close"
            className="absolute right-2 top-2 cursor-pointer w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export default ChartModal
