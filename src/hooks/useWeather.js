// import { useEffect, useState } from "react";

// export default function useWeather(city) {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_KEY = "bd284f96729548afbf1123456251411";

//   useEffect(() => {
//     async function fetchWeather() {
//       try {
//         setLoading(true);

//         const res = await fetch(
//           `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=no`
//         );

//         if (!res.ok) throw new Error("Failed to fetch");

//         const data = await res.json();
//         setWeather(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchWeather();
//   }, [city]);

//   return { weather, loading, error };
// }

import { useEffect, useState } from "react";

export default function useWeather(city) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "bd284f96729548afbf1123456251411";

  useEffect(() => {
    // 🚨 STOP if empty or undefined city
    if (!city || city.trim() === "") return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}&days=7&aqi=yes&alerts=no`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message || "Unable to fetch weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
}