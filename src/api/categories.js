import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080";

const getAllCategoriesService = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + "/category/", config)
      .then((response) => {
        console.log("si funciona")
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};


export { getAllCategoriesService };