import { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const { setLocationQuery, fetchGeolocation } = useContext(WeatherContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLocationQuery(city.trim());
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <button 
        type="button" 
        className="geo-btn" 
        onClick={fetchGeolocation}
        title="Моє місцезнаходження"
      >
        📍
      </button>

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