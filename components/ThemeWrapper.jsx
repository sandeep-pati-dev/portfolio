'use client';

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast, Toaster } from "sonner";
import styles from "@/components/AnimatedBackground.module.css";
import { Info } from "lucide-react";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import { AnimatePresence } from "framer-motion";


export default function ThemeWrapper({ children }) {
 const { theme } = useTheme(); 
 const pathname = usePathname();
 const [isNavigating, setIsNavigating] = useState(false);


 const mounted = useRef(false); // for toast else it will show error in mounted ans if not use mounted it shows duplicate toast
  useEffect(() => {
    setTimeout(() => {
      if (!mounted.current) {
        toast.info("Try a different mode for better UI Experiance",{
          icon: <Info/>,
          className: "custom-toast",
        });
        mounted.current = true; // ensures it only fires once
      }
    }, 7000);
  }, []);

  // Reset navigating state when pathname changes
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // Intercept local link navigation clicks to trigger loading state immediately
  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");

      if (href && href.startsWith("/") && !href.startsWith("/#") && target !== "_blank") {
        const destinationPath = href.split("#")[0];
        if (destinationPath !== pathname) {
          setIsNavigating(true);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);



  return (
    <>
    <Toaster/>
    <Cursor/>

    <AnimatePresence mode="wait">
      {isNavigating && <Loader fullScreen={true} />}
    </AnimatePresence>

      <div className={`flex justify-center items-center w-full ${theme === 'light'? "" : 'text-white'}`}>
        <Navbar />
      </div>

      <div className="min-h-screen w-full relative overflow-hidden transition-colors duration-500">
        {/* Background depending on theme */}
        {theme === "light" ? (
          // <div
          //   className="absolute inset-0 z-0 pointer-events-none"
          //   style={{
          //     backgroundImage: `radial-gradient(circle at center, #10b981, transparent)`,
          //     backgroundSize: "100% 100%",
          //   }}
          // />
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, #ec4899, transparent)`,
              backgroundSize: "100% 100%",
              background: `radial-gradient(circle at center, #ec4899, transparent)`
            }}
            
          >
            <div className={styles.context}>
              <div className={styles.area}>
                <ul className={styles.circles}>
                  {[...Array(10)].map((_, index) => (
                    <li
                      key={index}
                      className={styles[`animate-circle-${index + 1}`]}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, #8b5cf6, transparent)`,
              backgroundSize: "100% 100%",
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
            }}
          >
            <div className={styles.context}>
              <div className={styles.area}>
                <ul className={styles.circles}>
                  {[...Array(10)].map((_, index) => (
                    <li
                      key={index}
                      className={styles[`animate-circle-${index + 1}`]}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <div className={`relative ${theme === 'light'? "" : 'text-white'}`}>{children}</div>
      </div>

      <Footer />
    </>
  );
}