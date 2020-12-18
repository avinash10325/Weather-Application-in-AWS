import React from "react";
import { kelvinToCelsius, kelvinToFahrenheit } from "../utils/Conversion";
import sunny from "../assets/sunny.png";

const textStyle = "text-xl  flex justify-between";

function WeatherToday(props) {
  const { data, loading, tempUnit } = props;

  const msg = loading ? "Loading weather info.." : "Please enter a location to check weather data";

  let tempToday = tempUnit ? kelvinToFahrenheit(data.temp) + " F" : kelvinToCelsius(data.temp) + " C";
  let feelsLike = tempUnit
    ? kelvinToFahrenheit(data.feels_like) + " F"
    : kelvinToCelsius(data.feels_like) + " C";
  let tempMin = tempUnit ? kelvinToFahrenheit(data.temp_min) + " F" : kelvinToCelsius(data.temp_min) + " C";
  let tempMax = tempUnit ? kelvinToFahrenheit(data.temp_max) + " F" : kelvinToCelsius(data.temp_max) + " C";

  return (
    <div className="md:h-1/2 flex flex-col lg:flex-row md:justify-evenly items-center">
      <img className="md:h-3/4" src={sunny} alt="stew" />
      <div className="py-10 px-4 lg:p-12 m-8 md:m-2 md:ml-8 w-full lg:w-1/2 bg-white text-gray-600 rounded-3xl overflow-hidden">
        <h1 className="text-green-500 text-3xl mb-6">Weather Today</h1>
        {data.dt == null ? (
          <h1 className="text-red-500">{msg}</h1>
        ) : (
          <>
            <h4 className={textStyle}>
              Temperature <span>{tempToday}</span>
            </h4>
            <h4 className={textStyle}>
              Feels like <span>{feelsLike}</span>
            </h4>
            <h4 className={textStyle}>
              Temperature Minimum <span>{tempMin}</span>
            </h4>
            <h4 className={textStyle}>
              Temperature Maximum <span>{tempMax}</span>
            </h4>
            <h4 className={textStyle}>
              Pressure <span>{data.pressure} hPa</span>
            </h4>
            <h4 className={textStyle}>
              Humidity <span>{data.humidity} %</span>
            </h4>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherToday;
