import { motion } from "framer-motion";

export default function BlurLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50"
    >
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    </motion.div>
  );
}