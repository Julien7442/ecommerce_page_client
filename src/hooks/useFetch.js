import { useEffect, useState } from "react";
// import the fetchDataFromApi function
import { fetchDataFromApi } from "../utils/api";

// define the useFetch hook
const useFetch = (endpoint) => {
  // create a state variable called 'data' and a function to update it, called 'setData'
  const [data, setData] = useState();

  // use the useEffect hook to call the makeApiCall function when the endpoint prop changes
  useEffect(() => {
    makeApiCall();
  }, [endpoint]);

  // define the makeApiCall function, which fetches data from the API using the fetchDataFromApi function and sets it in the 'data' state variable
  const makeApiCall = async () => {
    const res = await fetchDataFromApi(endpoint);
    setData(res);
  };

  // return the 'data' state variable
  return { data };
};

export default useFetch;
