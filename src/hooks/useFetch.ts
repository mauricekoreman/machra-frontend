import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);

  async function getApiData() {
    try {
      const response = await fetch(url, { method: "GET" });
      // const data = response.json();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getApiData();
  }, [url]);

  return data;
};
