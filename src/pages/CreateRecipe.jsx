import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const CreateRecipe = () => {
  const userId = useGetUserId();
  const navigate = useNavigate();
  const [cookies, _] = useCookies()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredient",
  });
  return (
    <div>
      <div className="w-full h-screen flex flex-col items-center justify-center font-poppins gap-9">
        <h1 className="font-bold text-xl">Create Recipe</h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(async (data) => {
            try {
              const ingredient = (item) => {
                return item.ingredient;
              };
              const ingredients = data.ingredient.map(ingredient);
              
              console.log({
                cookingTime: data.cookingTime,
                image: data.image,
                ingredient: ingredients,
                instructions: data.instructions,
                name: data.name,
                userOwner: userId,
              });

              await axios.post("https://recipe-app-backend-aaoe.onrender.com/recipe/", {
                cookingTime: data.cookingTime,
                image: data.image,
                ingredient: ingredients,
                instructions: data.instructions,
                name: data.name,
                userOwner: userId,
              },{headers : {authorization: cookies.access_token}});
              navigate("/");
            } catch (error) {
              console.error(error);
            }
          })}
        >
          <input
            {...register("name", { required: "this is required" })}
            type="text"
            placeholder="Name"
            className="rounded-sm px-1 py-1  focus:outline-none"
          />
          <p className="mb-1 text-red-600 sm:mb-3">{}</p>
          <div className="flex flex-col gap-1 ">
            {fields.map(({ id }, index) => {
              return (
                <div>
                  <input
                    key={id}
                    type="text"
                    placeholder="Ingredient"
                    {...register(`ingredient.${index}.ingredient`)}
                    className="rounded-sm px-1 py-1  focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="cursor-pointer px-5 py-1 mt-3 bg-black text-white rounded-xl font-bold hover:bg-white hover:text-black duration-200 hover:drop-shadow-[0px_3px_20px_rgba(0,0,0,0.25)] hover:border-3 text-sm"
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => append({ ingredient: "" })}
              className="my-2 cursor-pointer px-5 py-1 mt-3 bg-black text-white rounded-xl font-bold hover:bg-white hover:text-black duration-200 hover:drop-shadow-[0px_3px_20px_rgba(0,0,0,0.25)] hover:border-3 text-sm"
            >
              Add Ingredient
            </button>
          </div>
          <textarea
            {...register("instructions", { required: "this is required" })}
            placeholder="Instructions"
            className="rounded-sm px-1 py-1  focus:outline-none"
          />
          <p className="mb-1 text-red-600 sm:mb-3">{}</p>
          <input
            {...register("image", { required: "this is required" })}
            type="text"
            placeholder="Image Url"
            className="rounded-sm px-1 py-1  focus:outline-none"
          />

          <input
            {...register("cookingTime", { required: "Fill all fields" })}
            type="text"
            placeholder="Cooking Time (min)"
            className="rounded-sm px-1 py-1  focus:outline-none"
          />
          <p className="mb-1 text-red-600 sm:mb-3">
            {errors.cookingTime?.message ||
              errors.image?.message ||
              errors.instructions?.message ||
              errors.name?.message}
          </p>
          <input
            type="submit"
            className="cursor-pointer px-5 py-1 mt-3 bg-black text-white rounded-xl font-bold hover:bg-white hover:text-black duration-200 hover:drop-shadow-[0px_3px_20px_rgba(0,0,0,0.25)] hover:border-3"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
