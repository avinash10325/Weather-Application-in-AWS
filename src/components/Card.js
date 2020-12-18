import React from "react";
import { kelvinToCelsius, metreSecToMileHour, kelvinToFahrenheit } from "../utils/Conversion";

const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const textStyle = "text-lg  flex justify-between";

function Card(props) {
  const { data, tempUnit, timeFormat, windSpeedUnit } = props;

  let date = new Date(data.dt * 1000);

  let dateString = `${dayOfWeek[date.getDay()]} ${date.getDate()}/${date.getMonth()}`;
  let sunriseTime = timeFormat
    ? new Date(data.sunrise * 1000).toTimeString().substr(0, 9)
    : new Date(data.sunrise * 1000).toLocaleTimeString();
  let sunsetTime = timeFormat
    ? new Date(data.sunset * 1000).toTimeString().substr(0, 9)
    : new Date(data.sunset * 1000).toLocaleTimeString();
  let temp = tempUnit ? kelvinToFahrenheit(data.temp.day) + " F" : kelvinToCelsius(data.temp.day) + " C";
  let feelsLike = tempUnit
    ? kelvinToFahrenheit(data.feels_like.day) + " F"
    : kelvinToCelsius(data.feels_like.day) + " C";

  let windSpeed = windSpeedUnit
    ? metreSecToMileHour(data.wind_speed) + " Mi/H"
    : data.wind_speed + " m/s";

  return (
    <div className="bg-white flex flex-col text-gray-600 p-4 m-2 rounded-3xl">
      <h4 className={textStyle}>
        Temperature <span>{temp}</span>
      </h4>
      <h4 className={textStyle}>
        Feels like <span>{feelsLike}</span>
      </h4>
      <h4 className={textStyle}>
        Sunrise <span>{sunriseTime}</span>
      </h4>
      <h4 className={textStyle}>
        Sunset <span>{sunsetTime}</span>
      </h4>
      <h4 className={textStyle}>
        Wind Speed <span>{windSpeed}</span>
      </h4>
      <h4 className={textStyle}>
        Pressure <span>{data.pressure} hPa</span>
      </h4>
      <h4 className={textStyle}>
        Humidity <span>{data.humidity} %</span>
      </h4>
      <h1 className="text-xl text-gray-800 self-center">{dateString}</h1>
    </div>
  );
}

export default Card;
