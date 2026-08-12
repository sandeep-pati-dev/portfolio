"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Interactive loader shown while GLB downloads ─────────────── */
function AvatarLoader({ progress }) {
  const symbols = ["</>", "{ }", "[ ]", "=>", "fn()", "var", "new", "API"];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Floating code symbols */}
      {symbols.map((sym, i) => (
        <motion.span
          key={sym}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: [0, 0.35, 0],
            y: [40, -40],
            x: Math.sin(i * 45) * 80,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          className="absolute text-xs font-mono text-blue-400/60"
          style={{ left: `${15 + (i % 4) * 20}%`, bottom: "10%" }}
        >
          {sym}
        </motion.span>
      ))}

      {/* Outer spinning ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute w-52 h-52 rounded-full"
        style={{
          border: "1.5px dashed rgba(59,130,246,0.4)",
        }}
      />

      {/* Inner reverse ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-36 h-36 rounded-full"
        style={{
          border: "1.5px solid rgba(99,102,241,0.35)",
          boxShadow: "0 0 20px rgba(99,102,241,0.15)",
        }}
      />

      {/* Pulsing core */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-20 h-20 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Person silhouette outline (SVG) */}
      <motion.div
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute"
      >
        <svg width="64" height="90" viewBox="0 0 64 90" fill="none">
          <circle cx="32" cy="14" r="11" stroke="#3b82f6" strokeWidth="1.5" />
          <path
            d="M10 88 C10 60 20 48 32 48 C44 48 54 60 54 88"
            stroke="#3b82f6"
            strokeWidth="1.5"
            fill="none"
          />
          <line x1="32" y1="48" x2="32" y2="70" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="32" y1="55" x2="14" y2="68" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="32" y1="55" x2="50" y2="68" stroke="#3b82f6" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Scan line sweeping up */}
      <motion.div
        initial={{ y: 90 }}
        animate={{ y: -90 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        className="absolute w-52"
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)",
        }}
      />

      {/* Label */}
      <div className="absolute bottom-16 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-blue-400/70 font-mono mb-3">
          Loading Avatar
        </p>
        {/* Progress bar */}
        <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #2563eb, #06b6d4)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="mt-2 text-[10px] font-mono text-blue-300/50">
          {progress > 0 ? `${progress}%` : "Initialising…"}
        </p>
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────── */
export default function AvatarViewer() {
  const viewerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  /* model-viewer load / progress */
  useEffect(() => {
    import("@google/model-viewer").catch(() => {});
    const viewer = viewerRef.current;
    if (!viewer) return;
    const onLoad     = () => setIsLoaded(true);
    const onProgress = (e) => setProgress(Math.round((e.detail.totalProgress ?? 0) * 100));
    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("progress", onProgress);
    return () => {
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("progress", onProgress);
    };
  }, []);

  return (
    <div className="relative mt-4 flex w-full flex-col items-center sm:mt-6">
      <div
        className="relative h-[400px] w-[min(300px,calc(100vw-2.5rem))] cursor-grab sm:h-[430px]"
      >
        {/* Loader */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10"
            >
              <AvatarLoader progress={progress} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Avatar */}
        <motion.div
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <model-viewer
            ref={viewerRef}
            src="/my-avatar.glb"
            camera-controls
            disable-zoom
            disable-pan
            auto-rotate
            auto-rotate-delay="1500"
            rotation-per-second="20deg"
            shadow-intensity="1.5"
            shadow-softness="0.8"
            exposure="1.1"
            camera-orbit="0deg 80deg 100%"
            min-camera-orbit="auto auto 100%"
            max-camera-orbit="auto auto 100%"
            interaction-prompt="none"
            reveal="auto"
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              display: "block",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
