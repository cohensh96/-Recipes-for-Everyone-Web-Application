import React, { useState } from "react";
import useImage from '../hooks/useImage';
import useAxios from '../hooks/useAxios';
import axios from "../api/axios";
import { NavLink, useLocation } from "react-router-dom";



/**
 * SearchPage component displays a search page for recipes.
 */
const SearchPage = () => {
  const getImage = useImage;
  //Tags for searching.
  const tags = [
    "Hard",
    "Medium",
    "Easy",
    "Dinner",
    "Breakfast",
    "Lunch",
    "DiaryFree",
    "Dinner",
    "GlutenFree",
    "Quick",
    "Salades",
    "Vegan",
    "Vegetrian",
    "Desserts",
  ];

  // Get the search term from the location state
  const location = useLocation();
  const initialSearchTerm = location.state?.searchTerm || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedTags, setSelectedTags] = useState([]);

  // Fetch all recipes data
  const [recipes,error,isLoading] = useAxios({
    axiosInstance: axios,
    method:"GET",
    url: `recipe`,
    requestConfig: {
      'Content-Language': "en-US"
    }
  })

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**Handle with tag changes.
   search terms contant is all the selected tags or the userws input.*/
  const handleTagChange = (event) => {
    const selected = event.target.value;
    //If the tag is already selected.
    if (selectedTags.includes(selected)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== selected));
      // Remove the tag from searchTerm when it's unchecked
      setSearchTerm((prevSearchTerm) =>
        prevSearchTerm.replace(selected, "").trim()
      );
    } else {
      setSelectedTags([...selectedTags, selected]);
      // Add the tag to searchTerm when it's checked
      setSearchTerm((prevSearchTerm) => `${prevSearchTerm} ${selected}`.trim());
    }
  };

  //Split the searchTerm
  const filteredRecipes = recipes.filter((recipe) => {
    const searchTerms = searchTerm.toLowerCase().split(" ");

    return (
      /**Finds all the recipes according to the searchTerm
       * The searchTerm inclutes all the selected tags and the user's input (term)
      */
      searchTerms.some(
        (term) =>
          recipe.recipeName.toLowerCase().includes(term.toLowerCase()) ||
          recipe.recipeDescription.toLowerCase().includes(term.toLowerCase()) ||
          recipe.recipeIngredients.some((ingredient) =>
            ingredient.toLowerCase().includes(term.toLowerCase())
          ) ||
          recipe.author.toLowerCase().includes(term.toLowerCase())
      ) ||
      selectedTags.some(
        (tag) =>
          recipe.recipeCategorys.some((category) =>
            category.toLowerCase().includes(tag.toLowerCase())
          ) || recipe.recipeDifficulty.toLowerCase() === tag.toLowerCase()
      )
    );
  });

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
      <header className="max-w-xl md:mx-auto text-center">
        <div className="flex justify-center items-center space-x-2 mb-4 mt-4">
          <img className="mb-6" alt="recipe icon" src="../images/recipe-icon.png"></img>
          <h2 className="mb-6 font-sans font-bold tracking-widest text-2xl uppercase text-orange-500 m-0">
            Search Recipes
          </h2>
        </div>
      </header>

     {/* Search Form */}
      <div className=" md:max-w-3xl mx-auto justify-center">
        <div className="w-full mb-8 mt-4">
          <form className="search-form flex-1" role="search">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 18.5 18.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </g>
                  </g>
                  <title>search</title>
                </svg>
              </div>
               {/* Search Input */}
              <input
                className="
              block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
                id="default-search"
                aria-label="Search our recipes"
                type="text"
                placeholder="Search our recipes"
                value={searchTerm}
                onChange={handleChange}
              ></input>
              <button
                type="search"
                className="text-white absolute right-2.5 bottom-2.5 bg-orange-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-4 py-2 "
                onClick={(e) => e.preventDefault()}
              >
                Search
              </button>
            </div>
            <header className="border-b border-gray-400 pb-2 mb-3 mt-5">
              <h2 className="text-lg text-black tracking-widest  font-sans font-bold  uppercase">
                Popular Categories
              </h2>
            </header>
            <div className="mt-4">
              {tags.map((tag, index) => (
                <label
                  key={index}
                  className="inline-flex items-center mt-5  cursor-pointer label"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    onChange={handleTagChange}
                    className="form-checkbox h-5 w-5 checkbox checkbox-sm accent-orange-600 focus:accent-black"
                  />
                  <span className="mr-3  ml-1 text-black font-bold">{tag}</span>
                </label>
              ))}
            </div>
          </form>
        </div>

       {/* Search Results */}
        <div>
          <header className="border-b border-gray-400 pb-2 mb-3 mt-5">
            <h2 className=" text-2xl text-orange-500  tracking-widest  font-sans font-bold  uppercase">
              Search Results
            </h2>
          </header>

          <div className="text-white mb-8 mt-8">
          {isLoading && <p>Loading..</p>}
          {!isLoading && error && <p>{error}</p>}
          {!error &&
            !isLoading && 
            filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div
                  className="md:h-full mb-4 p-6 flex flex-wrap w-full bg-white rounded overflow-hidden shadow-lg hover:grow hover:shadow-lg  hover:ring-2 hover:ring-orange-500 hover:ring-opacity-50"
                  key={recipe._id}
                >
                  <NavLink
                    to={`/recipe/${recipe._id}`}
                    state={{ id: recipe._id }}
                    className="flex md:flex-row flex-col"
                  >
                    <div className="mt-4 w-full hover:grow hover:shadow-lg md:w-1/3 rounded-t">
                      <img
                        className="hover:grow hover:shadow-lg w-400 h-500 rounded"
                        src={getImage(recipe.Image)}
                        alt="Picutre of Recipe"
                      ></img>
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col flex-grow flex-shrink">
                      <div className="flex justify-end  w-20 top-0 right-0 mt-4 ml-5 bg-orange-500 text-black rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase  flex justify-center items-center">
                        <span className=" flex items-center font-bold text-bkack">
                          {recipe.recipeDifficulty}
                        </span>
                      </div>

                      <p className=" font-bold text-orange-400  md:text-2xl pt-6 px-6">
                        {recipe.recipeName}
                      </p>
                      <p className="pt-1 font-bold text-gray-900 px-6">
                        Author:{recipe.author}
                      </p>
                      <p className="font-bold text-gray-600 text-xs md:text-sm pt-3 px-6">
                        {recipe.recipeDescription.substring(0, 100)}
                        <u> Read more...</u>
                      </p>

                      <div className="flex justify-end mt-4 mb-4 text-gray-500">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <span className="ml-1 lg:text-xl">
                            {recipe.recipeTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                            <path
                              fillRule="evenodd"
                              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="ml-1 lg:text-xl">
                            {recipe.recipeIngredients.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))
            ) : (
              <div className=" items-center ">
                <img
                  className=" w-400 h-500 rounded"
                  src="./images/search-no-result.jpg"
                  alt="Picutre of Recipe"
                ></img>
                <h3
                  className="text-center flex justify-center
                  mb-6 font-sans font-bold tracking-widest text-2xl uppercase text-black
                  "
                >
                  Sorry we couldn't find any matches recipes for your criteria.
                </h3>
                <h2
                  className="text-center flex justify-center
                  mb-6 font-sans font-bold tracking-widest text-lg uppercase text-orange-500"
                >
                  Search again or Move To All Recipes
                </h2>
                <div className=" flex justify-center">
                  <NavLink
                    to="/recipe"
                    className="flex rounded-lg py-2 px-3 shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
           btn bg-orange-500 hidden md:flex font-bold uppercase  text-1xl text-center items-center leading-none"
                  >
                    Move To All Recipes
                    <img
                      className="hover:grow hover:shadow-lg w-20 h-20 rounded"
                      src="../images/next.png"
                      alt="Picutre of Recipe"
                    ></img>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;