import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "./components/Header";
import MainSection from "./components/MainSection";

function App() {
  const [data, setData] = useState(null); //stores all the data
  const [weather, setweather] = useState({}); //stores weather data (icon, weather_conditions)
  const [icon, setIcon] = useState(null);
  const [city, setCity] = useState(localStorage.getItem("city") || "mumbai"); //if there is not any city in localstorage then it will automatically choose mumbai
  const [loading, setLoading] = useState(false);
  const [cityInput, setCityInput] = useState(""); //to track search input field
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");
  const [searchHistory, setSearchHistory] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY; //apikey extracted from .env file

  //here recent five searches are being stored in localStorage
  const saveFiveHistory = (city) => {
    let storedHistory =
      JSON.parse(localStorage.getItem("searchHistoryWeatherData")) || [];
    storedHistory = storedHistory?.filter(
      (c) => c.toLowerCase() !== city.toLowerCase() // to avoid duplicate history
    );
    if (storedHistory.length === 5) {
      const fourSearches = storedHistory.slice(0, 4);
      localStorage.setItem(
        "searchHistoryWeatherData",
        JSON.stringify([city, ...fourSearches])
      );
      setSearchHistory([city, ...fourSearches]);
    } else {
      localStorage.setItem(
        "searchHistoryWeatherData",
        JSON.stringify([city, ...storedHistory])
      );
      setSearchHistory([city, ...storedHistory]);
    }
  };

  //data fetching
  const getData = async () => {
    try {
      setLoading(true);
      setIsError(false);
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`
      );
      setData(result?.data);
      setIcon(result.data.weather[0].icon);
      setweather(result.data.weather[0]);
      localStorage.setItem("city", city);
      setCityInput("");
      saveFiveHistory(city);
    } catch (error) {
      console.log("Error", error);
      if (error.status === 404) {
        setErrorMessage("Invalid city name");
        toast.error(`Invalid city name "${cityInput}"`);
      } else {
        setErrorMessage("Something wrong happened");
        toast.error(`Internal Error!`);
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  //whenever the city changes it will call getData()
  useEffect(() => {
    getData();
  }, [city]);

  // to fetch the data from local storage of recent searches
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistoryWeatherData")) || [];
    setSearchHistory(storedHistory);
  }, []);

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  //search button onclick function
  const handleClickSearch = (e) => {
    setCity(cityInput);
  };

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      localStorage.setItem("mode", "light");
    } else {
      setMode("dark");
      localStorage.setItem("mode", "dark");
    }
  };
  return (
    <div
      className={`w-full min-h-screen ${mode === "dark" ? "dark" : "light"}`}
    >
      <div className="w-[90%]  md:w-[70%] lg:w-[50%] py-4 mx-auto">
        {/* Header contains search bar and mode toggle buttons  */}
        <Header
          mode={mode}
          cityInput={cityInput}
          handleInputChange={handleInputChange}
          handleClickSearch={handleClickSearch}
          toggleMode={toggleMode}
          searchHistory={searchHistory}
        />

        {/* Main sections contains temp, city_name, humidity, windspeed, weather_conditions data and Five day/ 3hrs forecast data  */}
        <MainSection
          city={city}
          isError={isError}
          loading={loading}
          data={data}
          weather={weather}
          icon={icon}
          errorMessage={errorMessage}
          mode={mode}
        />

        {/* refresh button to reload the page to fetch new data  */}
        <div className="flex justify-center py-4">
          <span
            onClick={() => window.location.reload()}
            className={`px-4 py-1 text-sm mt-3 rounded-full border border-neutral-600 cursor-pointer transition duration-300  ${
              mode === "dark" ? "hover:bg-[#263343]" : "hover:bg-red-100"
            } `}
          >
            Refresh
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
