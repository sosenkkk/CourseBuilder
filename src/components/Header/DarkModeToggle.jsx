import { useState, useEffect } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" 
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button className="hover:opacity-100 opacity-75" onClick={toggleDarkMode}>
      {isDarkMode ? <BsSunFill color="white" /> : <BsMoonFill color="black" />}
    </button>
  );
}
