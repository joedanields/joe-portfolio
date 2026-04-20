"use client";

import { useEffect, useRef, useState } from "react";

const chars = "▓▒░█01ABCDEF";
const REVEAL_SPEED = 0.5;

export function TextScramble({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  }, []);

  const scramble = () => {
    let frame = 0;
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => (index < frame ? char : chars[Math.floor(Math.random() * chars.length)]))
          .join("")
      );
      frame += REVEAL_SPEED;
      if (frame >= text.length) {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        setDisplay(text);
      }
    }, 34);
  };

  return (
    <span className="font-semibold tracking-wide" onMouseEnter={scramble}>
      {display}
    </span>
  );
}
