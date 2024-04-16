import React from 'react';
import Image from 'next/image';
import Loading from '../Loading/Loading';

interface ITempInfo {
  currentWeather: any | null;
  dailyForecast: any[] | null;
  hourlyForecast: any[] | null;
  inputLocation: string;
}

const TempInfo: React.FC<ITempInfo> = ({currentWeather, dailyForecast, hourlyForecast, inputLocation}) => {

  const fixedWeatherTemp = currentWeather && currentWeather.current.temp_c;

  const getCurrentTimeWeather = () => {
    return {
      temperature: fixedWeatherTemp,
    };
  };

  const getNext5HourlyForecast = () => {
    const now = new Date().getTime() / 1000;
    const next5HoursForecast = hourlyForecast &&  hourlyForecast.filter((forecast: any) => {
      return forecast.time_epoch > now && forecast.time_epoch < now + 5 * 3600;
    });

    return next5HoursForecast && next5HoursForecast.map((forecast: any) => ({
      temperature: forecast.temp_c,
      hour: new Date(forecast.time_epoch * 1000).getHours(),
      icon: forecast.condition.icon,
      text: forecast.condition.text,
    }));
  };

  return (
    <div>
      {currentWeather 
      ? <div>
        {currentWeather && (
          <div className='text-center my-5'>
              <h1 className='text-4xl'>{inputLocation ? inputLocation : currentWeather.location.region}</h1>
              <p className='my-3'>{currentWeather.current.condition.text}</p>
              <p className='my-5 text-5xl'>{fixedWeatherTemp}°C</p>
              <div className='flex justify-center text-lg'>
                <span>Pressure: {currentWeather.current.pressure_mb}</span>
                <span className="mx-2">|</span>
                <span>Humidity: {currentWeather.current.humidity}%</span>
              </div>
          </div>
        )}
        <div className='border-t border-b border-opacity-10 py-10 my-10 flex justify-evenly text-xl'>
          {getCurrentTimeWeather() && (
            <div>
              <h2>Now</h2>
              {currentWeather && <Image src={`https:${currentWeather.current.condition.icon}`} alt={currentWeather.current.condition.text} width={50} height={50} className='my-2 w-12 h-12'/>}
              <p>{fixedWeatherTemp}°C</p>
            </div>
          )}
        
        
        {/* Next 5 Hourly weather */}
          {getNext5HourlyForecast()?.map((forecast, index) => (
            <div key={index}>
              <h2>{forecast.hour}:00</h2>
              {forecast && forecast.icon && (
                <Image src={`https:${forecast.icon}`} alt={forecast.text} width={50} height={50} className='my-2 w-12 h-12'/>
              )}
              <p>{forecast.temperature}°C</p>
            </div>
          ))}
        </div>

        {/* Daily Weather */}
        <div className='flex justify-evenly text-xl'>
          {dailyForecast?.map((dayForecast, index) => (
            <div key={index}>
              <h2>{new Date(dayForecast.date).toLocaleDateString('en-US', { weekday: 'long' })}</h2>
              <p></p>
              <p className='my-3'>{Math.round(dayForecast.day.maxtemp_c)}°C</p>
              {dayForecast.day.condition.icon && (
                <Image src={`https:${dayForecast.day.condition.icon}`} alt={dayForecast.day.condition.text} width={50} height={50} className='mb-10 w-12 h-12'/>
              )}
            </div>
          ))}
        </div>
      </div>
    : <Loading />
    }
    </div>
  );
};

export default TempInfo;
