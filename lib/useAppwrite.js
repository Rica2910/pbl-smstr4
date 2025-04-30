import { Alert } from "react-native";
import React, { useEffect, useState } from "react";

const useAppwrite = (fetch) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch();

        setData(response);
      } catch (error) {
        Alert.alert("error", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  });

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
