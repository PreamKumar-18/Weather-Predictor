import React, { useEffect, useState } from "react";
import "../components/style.css";
import WeatherDetails from "./WeatherDetails";
// import axios from 'axios'

function SearchMain() {
    const [searchTerm, setSearchTerm] = useState("mumbai");

    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=ad6e9c6467e2fd3b3fc913e9710d3737`;
            let res = await fetch(url);
            let data = await res.json();
            const { temp, humidity, pressure } = data.main;
            const { main: weatherType } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherType,
                name,
                speed,
                country,
                sunset,
            };
                console.log(myNewWeatherInfo)
            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }
    };
    //  const getWeatherInfo = () => {
        

      // axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=ad6e9c6467e2fd3b3fc913e9710d3737`)
    //         // console.log(myNewWeatherInfo)
    //         let res =  fetch();
    //     let data =  res.json;
    //     const { temp, humidity, pressure } = data.main;
    //     const { main: weatherType } = data.weather[0];
    //     const { name } = data;
    //     const { speed } = data.wind;
    //     const { country, sunset } = data.sys;

    //         const myNewWeatherInfo = {
    //             temp,
    //             humidity,
    //             pressure,
    //             weatherType,
    //             name,
    //             speed,
    //             country,
    //             sunset,
    //         }
    //         .then(() =>setTempInfo(myNewWeatherInfo) ).then((err) => console.log(err))

            
       
    // }
    useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search"
                        placeholder="Search city.."
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />&nbsp;
                    <button className="searchButton" onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>
            <WeatherDetails {...tempInfo} />
        </>
    );
}

export default SearchMain;
