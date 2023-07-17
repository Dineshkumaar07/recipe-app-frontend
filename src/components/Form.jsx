import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ onSubmit, message }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        className="flex flex-col mt-9 font-poppins"
      >
        <input
          {...register("username", { required: "this is required" })}
          type="text"
          placeholder="Username"
          className="rounded-sm px-1 py-1  focus:outline-none"
        />
        <p className="mb-1 text-red-600 sm:mb-3">{errors.username?.message}</p>
        <input
          {...register("password", { required: "this is required" })}
          type="password"
          placeholder="Password"
          className="rounded-sm px-1 py-1  mt-2 focus:outline-none"
        />
        <p className="mb-1 text-red-600 sm:mb-3">{errors.password?.message}</p>
        <input
          type="submit"
          className="cursor-pointer px-5 py-1 mt-9 bg-black text-white rounded-xl font-bold hover:bg-white hover:text-black duration-200 hover:drop-shadow-[0px_3px_20px_rgba(0,0,0,0.25)] hover:border-3"
        />
      </form>
      <p className="text-red-600 mt-3">{message}</p>
    </div>
  );
};

export default Form;
