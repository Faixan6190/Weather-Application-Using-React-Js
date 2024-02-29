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
  const [wicon, setWiCon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + " °c";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWiCon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWiCon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWiCon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWiCon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWiCon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWiCon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWiCon(snow_icon);
    } else {
      setWiCon(clear_icon);
    }
  };

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
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={cloud_icon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
