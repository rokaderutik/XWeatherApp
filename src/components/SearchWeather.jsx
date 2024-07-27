import { useState, useEffect } from "react";
import "./SearchWeather.css";

export default function SearchWeather() {
    const [city, setCity] = useState('');
    const [search, setSearch] = useState(false);
    const [isApiCallGoing, setIsApiCallGoing] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=e7946520ea9c4610a6b164532240105&q=${city}`);

                if(res.status === 400) {
                    alert("Failed to fetch weather data");
                }
                const data = await res.json();
                setWeatherData(data);
            } catch(e) {
                console.error(e.message);
            } finally {
                setIsApiCallGoing(false);
                setSearch(false);
            }
        }

        if(search) {
            setWeatherData(null);
            setIsApiCallGoing(true);
            fetchData();
        }
    }, [search]);

    function handleSubmit(e) {
        e.preventDefault();
        setSearch(true);     
    }

// console.log(isApiCallGoing, weatherData, search, city)
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Enter city name"
                    className="input"
                    required
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value.trim())}
                />
                <button type="submit" className="button">Search</button>
            </form>

            {
                isApiCallGoing && <p>Loading data...</p>
            }
            {
                (weatherData && weatherData.current) &&
                    <div className="weather-cards">
                        <div className="weather-card">
                            <h4>Temperature</h4>
                            <p>{weatherData.current.temp_c}°C</p>
                        </div>
                        <div className="weather-card">
                            <h4>Humidity</h4>
                            <p>{weatherData.current.humidity}%</p>
                        </div>
                        <div className="weather-card">
                            <h4>Condition</h4>
                            <p>{weatherData.current.condition.text}</p>
                        </div>
                        <div className="weather-card">
                            <h4>Wind Speed</h4>
                            <p>{weatherData.current.wind_kph} kph</p>
                        </div>
                    </div>
            }
        </div>
    );
}

// e7946520ea9c4610a6b164532240105