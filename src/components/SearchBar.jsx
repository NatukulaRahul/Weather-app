import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

function SearchBar({ onSearch, showLocationIcon }) {
  const [input, setInput] = useState("");

  return (
    <div className="flex items-center gap-3 w-full">

      {/* SEARCH BAR */}
      <div className="
        relative 
        bg-white 
        rounded-full 
        shadow-md 
        flex items-center 
        px-4 
        h-[56px] md:h-[60px] 
        w-full
      ">

        <Search className="text-gray-500" size={22} />

        <input
          type="text"
          className="
            ml-3 
            w-full 
            text-gray-800 
            outline-none 
            bg-transparent 
            pr-12 
            text-base md:text-lg
          "
          placeholder="Search city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() !== "") {
              onSearch(input.trim());
              setInput("");
            }
          }}
        />

        <AnimatePresence>
  {input.trim() !== "" && (
    <motion.button
      key="arrow"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        onSearch(input.trim());
        setInput("");
      }}
      className="
        absolute right-2 flex items-center justify-center shadow-md active:scale-95

        /* MOBILE (default) */
        w-10 h-10 rounded-full bg-blue-500 text-white

        /* DESKTOP */
        sm:w-auto sm:h-auto sm:px-4 sm:py-2 sm:rounded-full sm:bg-blue-500
      "
    >
      <ArrowRight size={20} strokeWidth={2.5} />
    </motion.button>
  )}
</AnimatePresence>

      </div>

      {/* LOCATION BUTTON */}
      {showLocationIcon && (
        <button
          onClick={() =>
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                onSearch(`${pos.coords.latitude},${pos.coords.longitude}`);
              },
              () => alert("Location access denied")
            )
          }
          className="
            w-[56px] h-[56px] 
            md:w-[60px] md:h-[60px]
            rounded-full 
            bg-gradient-to-r 
            from-blue-400 to-blue-600 
            flex items-center justify-center 
            shadow-lg 
            active:scale-90 
            transition
          "
        >
          <MapPin color="white" size={24} />
        </button>
      )}

    </div>
  );
}

export default SearchBar;