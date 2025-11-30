import { createContext, useState } from "react";
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

type WeatherContextType = {
  weather: WeatherData | null;
  fetchWeather: (city: string) => Promise<void>;
  history: string[];
};

export const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  fetchWeather: async () => {},
  history: [],
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("weather-history");
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = "881c6c33b5a24071b3d211529230412";

  const fetchWeather = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
      );
      if (!response.ok) throw new Error("City not found");
      const data: WeatherData = await response.json();
      setWeather(data);

      setHistory((prev) => {
        const newHistory = [city, ...prev.filter((c) => c !== city)].slice(0, 10);
        localStorage.setItem("weather-history", JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, fetchWeather, history }}>
      {children}
    </WeatherContext.Provider>
  );
};
