import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080";

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + `/auth/${email}`)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const signup = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(baseURL + "/auth/signup", data)
      .then((response) => {
        resolve(response.data);
        toast.loading("Usuario creado con éxito, redirigiendo...");
      })
      .catch((error) => {
        reject(
          error.response.data.username[0] || error.response.data.password[0]
        );
        toast.error(
          "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial"
        );
      });
  });
};

const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(baseURL + "/auth/login", data)
      .then((response) => {
        resolve(response.data.token);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error("Usuario o contraseña incorrectos");
      });
  });
};

export { getUserByEmail, signup, login };
