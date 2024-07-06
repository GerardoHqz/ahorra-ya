import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080";

const getOneFavoriteService = (token, storeId) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + `/favorite/${storeId}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const getAllFavoritesService = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + `/favorite/`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const addFavoriteService = (token, data) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(baseURL + "/favorite/", data, config)
      .then((response) => {
        resolve(response.data.message);
        toast.success("Agregado a favoritos");
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const deleteFavoriteService = (token, storeId) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(baseURL + `/favorite/${storeId}`, config)
      .then((response) => {
        resolve(response.data);
        toast.success("Eliminado de favoritos");
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

export { getOneFavoriteService, getAllFavoritesService, addFavoriteService, deleteFavoriteService };
