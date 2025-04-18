
import { fetchTransactions } from "@/lib/api";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  })



  return { transactions };
};

export default useFetch;
