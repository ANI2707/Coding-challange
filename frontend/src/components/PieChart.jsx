import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

import { months } from "../constants/monthMap";
import { useMonth } from "../providers/MonthContext";
const PieChart = () => {
  const [categories, setCategories] = useState([]);
  const { selectedMonth } = useMonth();
  useEffect(() => {
    const categoriesData = async () => {
      const data = await fetch(
        `https://roxiler-systems-assessment-backend.onrender.com/api/products/piechart?month=${selectedMonth}`
      );
      const json = await data.json();
      setCategories(json);
    };
    categoriesData();
  }, [selectedMonth]);

  return (
    <div className="max-h-fit dark:bg-gray-900">
      <div className="pt-12 bg-gray-50 dark:bg-gray-900 sm:pt-20">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10">
            Products Categories for {" "}
              <span className="text-indigo-600">
                {months[selectedMonth - 1]}
              </span>
            </h2>
          </div>
        </div>
        <div className="relative max-w-screen-sm py-6 px-4 mx-auto sm:px-6 lg:px-8">
          <Pie
            data={{
              labels: categories.map((data) => data.label),
              datasets: [
                {
                  label: "Items",
                  data: categories.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(6, 208, 1, 0.8)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
