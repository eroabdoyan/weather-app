'use client'

import { useEffect, useState } from "react";
import TempInfo from "./components/TempInfo/TempInfo";
import axios from "axios";
import Search from "./components/Search/Search";

const Home = () => {
  const [inputLocation, setInputLocation] = useState<string>('')
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [dailyForecast, setDailyForecast] = useState<any[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [location, setLocation] = useState<{ lat: number | null; lon: number | null }>({ lat: null, lon: null });
  const backgroundImg = ['/images/weathersBg/sunny.avif', '/images/weathersBg/cloudy.jpg', '/images/weathersBg/rainy.webp']
  const [background, setBackground] = useState('');
  const API_KEY = '102013e8883f4577843130908242603';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      error => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if(inputLocation === '') {
          if (location.lat !== null && location.lon !== null) {
            const currentWeatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.lat},${location.lon}`);
            setCurrentWeather(currentWeatherResponse.data);

            const forecastResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.lat},${location.lon}&days=7`);
            setDailyForecast(forecastResponse.data.forecast.forecastday);
            setHourlyForecast(forecastResponse.data.forecast.forecastday[0].hour);
          }
        }else {
          const currentWeatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${inputLocation}`);
          setCurrentWeather(currentWeatherResponse.data);

          const forecastResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${inputLocation}&days=7`);
          setDailyForecast(forecastResponse.data.forecast.forecastday)
          setHourlyForecast(forecastResponse.data.forecast.forecastday[0].hour);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [location,inputLocation]);


  const renderTempInfo = () => {
    if(currentWeather && currentWeather.current) {
      const weatherCondition = currentWeather.current.condition.text.toLowerCase().replace(/\s/g, '');
      let bg = '';

      if(weatherCondition === 'sunny') {
        bg = '/images/weathersBg/sunny.avif';
      } else if(weatherCondition === 'cloudy' || weatherCondition === 'clear') {
        bg = '/images/weathersBg/cloudy.jpg';
      } else if(weatherCondition === 'rainy') {
        bg = '/images/weathersBg/rainy.webp';
      } else if(weatherCondition === 'partlycloudy') {
        bg = '/images/weathersBg/partly-cloudy.jpg';
      } else {
        bg = '/images/main.jpg';
      }

      setBackground(bg);
    }
  }
  
  useEffect(() => {
    renderTempInfo();
  }, [currentWeather]);

  return (
    <main className="flex justify-center items-center text-white my-1">
      <div className="p-2 rounded-3xl border-white w-[1000px] bg-cover"  style={{ backgroundImage: `url('${background}')` }}>
        <div className="mt-5">
          <Search 
            setInputLocation={setInputLocation}
          />
        </div>
        <TempInfo
          currentWeather={currentWeather}
          dailyForecast={dailyForecast}
          hourlyForecast={hourlyForecast}
          inputLocation={inputLocation}
        />    
      </div>
    </main>
  );
}

export default Home;