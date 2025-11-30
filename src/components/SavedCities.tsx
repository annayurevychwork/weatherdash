import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function SavedCities() {
  const { history, fetchWeather } = useContext(WeatherContext);

  if (!history.length) return null;

  return (
    <div className="saved-cities">
      <h3>Recent Searches:</h3>
      <ul>
        {history.map((city) => (
          <li key={city} onClick={() => fetchWeather(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}
