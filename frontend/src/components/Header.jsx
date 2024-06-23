import { FaGithub } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi";
import { useState, useEffect } from "react";

const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 py-10 max-sm:py-6  max-sm:max-h-[100px]">
        <div className="flex max-sm:flex-col items-center  max-sm:justify-center justify-between mx-20  md:gap-20 max-sm:gap-4 capitalize ">
          <div className="">
            <h2 className="text-2xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-3xl sm:leading-10">
              Transaction
              <span className="text-indigo-600 mx-2">Dashboard</span>
            </h2>
          </div>
          <div className=" flex gap-2 justify-center items-center text-[20px] text-[#00040f] dark:text-[#e1e1e1] ">
            <button onClick={handleTheme} className="text-3xl">
              {theme === "dark" ? <HiMoon /> : <HiSun />}
            </button>
            <a href="https://github.com/ANI2707/Coding-challange" target="_blank" className="text-3xl">
                <FaGithub />

              </a>
          </div>
          
        </div>
      </section>
    </>
  );
};
export default Header;
