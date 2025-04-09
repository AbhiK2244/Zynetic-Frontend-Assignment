import axios from "axios";
import React, { useEffect, useState } from "react";

const FiveDayForecast = ({ city}) => {
  const [data, setData] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY; //apikey extracted from .env file

  const getForecastData = async () => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`
      );
      setData(result.data.list);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getForecastData();
  }, [city]);
  return (
    <div className="p-4 flex items-center flex-nowrap overflow-y-hidden gap-4 custom-scrollbar whitespace-nowrap">
      {data.map((item, index) => (
        <div
          className="flex flex-col rounded-md items-center border p-2 w-48"
          key={index}
        >
          <h1>{Math.round(item.main.temp)} °C</h1>
          <div className="w-14">
            <img
              className="w-full h-full"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="icon"
            />
          </div>
          {/* this ensures the date has a specific format where it shows day, month */}
          <span className="text-xs">
            {new Date(item?.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
          {/* to show time  */}
          <span className="text-xs">
            {item?.dt_txt.split(" ")[1]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
