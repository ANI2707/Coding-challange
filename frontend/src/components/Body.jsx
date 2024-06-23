import React from "react";
import Stats from "./Stats";
import Table from "./Table";
import { useMonth } from "../providers/MonthContext";

const Body = () => {
    const {selectedMonth}=useMonth()
  return (
    <div className="h-screen">
      
      {selectedMonth !=="" && (
        <>
          <Stats />
        </>
      )}
      {selectedMonth === "" && (
        <div className=" max-w-4xl mx-auto my-32 text-center">
          <h2 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10">
            Please Select <span className="text-indigo-600">Month🗓️</span> to
            Display Statistics
          </h2>
        </div>
      )}
      
    </div>
  );
};

export default Body;
