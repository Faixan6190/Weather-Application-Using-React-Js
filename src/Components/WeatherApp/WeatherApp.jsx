import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../../assets/Images/search.png";
import clear_icon from "../../assets/Images/clear.png";
import cloud_icon from "../../assets/Images/cloud.png";
import drizzle_icon from "../../assets/Images/drizzle.png";
import rain_icon from "../../assets/Images/rain.png";
import snow_icon from "../../assets/Images/snow.png";
import wind_icon from "../../assets/Images/wind.png";
import humidity_icon from "../../assets/Images/humidity.png";

const WeatherApp = () => {
  let api_key = "2ba4795a758d747516b13c11a312a2cc";
  const [weatherInfo, setWeatherInfo] = useState({
    wIcon: cloud_icon,
    humidity: null,
    wind: null,
    temperature: null,
    location: null,
  });

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;
    let response = await fetch(url);
    console.log("response", response);
    let data = await response.json();

    const weatherInfo = {
      humidity: data?.main?.humidity,
      wind: Math.floor(data?.wind?.speed),
      temperature: Math.floor(data?.main?.temp),
      location: data.name,
    };
    console.log("weatherInfo", weatherInfo);

    if (data?.weather[0].icon === "01d" || data?.weather[0].icon === "01n") {
      weatherInfo.wIcon = clear_icon;
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      weatherInfo.wIcon = cloud_icon;
    } else if (
      data?.weather[0].icon === "03d" ||
      data?.weather[0].icon === "03n" ||
      data?.weather[0].icon === "04d" ||
      data?.weather[0].icon === "04n"
    ) {
      weatherInfo.wIcon = drizzle_icon;
    } else if (
      data?.weather[0].icon === "09d" ||
      data?.weather[0].icon === "09n" ||
      data?.weather[0].icon === "10d" ||
      data?.weather[0].icon === "10n"
    ) {
      weatherInfo.wIcon = rain_icon;
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      weatherInfo.wIcon = snow_icon;
    } else {
      weatherInfo.wIcon = clear_icon;
    }

    setWeatherInfo(weatherInfo);
  };

  const { wIcon, humidity, temperature, location, wind } = weatherInfo;
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="search-icon" />
        </div>
      </div>
      {location ? (
        <React.Fragment>
          <div className="weather-image">
            <img src={wIcon} alt="wIcon" />
          </div>
          <div className="weather-temp">{temperature}°C</div>
          <div className="weather-location">{location}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">{humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">{wind} km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div>Please search location</div>
      )}
    </div>
  );
};

export default WeatherApp;
