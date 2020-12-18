import React, { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import SearchHeader from "./components/SearchHeader";
import Toggle from "./components/Toggle";
import WeatherToday from "./components/WeatherToday";
import Card from "./components/Card";

// tailwind css classes
const hideMenu = "md:col-span-1 hidden md:flex flex-col items-center";
const showMenu = "md:col-span-1 flex flex-col items-center";

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const [tempUnit, setTempUnit] = useState(true);
  const [windSpeedUnit, setWindSpeedUnit] = useState(false);
  const [timeFormat, setTimeFormat] = useState(false);

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [weatherForecast, setWeatherForecast] = useState([]);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleLocationSelect = async (value) => {
    setLoadingInfo(true);
    setCurrentWeather({});
    setWeatherForecast([]);

    const results = await geocodeByAddress(value);
    const coords = await getLatLng(results[0]);
    setAddress(value);  
    setCoordinates(coords);
    getWeatherDetails(coords.lat, coords.lng);
  };

  const getWeatherDetails = (lat, lng) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        let today = {
          ...data.current,
          temp_min: data.daily[0].temp.min,
          temp_max: data.daily[0].temp.max,
        };
        setCurrentWeather(today);
        setWeatherForecast(data.daily.splice(1));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App bg-gray-500 min-w-full min-h-screen">
      <SearchHeader
        toggleMenu={toggleMenu}
        address={address}
        setAddress={setAddress}
        handleLocationSelect={handleLocationSelect}
      />

      <div className="grid md:grid-cols-6 h-full">
        <div className={menuVisible ? showMenu : hideMenu}>
          <Toggle
            title={"Temperature"}
            option1={"\u00B0C"}
            option2={"\u00B0F"}
            selected={tempUnit}
            handleChange={() => setTempUnit(!tempUnit)}
          />
          <Toggle
            title={"Wind Speed"}
            option1={"M/S"}
            option2={"Mi/H"}
            selected={windSpeedUnit}
            handleChange={() => setWindSpeedUnit(!windSpeedUnit)}
          />
          <Toggle
            title={"Time"}
            option1={"12 H"}
            option2={"24 H"}
            selected={timeFormat}
            handleChange={() => setTimeFormat(!timeFormat)}
          />
        </div>

        <div className="md:col-span-5 px-4 py-4 md:rounded-tl-3xl bg-indigo-900 h-full">
          <WeatherToday data={currentWeather} loading={loadingInfo} tempUnit={tempUnit} />
          <div className="grid mt-24 md:mt-auto md:grid-cols-3 lg:grid-cols-4">
            {weatherForecast.map((data, index) => (
              <Card
                key={index}
                data={data}
                tempUnit={tempUnit}
                windSpeedUnit={windSpeedUnit}
                timeFormat={timeFormat}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
