import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "http://localhost:8080/";

const getOfferByStore = (token, id) => {
    console.log(id)
    return new Promise((resolve, reject) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(baseURL + `store/offers/${id}`, config)
          .then((response) => {
            resolve(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            reject(error);
            console.log("error",error)
            toast.error(error.response.data.message);
          });
      });
};

const getOfferAll = (token) => {
    return new Promise((resolve, reject) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(baseURL + "offer/", config)
          .then((response) => {
            resolve(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            reject(error.response.data.message);
            toast.error(error.response.data.message);
          });
      });
};

export { getOfferByStore, getOfferAll };