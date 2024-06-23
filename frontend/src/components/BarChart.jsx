import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { months } from "../constants/monthMap";
import { useMonth } from "../providers/MonthContext";

const BarChart = () => {
  const [priceRanges, setPriceRanges] = useState([]);

  const { selectedMonth } = useMonth();

  useEffect(() => {
    const priceRangeData = async () => {
      const data = await fetch(
        `http://localhost:5000/api/products/barchart?month=${selectedMonth}`
      );
      const json = await data.json();
      setPriceRanges(json);
    };
    priceRangeData();
  }, [selectedMonth]);

  return (
    <div className=" dark:bg-gray-900">
      <div className="pt-12 bg-gray-50 dark:bg-gray-900 sm:pt-20">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10">
              Products Price Ranges for{" "}
              <span className="text-indigo-600">
                {months[selectedMonth - 1]}
              </span>
            </h2>
          </div>
        </div>
        <div className="relative max-w-screen-md py-6 px-4 mx-auto sm:px-6 lg:px-8">
          <Bar
            data={{
              labels: priceRanges.map((data) => data.label),
              datasets: [
                {
                  label: "Product Count",
                  data: priceRanges.map((data) => data.value),
                  backgroundColor: ["rgba(43, 63, 229, 0.8)"],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Product Count",
                  },
                  ticks: {
                    beginAtZero: true, // Start the axis at zero
                    stepSize: 1, // Customize the step size between ticks
                    // Include other tick options as needed
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
