// import { useEffect, useState } from "react";
// import Welcome from "./components/Welcome";
// import SearchBar from "./components/SearchBar";
// import WeatherHeader from "./components/WeatherHeader";
// import HourlyForecast from "./components/HourlyForecast";
// import DailyForecast from "./components/DailyForecast";
// import WeatherCards from "./components/WeatherCards";
// import useWeather from "./hooks/useWeather";
// import { getBackground } from "./utils/backgrounds";
// import { motion } from "framer-motion";
// import BlurLoader from "./components/BlurLoader";   // ⭐ New loader
// import Footer from "./components/Footer";

// function App() {
//   const [city, setCity] = useState(() => localStorage.getItem("city") || "");
//   const [firstTime, setFirstTime] = useState(!localStorage.getItem("city"));

//   const { weather, loading, error } = useWeather(city);

//   const handleCitySelect = (newCity) => {
//     setFirstTime(false);
//     setTimeout(() => {
//       setCity(newCity);
//       localStorage.setItem("city", newCity);
//     }, 50);
//   };

//   const handleUseLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const lat = pos.coords.latitude;
//         const lon = pos.coords.longitude;
//         handleCitySelect(`${lat},${lon}`);
//       },
//       () => alert("Location access denied")
//     );
//   };

//   // ⭐ Show welcome screen first time only
//   if (firstTime) {
//     return <Welcome onSearch={handleCitySelect} onLocation={handleUseLocation} />;
//   }

  
//   if (!weather) return null;

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl">
//         Error: {error}
//       </div>
//     );
//   }

//   const condition = weather.current.condition.text;
//   const bgClass = getBackground(condition);

//   return (
//     <motion.div
//       key={bgClass}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className={`${bgClass} min-h-screen p-4 md:p-8 relative`}
//     >
//       {/* ⭐ Blur loader overlays on top, no screen flash */}
//       {loading && <BlurLoader />}

//       <div className="max-w-3xl mx-auto space-y-10">
//         <SearchBar onSearch={handleCitySelect} showLocationIcon={true} />

//         <WeatherHeader
//           city={weather.location.name}
//           temp={weather.current.temp_c}
//           condition={weather.current.condition.text}
//           max={weather.forecast.forecastday[0].day.maxtemp_c}
//           min={weather.forecast.forecastday[0].day.mintemp_c}
//         />

//         <HourlyForecast
//           hoursToday={weather.forecast.forecastday[0].hour}
//           hoursTomorrow={weather.forecast.forecastday[1].hour}
//           localtime={weather.location.localtime}
//           astro={weather.forecast.forecastday[0].astro}
//         />

//         <DailyForecast days={weather.forecast.forecastday} />

//         <WeatherCards
//           current={weather.current}
//           aqi={weather.current.air_quality}
//           astro={weather.forecast.forecastday[0].astro}
//         />
//          <Footer />
//       </div>
//     </motion.div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import SearchBar from "./components/SearchBar";
import WeatherHeader from "./components/WeatherHeader";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import WeatherCards from "./components/WeatherCards";
import useWeather from "./hooks/useWeather";
import { getBackground } from "./utils/backgrounds";
import { motion } from "framer-motion";
import BlurLoader from "./components/BlurLoader";
import Footer from "./components/Footer";

function App() {
  const [city, setCity] = useState(() => localStorage.getItem("city") || "");
  const [firstTime, setFirstTime] = useState(!localStorage.getItem("city"));

  const { weather, loading, error } = useWeather(city);

  const handleCitySelect = (newCity) => {
    setFirstTime(false);
    setTimeout(() => {
      setCity(newCity);
      localStorage.setItem("city", newCity);
    }, 50);
  };

  const handleUseLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        handleCitySelect(`${lat},${lon}`);
      },
      () => alert("Location access denied")
    );
  };

  // ⭐ Show Welcome Screen ONLY first time
  if (firstTime) {
    return <Welcome onSearch={handleCitySelect} onLocation={handleUseLocation} />;
  }

  // ⭐ If weather not loaded yet, keep showing previous UI (NO WHITE)
  const showWeather = weather && !firstTime;

  // Background must always be correct
  const condition = weather?.current?.condition?.text || "Clear";
  const bgClass = getBackground(condition);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      key={bgClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`${bgClass} min-h-screen p-4 md:p-8 relative`}
    >

      {/* ⭐ Blur overlay while fetching new weather */}
      {loading && <BlurLoader />}

      {/* ⭐ Show previous weather while loading (NO WHITE FLASH) */}
      {showWeather && (
        <div className="max-w-3xl mx-auto space-y-10">

          <SearchBar onSearch={handleCitySelect} showLocationIcon={true} />

          <WeatherHeader
            city={weather.location.name}
            temp={weather.current.temp_c}
            condition={weather.current.condition.text}
            max={weather.forecast.forecastday[0].day.maxtemp_c}
            min={weather.forecast.forecastday[0].day.mintemp_c}
          />

          <HourlyForecast
            hoursToday={weather.forecast.forecastday[0].hour}
            hoursTomorrow={weather.forecast.forecastday[1].hour}
            localtime={weather.location.localtime}
            astro={weather.forecast.forecastday[0].astro}
          />

          <DailyForecast days={weather.forecast.forecastday} />

          <WeatherCards
            current={weather.current}
            aqi={weather.current.air_quality}
            astro={weather.forecast.forecastday[0].astro}
          />

          <Footer />
        </div>
      )}
    </motion.div>
  );
}

export default App;