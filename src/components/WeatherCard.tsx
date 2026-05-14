import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherContext } from "../context/WeatherContext";

const API_KEY = "881c6c33b5a24071b3d211529230412";

const fetchWeatherData = async (query: string | { lat: number; lon: number } | null) => {
  if (!query) return null;
  
  const qStr = typeof query === "string" ? query : `${query.lat},${query.lon}`;
  
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${qStr}&days=3&aqi=no&alerts=no`
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

export default function WeatherCard() {
  const { locationQuery, addToHistory } = useContext(WeatherContext);

  const { data: weather, isLoading, error } = useQuery({
    queryKey: ["weather", locationQuery],
    queryFn: () => fetchWeatherData(locationQuery),
    enabled: !!locationQuery,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (weather) {
      addToHistory(weather.location.name);
    }
  }, [weather]);

  if (isLoading) return <p style={{textAlign: "center"}}>⏳ Завантаження погоди...</p>;
  if (error) return <p style={{textAlign: "center", color: "red"}}>❌ Помилка: Місто не знайдено</p>;
  if (!weather) return <p style={{textAlign: "center"}}>Будь ласка, дозвольте геолокацію або введіть місто.</p>;

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
          {weather.forecast.forecastday.map((day: any) => {
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