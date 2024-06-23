import { useEffect, useState } from "react"

export const getProductsStats = async(month)=>{
    const [stats,setStats]=useState();


    useEffect(()=>{
        const fetchStats=async()=>{
            const data=await fetch(`http://localhost:5000/api/products/statistics?month=${month}`);
            const json=await data.json();
            setStats(json);
            // console.log(stats)
        }
        fetchStats();
    },[])

    return {stats};
}