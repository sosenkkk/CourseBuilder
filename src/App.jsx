import "./App.css";
import NavBar from "./components/Header/Navbar";
import CourseBuilder from "./components/Board";
import { useEffect } from "react";
import initialData from "./data/data.json";

function App() {
  const fetchEntireData = async () => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(initialData));
    }
  };
  useEffect(() => {
    fetchEntireData();
  }, []);

  return (
    <>
      <div className="bg-[#f9f9f9] pb-4 min-h-screen flex w-full justify-center transition-colors dark:bg-[#222222]">
        <div className="max-w-[1080px] relative relative mx-4 sm:mx-16  md:mx-28 lg:mx-36 w-full">
          <NavBar />
          <CourseBuilder />
        </div>
      </div>
    </>
  );
}

export default App;
