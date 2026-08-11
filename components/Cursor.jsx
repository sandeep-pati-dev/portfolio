"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only run cursor logic on desktops (touch devices don't use cursors)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    let rafId;

    const onMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const loop = () => {
      if (!hover) {
        const ease = 0.12;
        cursorPos.x += (mousePos.x - cursorPos.x) * ease;
        cursorPos.y += (mousePos.y - cursorPos.y) * ease;
        cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    const onMouseOver = (e) => {
      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      if (element.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        cursorPos.x = rect.left;
        cursorPos.y = rect.top;
        cursor.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    const cursorElements = document.querySelectorAll("[data-cursor]");
    cursorElements.forEach((el) => {
      el.addEventListener("mouseover", onMouseOver);
      el.addEventListener("mouseout", onMouseOut);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      cursorElements.forEach((el) => {
        el.removeEventListener("mouseover", onMouseOver);
        el.removeEventListener("mouseout", onMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef} />;
}
