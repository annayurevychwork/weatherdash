import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type WeatherCondition = {
  text: string;
  icon: string;
};

export type WeatherData = {
  location: { name: string; country: string };
  current: { temp_c: number; humidity: number; wind_kph: number; condition: WeatherCondition };
  forecast?: {
    forecastday: {
      date: string;
      day: { maxtemp_c: number; mintemp_c: number; condition: WeatherCondition };
    }[];
  };
};

export type LocationQuery = string | { lat: number; lon: number } | null;

type WeatherContextType = {
  locationQuery: LocationQuery;
  setLocationQuery: (query: LocationQuery) => void;
  history: string[];
  addToHistory: (city: string) => void;
  fetchGeolocation: () => void;
};

export const WeatherContext = createContext<WeatherContextType>({
  locationQuery: null,
  setLocationQuery: () => {},
  history: [],
  addToHistory: () => {},
  fetchGeolocation: () => {},
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>(null);
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("weather-history");
    return saved ? JSON.parse(saved) : [];
  });

  const fetchGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationQuery({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Геолокація відхилена або помилка:", error);
          if (!locationQuery) setLocationQuery("Kyiv");
        }
      );
    } else {
      console.warn("Ваш браузер не підтримує геолокацію");
    }
  };

  useEffect(() => {
    fetchGeolocation();
  }, []);

  const addToHistory = (city: string) => {
    setHistory((prev) => {
      const newHistory = [city, ...prev.filter((c) => c !== city)].slice(0, 10);
      localStorage.setItem("weather-history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <WeatherContext.Provider value={{ locationQuery, setLocationQuery, history, addToHistory, fetchGeolocation }}>
      {children}
    </WeatherContext.Provider>
  );
};