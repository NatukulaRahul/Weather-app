import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#1A1F33]"
    >
      <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>

      <p className="text-white mt-6 text-xl opacity-80">
        Loading weather...
      </p>
    </motion.div>
  );
}