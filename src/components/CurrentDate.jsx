
"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(currentDate);
  }, []);

  return <span>{date}</span>;
}
