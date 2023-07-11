import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);

  async function getApiData() {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getApiData();
  }, [url]);

  return data;
};
