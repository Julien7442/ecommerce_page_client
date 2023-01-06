import axios from "axios";


// create an object to hold headers for the API request
const params = {
    headers: {
      Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
    },
  };
  
  // define the fetchDataFromApi function, which makes a GET request to the specified URL using axios
  export const fetchDataFromApi = async (url) => {
    try {
      // make the GET request and destructure the data from the response
      const { data } = await axios.get(
        process.env.REACT_APP_STRIPE_APP_DEV_URL + url,
        params
      );
      // return the data
      return data;
    } catch (err) {
      // if there is an error, log it and return the error object
      console.log(err);
      return err;
    }
  };
  
  // create an axios instance with the base URL and headers for the API request
  export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
    headers: {
      Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
    },
  });