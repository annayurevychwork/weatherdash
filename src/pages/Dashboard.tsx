import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import SavedCities from "../components/SavedCities";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <SearchBar />
      <div className="grid">
        <WeatherCard />
        <SavedCities />
      </div>
    </div>
  );
}
