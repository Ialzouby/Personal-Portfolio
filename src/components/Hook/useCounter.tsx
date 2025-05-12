"use client";
import { useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState<number>(1);

  const increment = () => {
    setCount(count + 1);
  };
  const discrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return { count, increment, discrement };
};

export default useCounter;
