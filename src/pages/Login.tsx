import React, { useState, ChangeEvent, FormEvent } from "react";
import logo from "../assets/img/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../interfaces/LoginFormData";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Username:', formData.username);
        console.log('Password:', formData.password);
        navigate("/");
    };

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) =>
          console.log(tokenResponse.access_token)
      });

    return (
        <div className="relative bg-gradient-to-b from-[#FF8E9D] to-[#FFA48B] h-screen flex flex-col justify-center items-center overflow-hidden">
            <form onSubmit={handleSubmit} className="absolute bg-white w-[70vw] h-[70%] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden text-white z-20 shadow-[-12px_12px_11px_0px_#F9546B]">
                <div className="flex justify-center items-center">
                    <img src={logo} alt="logo" className="w-2/4" />
                </div>
                <div className="flex flex-col justify-evenly items-center bg-[#F9546B] rounded-2xl">
                    <div>
                        <h1 className="text-3xl">Inicio de sesión</h1>
                        <h2 className="text-center">¡Bienvenido!</h2>
                    </div>
                    <div className="w-3/5">
                        <p>usuario</p>
                        <input
                            type="text"
                            name="username"
                            className="w-full p-2 border border-white bg-transparent rounded-md"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <p className="pt-5">contraseña</p>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 border border-white bg-transparent rounded-md"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-3/5 flex flex-col">
                        <button type="submit" className="bg-[#FF8E9D] py-3 rounded-lg mb-3">
                            Iniciar Sesión
                        </button>
                        <button className="bg-white text-black p-3 rounded-lg relative" onClick={() => login()}>
                            <span className="absolute z-10 left-3">
                                <FcGoogle size={25} />
                            </span>
                            Iniciar sesión con Google
                        </button>
                    </div>
                </div>
            </form>
            <span className="rounded-full size-[30vw] bg-white opacity-25 absolute -bottom-[20%] -left-20 z-10"></span>
            <span className="rounded-full size-[30vw] bg-white opacity-25 absolute -top-[30%] -right-40 z-10"></span>
            <span className="rounded-full size-[20vw] bg-white opacity-25 absolute top-[10%] -right-40 z-10"></span>
        </div>
    );
};

export default Login;
