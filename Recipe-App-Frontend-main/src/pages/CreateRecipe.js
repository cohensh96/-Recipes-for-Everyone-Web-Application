import { useState } from "react";
import { FaArrowRight, FaPlusCircle, FaTrash } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RecipeInstructions from "./RecipeInstructions";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/***
 * Component for creating a recipe.

  This component allows users to create their own recipes by providing
  details such as recipe name, description, calories per serving, cooking time,
  difficulty level, ingredients, and category.
  Users can add and remove ingredients and categories dynamically.
  Once the recipe is created, the component navigates to the newly created recipe page.

  Functions:

      handleSubmit: Handles the form submission by sending a POST request to create a new recipe. Navigates to the created recipe page upon success.
      handleDeleteCategory: Removes the specified category from the recipeCategories state.
      handleDelete: Removes the specified ingredient from the recipeIngredients state.
      handleCategoryAdd: Adds a new category to the recipeCategories state.
      handleAdd: Adds a new ingredient to the recipeIngredients state.

  Props:

      None

  Returns:

      The create recipe component.
 */
const CreateRecipe = () => {
  // Custom hooks
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // State variables
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [recipeCallories, setRecipeCalloires] = useState("");
  const [recipeCooking, setRecipeCooking] = useState("");
  const [category, setCategory] = useState("");
  const [recipeCategories, setRecipeCategory] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [ingredient, setIngredient] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("recipeingredients", recipeIngredients);
    formData.set("recipecatagorys", recipeCategories);
    console.log(formData.get("recipename"));

    const data = {
      recipename: formData.get("recipename"),
      recipedescription: formData.get("recipedescription"),
      recipeingredients: recipeIngredients,
      recipedifficulty: formData.get("recipedifficulty"),
      recipecallories: formData.get("recipecallories"),
      recipecatagorys: recipeCategories,
      recipeTime: formData.get("recipeTime"),
      uploadedImage: formData.get("uploadedImage"),
    };

    try {
      // Use toast.promise to display loading and success/error messages
      const response = await toast.promise(
        axiosPrivate.post("/recipe", data, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          pending: 'Recipe creation is pending',
          success: 'Recipe has been created 👌',
          error: 'Request has been denied, try again later'
        },
      );

      // Navigate to the created recipe page
      navigate(`/recipe/${response.data._id}`);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const handleDeleteCategory = (deleteItem) => {
    // Remove the specified category from the recipeCategories state
    setRecipeCategory((oldValues) => {
      return oldValues.filter((item) => item !== deleteItem);
    });
  };

  const handleDelete = (deleteItem) => {
    // Remove the specified ingredient from the recipeIngredients state
    setRecipeIngredients((oldValues) => {
      return oldValues.filter((item) => item !== deleteItem);
    });
  };

  const handleCategoryAdd = (event) => {
    if (!recipeCategories) {
      setRecipeCategory([category]);
      return;
    }
    if (category === "") {
      return;
    }

    // Check if the category already exists in the recipeCategories state
    const duplicate = recipeCategories.find(
      (singleCategory) => singleCategory === category
    );

    if (!duplicate) {
      // Add the category to the recipeCategories state
      setRecipeCategory([...recipeCategories, category]);
    }
  };

  const handleAdd = (event) => {
    if (!recipeIngredients) {
      setRecipeIngredients([ingredient]);
      return;
    }
    if (ingredient === "") {
      return;
    }

    // Check if the ingredient already exists in the recipeIngredients state
    const duplicate = recipeIngredients.find(
      (singleIngredient) => singleIngredient === ingredient
    );

    if (!duplicate) {
      // Add the ingredient to the recipeIngredients state
      setRecipeIngredients([...recipeIngredients, ingredient]);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto mt-20 rounded-md shadow-md">
      <ToastContainer></ToastContainer>
      <div className="relative px-6 lg:px-8">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://recipes.lionix.io/images/ai-recipe-logo.svg"
                alt="Your Company"
              ></img>
              <h1 className=" text-4xl mt-6 text-center  font-bold tracking-tight text-gray-900">
                Creating Your Own Recipe
              </h1>
              <p className="mt-2 text-center text-sm text-gray-600">
                <span className="font-bold text-md text-orange-500 hover:text-orange-700">
                  The best recipes are the ones that are passed down from
                  generation to generation.
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-1xl mt-6 text-center font-bold tracking-tight text-gray-900">
                Want to create your own delicious recipe? Here’s how!
              </h3>
              <div className="items-center justify-center  sm:px-9 lg:px-9">
                <button
                  className="text-white bottom-2.5 bg-orange-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-black rounded-lg text-sm px-4 py-2
      text-1xl mt-6 text-center font-bold tracking-tight "
                  onClick={() => setIsShown(!isShown)}
                >
                  {isShown ? "Hide Steps" : "Show Steps"}
                </button>
                <RecipeInstructions isShown={isShown} />
              </div>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <section className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <label
                    htmlFor="recipename"
                    className="font-bold tracking-tight text-gray-900"
                  >
                    Recipe Name
                  </label>
                  <input
                    className="py-3 px-5 block w-full border  border-gray-300 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500
                               my-2 text-gray-700 bg-white  outline-none "
                    type="text"
                    name="recipename"
                    id="recipename"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    placeholder="Enter Recipe Name"
                    required
                    
                  />
                </div>
              </section>
              <div className="mb-4">
                <label
                  htmlFor="recipedescription"
                  className="font-bold tracking-tight text-gray-900"
                >
                  Recipe Description
                </label>
                <textarea
                  className="w-full p-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-500"
                  name="recipedescription"
                  id="recipedescription"
                  rows="8"
                  placeholder="Enter Recipe Description"
                  value={recipeDesc}
                  onChange={(e) => setRecipeDesc(e.target.value)}
                ></textarea>
              </div>
              <section className="grid grid-cols-3 gap-6 mt-4">
                <div>
                  <label
                    htmlFor="recipecallories"
                    className="font-bold tracking-tight text-gray-900"
                  >
                    Recipe Callories
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-orange-500 outline-none "
                    type="text"
                    name="recipecallories"
                    id="recipecallories"
                    value={recipeCallories}
                    onChange={(e) => setRecipeCalloires(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="recipetime"
                    className="font-bold tracking-tight text-gray-900"
                  >
                    Cooking Time
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-orange-500 outline-none "
                    type="text"
                    name="recipeTime"
                    id="recipeTime"
                    value={recipeCooking}
                    onChange={(e) => setRecipeCooking(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="recipedifficulty"
                    className="font-bold tracking-tight text-gray-900"
                  >
                    Recipe Difficutly
                  </label>
                  <select
                    name="recipedifficulty"
                    id="recipedifficulty"
                    className="bg-gray-50 px-4 py-2 mt-2 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </section>
              <section className="grid grid-cols-5 gap-6 mt-4 ">
                <div className="col-span-3">
                  <label
                    htmlFor="recipeingredients"
                    className="font-bold tracking-tight text-gray-900"
                  >
                    Recipe Ingredients
                  </label>
                  <input
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-500"
                    type="text"
                    name="recipeingredients"
                    id="recipeingredients"
                    placeholder="Enter Recipe Ingredient"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className=" h-12 mt-6 text-gray-800 transition-colors duration-150 font-bold rounded border-b-2 border-amber-500 hover:border-orange-600 hover:bg-orange-500 hover:text-white shadow-xl py-2 px-6 inline-flex items-center"
                    onClick={() => handleAdd()}
                  >
                    <span className="mr-2">Add</span>
                    <FaPlusCircle />
                  </button>
                </div>
              </section>
              <section>
                <ul className="flex flex-wrap">
                  {recipeIngredients &&
                    recipeIngredients.map((singleing, index) => (
                      <button
                        className="bg-amber-300 transition-colors duration-150 hover:bg-orange-500 text-white py-2 px-4 rounded inline-flex items-center m-1"
                        key={index}
                        onClick={() => handleDelete(singleing)}
                      >
                        {singleing} <FaTrash className="ml-1" />
                      </button>
                    ))}
                </ul>
              </section>
              <section className="grid grid-cols-5 gap-6 mt-4 mb-4">
                <div className="col-span-3">
                  <label
                    htmlFor="recipecatagorys"
                    className="font-bold tracking-tight text-gray-900"
                  >
                    Recipe Catgory
                  </label>
                  <input
                    className="w-full p-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-500"
                    type="text"
                    name="recipecatagorys"
                    id="recipecatagorys"
                    placeholder="Enter Recipe Catgory"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className=" h-12 mt-6 text-gray-800 transition-colors duration-150 font-bold rounded border-b-2 border-amber-500 hover:border-orange-600 hover:bg-orange-500 hover:text-white shadow-xl py-2 px-6 inline-flex items-center"
                    onClick={() => handleCategoryAdd()}
                  >
                    <span className="mr-2">Add</span>
                    <FaPlusCircle />
                  </button>
                </div>
              </section>
              <section>
                <ul className="flex flex-wrap">
                  {recipeCategories &&
                    recipeCategories.map((singleing, index) => (
                      <button
                        className="bg-orange-300 transition-colors duration-150 hover:bg-orange-500 text-white py-2 px-4 rounded inline-flex items-center m-1"
                        key={index}
                        onClick={() => handleDeleteCategory(singleing)}
                      >
                        {singleing} <FaTrash className="ml-1" />
                      </button>
                    ))}
                </ul>
              </section>

              <label htmlFor="uploadImage">Upload Image</label>
              <input type="file" name="uploadedImage" id="file" required/>

              <button
                type="submit"
                className="h-12 mt-6 text-gray-800 font-bold transition-colors duration-150 rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-xl py-2 px-6 inline-flex items-center"
              >
                Create <FaArrowRight className="ml-1" />
              </button>
              {errorMsg && <p className="text-red-500 font-bold text-1xl mt-5">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
