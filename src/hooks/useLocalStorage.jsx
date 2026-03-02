import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  let [value, setValue] = useState(() => {
    let stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  },[key,value])

  return [value, setValue];
}
