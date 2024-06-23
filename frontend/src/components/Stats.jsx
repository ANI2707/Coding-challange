import React, { useEffect, useState } from "react";
import { useMonth } from "../../providers/MonthContext";
import { months } from "../../constants/monthMap";

const Stats = () => {
  const [statsResult, setStatsResult] = useState(null);
  const { selectedMonth } = useMonth();
    
  

  useEffect(() => {
    const fetchStats = async () => {
      const data = await fetch(
        `http://localhost:5000/api/products/statistics?month=${selectedMonth}`
      );
      const json = await data.json();
      setStatsResult(json);
    };
    fetchStats();

    if (selectedMonth !== null) {
      fetchStats();
    }
  }, [selectedMonth]);

  return (
    <div className="h-screen dark:bg-gray-900">
      <div className="pt-12 bg-gray-50 dark:bg-gray-900 sm:pt-20">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10">
              Transaction stats of{" "}
              <span className="text-indigo-600">{months[selectedMonth-1]}</span>
            </h2>
          </div>
        </div>
        <div className="pb-12 mt-10 bg-gray-50 dark:bg-gray-900 sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50 dark:bg-gray-900"></div>
            <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col p-6 text-center border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Total sale
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100">
                      {statsResult?.totalSale}₹
                    </dd>
                  </div>
                  <div className="flex flex-col p-6 text-center border-t border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Total sold item
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100">
                      {statsResult?.totalSoldItems}
                    </dd>
                  </div>
                  <div className="flex flex-col p-6 text-center border-t border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Total not sold item
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold leading-none text-indigo-600 dark:text-indigo-100">
                      {statsResult?.totalNotSoldItems}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
