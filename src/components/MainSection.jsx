import React from "react";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaTemperatureQuarter } from "react-icons/fa6";
import FiveDayForecast from "./FiveDayForecast";

const MainSection = ({
  data,
  icon,
  weather,
  loading,
  errorMessage,
  isError,
  city
}) => {
  return !loading ? (
    !isError ? (
      <div className="mt-10">
        <div className="flex items-center gap-28 md:gap-28">
          <div className="px-2 md:px-3 lg:px-6">
            <h2 className="md:text-3xl font-bold">{data?.name}</h2>
            <h1 className="mt-4 md:mt-10 text-3xl md:text-5xl font-semibold">
              {data && Math.round(data?.main?.temp) + "°C"}
            </h1>
          </div>
          <div className="w-28 md:w-48">
            <img
              className="w-full h-full"
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="icon"
            />
          </div>
        </div>

        <div className="text-white mt-10 rounded-md bg-[#263343] p-4 grid grid-cols-1 md:grid-cols-2 gap-y-10">
          <div className="flex gap-1">
            <WiHumidity className="text-neutral-300 text-xl" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-neutral-300">Humidity</span>
              <span className="font-semibold text-xl">
                {data?.main?.humidity}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <FaWind className="text-neutral-300 text-xl" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-neutral-300">Wind</span>
              <span className="font-semibold text-xl">
                {data?.wind?.speed} m/s
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-neutral-300">
                Weather Condition
              </span>
              <span className="font-semibold text-xl capitalize">
                {weather?.description}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <FaTemperatureQuarter className="text-neutral-300 text-xl" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-neutral-300">Feels Like</span>
              <span className="font-semibold text-xl capitalize">
                {Math.round(data?.main?.feels_like)} °C
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 font-semibold text-xl">Weather Trends</div>
        {/* five days/ 3 hrs data  */}
        <FiveDayForecast city={city} />
      </div>
    ) : (
      <div className="h-48 mt-5 rounded-md flex flex-col justify-center items-center">
        <span>{errorMessage}</span>
        <span>Try Again!</span>
      </div>
    )
  ) : (
    <div className="h-48 mt-5 flex justify-center items-center">
      <div className="h-9 w-9 border-2 border-neutral-400 border-t-2 border-t-orange-700 animate-spin rounded-full"></div>
    </div>
  );
};

export default MainSection;
