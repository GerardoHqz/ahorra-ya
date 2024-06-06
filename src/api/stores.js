import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080";

const createStoreService = (token, data) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(baseURL + "/store/", data, config)
      .then((response) => {
        resolve(response.data.message);
        toast.success("Tienda agregada!");
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const getAllStoresService = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + "/store/", config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

export { createStoreService, getAllStoresService };
