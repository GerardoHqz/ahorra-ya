import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "http://localhost:8080/offer/";

const getOfferById = (token, idTienda) => {
    console.log(idTienda)
    return new Promise((resolve, reject) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(baseURL, {
            params:{
                id: idTienda
            }
          }, config)
          .then((response) => {
            resolve(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            reject(error);
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
          .get(baseURL, config)
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

export { getOfferById, getOfferAll };