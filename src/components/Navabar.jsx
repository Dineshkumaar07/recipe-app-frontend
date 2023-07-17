import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navabar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };
  return (
    <div className="w-full h-max flex justify-around items-center text-lg  py-3 border-b-2 font-poppins z-1 sticky top-0 bg-white">
      <h1 className="font-bold  ">It's Cooking time</h1>
      <Link to="/" className="text-black/60 hover:text-black duration-200">
        Home
      </Link>

      {!cookies.access_token ? (
        <>

          <Link
            to="/auth"
            className="text-black/60 hover:text-black duration-200"
          >
            Login/register
          </Link>
        </>
      ) : (
        <>
        <Link
        to="/createRecipe"
        className="text-black/60 hover:text-black duration-200"
      >
        Create Recipe
      </Link>
      <Link
        to="/savedRecipes"
        className="text-black/60 hover:text-black duration-200"
      >
        Saved Recipes
      </Link>
        <button onClick={logout}>Logout</button></>
      )}
    </div>
  );
};

export default Navabar;
