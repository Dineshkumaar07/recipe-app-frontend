import React from "react";
import { useState, useEffect } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import axios from "axios";

const SavedRecipes = () => {
  
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();

  // const isSaved = (recipeId) => savedRecipes.includes(recipeId);

  useEffect(() => {

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-backend-aaoe.onrender.com/recipe/savedrecipe/${userId}`
        );

        setSavedRecipes(response.data.savedRecipes);
        
      } catch (error) {
        console.log(error);
      }
    };

    
    fetchSavedRecipes();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center font-poppins  ">
      <h1 className="font-bold text-2xl">Saved Recipes</h1>
      <ul>
        {savedRecipes?.map((recipe) => (
          <li key={recipe._id}className="max-w-4xl">
            <div className="flex  gap-3 mt-3 border-4 border-black p-3 hover:shadow-md">
              <div className="flex items-center justify-center">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-[250px]  h-40"
                />
              </div>
              <div className="w-3/4">
                <h1 className="font-bold text-xl ">{recipe.name}</h1>
                <p>{recipe.instructions}</p>
                <p>Cooking time : {recipe.cookingTime} (min)</p>
                {/* <button
                  onClick={() => {
                    saveRecipe(recipe._id);
                  }}
                  disabled={isSaved(recipe._id)}
                  className="my-2 cursor-pointer px-5 py-1 mt-3 bg-black text-white rounded-xl font-bold hover:bg-white hover:text-black duration-200 hover:drop-shadow-[0px_3px_20px_rgba(0,0,0,0.25)] hover:border-3 text-sm"
                >
                  {isSaved(recipe._id) ? "Saved" : "Save"}
                </button> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default SavedRecipes