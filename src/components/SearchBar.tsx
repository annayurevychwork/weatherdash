import { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const { fetchWeather } = useContext(WeatherContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;
    fetchWeather(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
