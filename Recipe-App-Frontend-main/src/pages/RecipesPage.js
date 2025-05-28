import { NavLink } from "react-router-dom";
import {FaClock} from 'react-icons/fa';
import useImage from '../hooks/useImage';
import useAxios from '../hooks/useAxios';
import axios from "../api/axios";

/**
 * RecipesPage component displays a list of recipes.
 */
const RecipesPage = () => {
  const getImage = useImage;

  // Fetch recipe data
  const [recipes,error,isLoading] = useAxios({
    axiosInstance: axios,
    method:"GET",
    url: `recipe`,
    requestConfig: {
      'Content-Language': "en-US"
    }
  })
  return (
    <div className="sorted-recipes-layout allRecipes">
      <div className="bg-orange-500">
        <div className="pt-5 px-4 md:px-2 md:max-w-4xl mx-auto text-center"></div>
        <header className="pt-3 pb-12 px-4 md:pt-5 md:pb-28 md:px-2 md:max-w-4xl mx-auto text-center">
          <h1 className="text-center text-white text-5xl md:text-7xl mb-4 md:mb-8">
            Recipes
          </h1>
          <p className=" font-bold my-0 text-white md:text-xl">
            Dietary restrictions, weeknight dinners, meal prep recipes, some of
            our most tried-and-true… no matter how you browse, we’re sure you’ll
            find just what you were looking for.
          </p>
        </header>
      </div>

      {/* Recipes Section */}
      <section className="bg-white py-8 pb-8 pt-4 px-4 mx-auto md:max-w-5xl">
        <header className="max-w-xl md:mx-auto text-center">

          <div className="flex justify-center items-center space-x-2 mb-4 mt-4">
          <img className="mb-6" alt="recipe icon" src="../images/recipe-icon.png"></img>
            <h2 className="mb-6 font-sans font-bold tracking-widest text-2xl uppercase text-orange-500 m-0">
            All Recipes
            </h2>
          </div>
        </header>

       {/* Recipes List , display all the recipes*/}
        <div className="container mx-auto grid md:grid-cols-2 pt-4 pb-12">
          {isLoading && <p>Loading..</p>}
          {!isLoading && error && <p>{error}</p>}
          {recipes && !error &&
            !isLoading && 
              recipes.map((recipe) => (
          <div
          className="transition-all duration-150 flex w-full px-4 py-6 h-full"
          key={recipe._id}
        >
           {/* Recipe Card */}
          <div
            className="flex flex-col items-stretch w-full min-h-full pb-4 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl"
          >
            <div className="md:flex-shrink-0">
              {/* Recipe Image */}
              <img
                src={getImage(recipe.Image)}
                alt="Blog Cover"
                className=" object-cover w-full rounded-lg rounded-b-none md:h-56"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
              <span className="text-xs font-medium text-blue-600 uppercase">
                {recipe.recipeDifficulty}
              </span>
              <div className="flex flex-row items-center">
                <div
                  className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                  <span>{recipe.recipeComments}</span>
                </div>
      
                <div
                  className="text-xs font-medium text-gray-500 flex flex-row items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    ></path>
                  </svg>
                  <span>{recipe.recipeRating}</span>
                </div>
              </div>
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
              <NavLink to={`/recipe/${recipe._id}`} state={{id:recipe._id}} className="hover:underline">
                <h2 className="text-2xl font-bold tracking-normal text-gray-800">
                  {recipe.recipeName}
                </h2>
              </NavLink>
            </div>
            <hr className="border-gray-300" />
            <p
              className="flex flex-col flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700"
            >
              {recipe.recipeDescription.substring(0, 100)}...
              <NavLink to={`/recipe/${recipe._id}`} state={{id:recipe._id}} className="inline-flex mt-2 items-center space-x-2 text-sm text-orange-400">
                <span>Read more</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </NavLink>
            </p>
            <hr className="border-gray-300" />
            <section className="px-4 py-2 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <img
                    className="object-cover h-10 rounded-full"
                    src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
                    alt="Avatar"
                  />
                  <div className="flex flex-col mx-2">
                    <p className="font-semibold text-gray-700 hover:underline">
                      {recipe.author}
                    </p>
                    <span className="mx-1 text-xs text-gray-600">{new Date(recipe.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-600 flex items-center justify-center"><FaClock className="mr-1"/> {recipe.recipeTime}</p>
              </div>
            </section>
            <hr className="border-gray-300" />
            <div className="flex flex-1 items-center justify-center flex-wrap px-4 py-1 text-center mx-auto">
              {(recipe.recipeCategorys).map((category, index) => 
                  <span className="px-2 py-1 m-1 text-xs rounded-full bg-orange-400" key={index}>{category}</span>
              )}
            </div>
          </div>
        </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default RecipesPage;
