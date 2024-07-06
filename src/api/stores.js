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

const getStoresByNameService = (token, name) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + `/store/name/${name}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const getStoresByDepartmentService = (token, department) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + `/store/department/${department}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const getStoresByMunicipalityService = (token, municipality) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + `/store/municipality/${municipality}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const deleteStore = (token, id) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(baseURL + `/store/${id}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const updateStoreService = (token, data) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(baseURL + "/store/", data, config)
      .then((response) => {
        resolve(response.data.message);
        toast.success("Tienda actualizada!");
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

export { createStoreService, getAllStoresService, getStoresByNameService, getStoresByDepartmentService, getStoresByMunicipalityService, deleteStore, updateStoreService  };
