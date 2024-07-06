import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "http://localhost:8080/";

const createOfferService = (token, data) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(baseURL + "offer/", data, config)
      .then((response) => {
        resolve(response.data.message);
        toast.success("Oferta agregada!");
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};


const getOfferByStore = (token, id) => {
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
      .get(baseURL + "offer/", config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const getOffersByName = (token, name) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + `offer/name/${name}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const deleteOffer = (token, id) => {
  return new Promise((resolve, reject)=>{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(baseURL + `offer/${id}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  })
}

const updateOffer = (token, data) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(baseURL + "offer/", data, config)
      .then((response) => {
        resolve(response.data.message);
        toast.success("Oferta actualizada");
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

export { createOfferService, getOfferByStore, getOfferAll, getOffersByName, deleteOffer, updateOffer };
