import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { WeatherProvider } from "./context/WeatherContext";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import SavedCities from "./components/SavedCities";
import { useContext } from "react";

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">🌤 WeatherDash</div>
        <div className="search-container">
          <SearchBar />
        </div>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      <SavedCities />

      <WeatherCard />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <AppContent />
      </WeatherProvider>
    </ThemeProvider>
  );
}
