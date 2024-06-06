import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080";

const getAllMunicipalitiesService = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + "/municipality/", config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};


export { getAllMunicipalitiesService };