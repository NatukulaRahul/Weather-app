// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, MapPin, ArrowRight } from "lucide-react";

// function Welcome({ onSearch, onLocation }) {
//   const [input, setInput] = useState("");

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen flex flex-col justify-between"
//       style={{
//         background: `linear-gradient(
//           180deg,
//           #0A0F2C 0%,
//           #4A3A4F 25%,
//           #063A7A 55%,
//           #1E6BD6 75%,
//           #D94B2B 100%
//         )`,
//       }}
//     >

//       {/* MAIN CONTENT */}
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center text-white px-6 w-full max-w-md">

//           {/* Glowing Icon */}
//           <motion.div
//             animate={{ scale: [1, 1.05, 1] }}
//             transition={{ duration: 3, repeat: Infinity }}
//             className="mx-auto mb-6 w-28 h-28 flex items-center justify-center"
//           >
//             <img
//               src="/icons/icon-512.png"
//               alt="logo"
//               className="w-28 h-28 rounded-full object-cover"
//             />
//           </motion.div>

//           {/* Title */}
//           <h1 className="text-4xl font-bold mb-2 drop-shadow-md">
//             RK Weather
//           </h1>

//           {/* Subtitle */}
//           <p className="text-white/80 mb-8 text-sm">
//             Your realtime weather, anywhere in the world.
//           </p>

//           {/* Search Bar */}
//           <div className="flex items-center bg-white rounded-full shadow-md px-4 py-3 mb-4 relative">
//             <Search className="text-gray-500" size={20} />

//             <input
//               type="text"
//               className="ml-2 w-full text-gray-800 outline-none bg-transparent pr-10"
//               placeholder="Search city..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && input.trim() !== "") {
//                   onSearch(input.trim());
//                   setInput("");
//                 }
//               }}
//             />

//             {/* ⭐ Arrow Button (animated, mobile circle / desktop pill) */}
//             <AnimatePresence>
//               {input.trim() !== "" && (
//                 <motion.button
//                   key="arrow"
//                   initial={{ opacity: 0, x: 10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 10 }}
//                   transition={{ duration: 0.2 }}
//                   onClick={() => {
//                     onSearch(input.trim());
//                     setInput("");
//                   }}
//                   className="
//                     absolute right-2 flex items-center justify-center 
//                     shadow-md active:scale-95 text-white

//                     /* MOBILE (default) */
//                     w-10 h-10 rounded-full bg-blue-500

//                     /* DESKTOP */
//                     sm:w-auto sm:h-auto sm:px-4 sm:py-2 
//                     sm:rounded-full sm:bg-blue-500
//                   "
//                 >
//                   <ArrowRight size={20} strokeWidth={2.6} />
//                 </motion.button>
//               )}
//             </AnimatePresence>

//           </div>

//           {/* Location Button */}
//           <button
//             onClick={onLocation}
//             className="w-full bg-white/20 backdrop-blur-lg border border-white/40 rounded-full py-3 
//                        flex items-center justify-center gap-2 shadow-lg active:scale-95 
//                        transition text-white font-medium"
//           >
//             <MapPin size={18} />
//             Use My Current Location
//           </button>

//           {/* Mini Text */}
//           <p className="text-white/60 text-xs mt-4">
//             We’ll remember your city for next time.
//           </p>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div className="text-center text-white/60 text-xs py-6">
//         Made with ❤️ by RK
//       </div>

//     </motion.div>
//   );
// }

// export default Welcome;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight } from "lucide-react";

function Welcome({ onSearch, onLocation }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // ⭐ NEW: local loader

  // ⭐ Wrap onSearch to show loader inside welcome screen
  const handleSearch = (text) => {
    setLoading(true);
    setTimeout(() => onSearch(text), 200); 
  };

  const handleLocation = () => {
  setLoading(true);

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      // send coordinates to app
      onSearch(`${lat},${lon}`);
    },
    () => {
      // stop loader on denied
      setLoading(false);
      alert("Location access denied");
    }
  );
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col justify-between relative"
      style={{
        background: `linear-gradient(
          180deg,
          #0A0F2C 0%,
          #4A3A4F 25%,
          #063A7A 55%,
          #1E6BD6 75%,
          #D94B2B 100%
        )`,
      }}
    >

      {/* ⭐ OVERLAY LOADER (no white screen) */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-black/10"
          >
            <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-white px-6 w-full max-w-md">

          {/* Glowing Icon */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mx-auto mb-6 w-28 h-28 flex items-center justify-center"
          >
            <img
              src="/icons/icon-512.png"
              alt="logo"
              className="w-28 h-28 rounded-full object-cover"
            />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-2 drop-shadow-md">
            RK Weather
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 mb-8 text-sm">
            Your realtime weather, anywhere in the world.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow-md px-4 py-3 mb-4 relative">
            <Search className="text-gray-500" size={20} />

            <input
              type="text"
              className="ml-2 w-full text-gray-800 outline-none bg-transparent pr-10"
              placeholder="Search city..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  handleSearch(input.trim());
                  setInput("");
                }
              }}
            />

            {/* ⭐ Arrow Button */}
            <AnimatePresence>
              {input.trim() !== "" && (
                <motion.button
                  key="arrow"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    handleSearch(input.trim());
                    setInput("");
                  }}
                  className="
                    absolute right-2 flex items-center justify-center 
                    shadow-md active:scale-95 text-white
                    w-10 h-10 rounded-full bg-blue-500
                    sm:w-auto sm:h-auto sm:px-4 sm:py-2 
                  "
                >
                  <ArrowRight size={20} strokeWidth={2.6} />
                </motion.button>
              )}
            </AnimatePresence>

          </div>

          {/* Location Button */}
          <button
            onClick={handleLocation}
            className="w-full bg-white/20 backdrop-blur-lg border border-white/40 rounded-full py-3 
                       flex items-center justify-center gap-2 shadow-lg active:scale-95 
                       transition text-white font-medium"
          >
            <MapPin size={18} />
            Use My Current Location
          </button>

          {/* Mini Text */}
          <p className="text-white/60 text-xs mt-4">
            We’ll remember your city for next time.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-white/60 text-xs py-6">
        Made with ❤️ by RK
      </div>

    </motion.div>
  );
}

export default Welcome;