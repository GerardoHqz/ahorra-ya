import React from "react";
import logo from "../assets/img/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-gradient-to-b from-[#FF8E9D] to-[#FFA48B] h-screen flex flex-col justify-center items-center">
            <div className="absolute bg-white w-[80vw] h-[80%] grid grid-cols-2 rounded-xl overflow-hidden text-white">
                <div className="flex justify-center items-center">
                    <img src={logo} alt="logo" className="w-9/12" />
                </div>
                <div className="flex flex-col justify-evenly items-center bg-[#F9546B]">
                    <h1 className="text-3xl">Inicio de sesión</h1>
                    <div className="w-8/12">
                        <p>usuario</p>
                        <input type="text" className="w-full p-2 border border-white bg-transparent rounded-md" />
                        <p className="pt-5">contraseña</p>
                        <input type="password" className="w-full p-2 border border-white bg-transparent rounded-md" />
                    </div>
                    <div className="w-8/12 flex flex-col">
                        <button className="bg-[#FF8E9D] p-2 rounded-md mb-5" onClick={()=>{navigate("/")}}>Iniciar Sesión</button>
                        <button className="bg-white text-black p-2 rounded-md relative" onClick={()=>{navigate("/")}}>
                            <span className="absolute z-10 left-3">
                                <FcGoogle size={25} />
                            </span>
                            Iniciar sesión con Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;