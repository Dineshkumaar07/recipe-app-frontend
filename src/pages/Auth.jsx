import React from "react";
import Form from "../components/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="font-bold text-2xl">Welcome</h1>
      <div className="w-3/4 h-80 flex justify-evenly items-center">
        <Register />
        <Login />
      </div>
    </div>
  );
};

const Register = () => {
  const [message, setMessage] = useState("");
  const onSubmit = async (data) => {
    const response = await axios.post(
      "http://localhost:3001/auth/register",
      data
    );
    setMessage(response.data.message);
    console.log(response.data.message);
  };
  return (
    <div className="border-r-2 border-black/60 pr-56">
      <h1 className="font-bold text-xl text-center">Register</h1>
      <Form onSubmit={onSubmit} message={message} />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        data
      );

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1 className="font-bold text-xl text-center">Login</h1>
      <Form onSubmit={onSubmit} />
    </div>
  );
};

export default Auth;
