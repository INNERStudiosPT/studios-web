"use client";

import { useEffect, useState } from "react";

const lisbonTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Europe/Lisbon",
});

export function LisbonClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(lisbonTimeFormatter.format(new Date()));
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return <time dateTime={time}>{time}</time>;
}
