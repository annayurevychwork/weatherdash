import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function WeatherCard() {
  const { weather } = useContext(WeatherContext);

  if (!weather) return <p>No data yet. Search for a city.</p>;

  return (
    <div className="weather-card">
      <h2>
        {weather.location.name}, {weather.location.country}
      </h2>

      <div className="current-weather">
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
          className="weather-icon"
        />
        <div>
          <p>{weather.current.condition.text}</p>
          <p>🌡 Temp: {weather.current.temp_c}°C</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
          <p>💨 Wind: {weather.current.wind_kph} km/h</p>
        </div>
      </div>

      {weather.forecast && (
        <div className="forecast-grid">
          {weather.forecast.forecastday.map((day) => {
            const condition = day.day.condition.text.toLowerCase();
            const isSun = condition.includes("sun") || condition.includes("clear");
            const isCloud = condition.includes("cloud") || condition.includes("overcast");
            const isRain =
              condition.includes("rain") ||
              condition.includes("drizzle") ||
              condition.includes("shower");

            return (
              <div key={day.date} className="forecast-day">
                <p className="forecast-date">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </p>

                <div className="forecast-icon">
                  {isSun && <div className="sun"></div>}
                  {isCloud && <div className="cloud"></div>}
                  {isRain && (
                    <>
                      <div className="cloud"></div>
                      <div className="rain" style={{ left: "30%" }}></div>
                      <div className="rain" style={{ left: "50%" }}></div>
                      <div className="rain" style={{ left: "70%" }}></div>
                    </>
                  )}
                </div>

                <p>{day.day.condition.text}</p>
                <p>
                  {day.day.mintemp_c}°C - {day.day.maxtemp_c}°C
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
