import { CgMenuRightAlt } from "react-icons/cg";
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
        <div className="flex items-center justify-center gap-20 max-sm:gap-4 capitalize ">
          <div className="">
            <p className="font-semibold text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:text-cyan-500 max-sm:text-2xl">
              Transaction Dashboard
            </p>
          </div>
          <div className="text-[20px] text-[#00040f] dark:text-[#e1e1e1] ">
            <button onClick={handleTheme} className="text-3xl">
              {theme === "dark" ? (
                <HiMoon  />
              ) : (
                <HiSun  />
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Header;
