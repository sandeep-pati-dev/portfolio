"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function Loader({ fullScreen = true }) {
  const { theme } = useTheme();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const containerClasses = fullScreen
    ? `fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md`
    : `w-full h-full flex flex-col items-center justify-center py-10`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={containerClasses}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Glow effect in background */}
        <div className={`absolute -inset-16 -z-10 rounded-full blur-[64px] opacity-25 transition-all duration-500
          ${theme === "light" 
            ? "bg-cyan-500/60" 
            : "bg-emerald-500/60"
          }`}
        />
        
        {/* Animated Custom Loader */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Inner ring spinning clockwise */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className={`absolute w-16 h-16 rounded-full border-4 border-t-transparent border-r-transparent
              ${theme === "light" ? "border-cyan-500" : "border-emerald-500"}`}
          />
          {/* Middle ring spinning counter-clockwise */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
            className={`absolute w-20 h-20 rounded-full border-2 border-b-transparent border-l-transparent
              ${theme === "light" ? "border-blue-500/75" : "border-teal-500/75"}`}
          />
          {/* Outer pulsing dashed ring */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className={`absolute w-24 h-24 rounded-full border border-dashed
              ${theme === "light" ? "border-cyan-400/50" : "border-emerald-400/50"}`}
          />
          {/* Logo center mark */}
          <motion.div 
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-20 absolute"
          >
            <img src="/mypic.jpeg" alt="Logo" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Text */}
        <div className="text-center mt-2">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-xl font-black tracking-wider bg-gradient-to-r bg-clip-text text-transparent
              ${theme === "light" 
                ? "from-[#2563eb] via-[#3b82f6] to-[#06b6d4]" 
                : "from-[#10b981] via-[#059669] to-[#047857]"
              }`}
          >
            Sandeep Pati
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className={`text-[11px] mt-1.5 font-mono tracking-[0.2em] uppercase font-bold
              ${theme === "light" ? "text-slate-500" : "text-gray-400"}`}
          >
            Loading Resources{dots}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
