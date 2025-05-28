import {useNavigate, NavLink} from "react-router-dom";
import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import logo from '../Logo.png'
import axios from "../api/axios";
import useImage from "../hooks/useImage";
import OurCommunity from "../components/OurCommunity";
import {LuChefHat} from 'react-icons/lu'
/**
 * Component for the home page.
 *
 * This component displays the top rated recipes, recipes by category, and a search form.
 * It also provides a brief introduction to the website and a link to learn more.
 *
 * Returns:
 *   The home page component.
 */
const HomePage = () => {
  const getImage = useImage;
  const categories = [
    {
      name:"Breakfast",
      image:"dairyFree.jpeg",
      catagory:"breakfast",
    },
    {
      name:"Dinner",
      image:"dinner.jpeg",
      catagory:"dinner",
    },
    {
      name:"Gluten Free",
      image:"glutenFree.jpeg",
      catagory:"glutenFree",
    },
    {
      name:"Quick",
      image:"quick_and_easy.jpeg",
      catagory:"quick",
    },
    {
      name:"Salades",
      image:"salades.jpeg",
      catagory:"salades",
    },
    {
      name:"Vegan",
      image:"vegan.jpeg",
      catagory:"vegan",
    },
    {
      name:"Vegetrian",
      image:"vegeterian.jpeg",
      catagory:"vegetrian",
    },
    {
      name:"Desserts",
      image:"dessert.jpeg",
      catagory:"desserts",
    },
  ]
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [data, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `recipe/top`,
    requestConfig: {
      "Content-Language": "en-US",
    },
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    navigate("/SearchRecipe", { state: { searchTerm } });
  };

  
 
  return (
    <section className="homepage_container lg:mb-6">
      <div className="grid font-display font-bold place-content-center mb-8 lg:hidden">
        <div className="parent mt-14 flex justify-center items-center relative">
          <h1 className="text-6xl text-orange-500">
              R<span className="relative">
                F
                <LuChefHat className="text-4xl -top-4 left-0 absolute text-orange-500"/>
              </span>N                         
            </h1>
          <img src={logo} className="h-24 top-0" alt="page logo" />
        </div>
      </div>
      <h6 className=" mb-4 md:pt-9 pt-10 lg:mt-9 text-4xl font-semibold leading-none tracking-tight text-center text-gray-900 md:text-5xl lg:text-5xl ">
        <span className="underline underline-offset-3 decoration-8 decoration-orange-500 dark:decoration-orange-500">
          Top
        </span>{" "}
        Rated Recipes{" "}
      </h6>

      <div className="top_rated_container bg-gradient-to-b from-gray-100  md:pt-6 md:pb-8 lg:pt-8 lg:pb-10 home-hero">
        <section>
          <div className="md:max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4 lg:px-0">
            {loading && <p>Loading ..</p>}
            {!loading && error && <p>{error}</p>}
            {!loading &&
              !error &&
              data !== null &&
              data.reverse().map((recipe) => (
                <article key={recipe._id} className="text-center">
                  <NavLink
                    to={`recipe/${recipe._id}`}
                    className="md:hover:opacity-60 flex flex-col h-full"
                  >
                    <img
                      className="object-cover self-center w-44 h-44 md:w-full md:h-full top_rated_image"
                      src={getImage(recipe.Image)}
                      alt="blog"
                    ></img>
                    <p className="relative -mt-4 px-2 sm:px-6 py-2 mx-auto text-white bg-orange-500 text-xxs sm:text-xs font-bold uppercase tracking-extra-widest sm:tracking-giant">
                      {recipe.recipeName}
                    </p>
                  </NavLink>
                </article>
              ))}
          </div>
        </section>
      </div>

      <h6 className="mb-0 mt-8 text-3xl font-semibold leading-none tracking-tight text-center text-gray-900 md:text-4xl lg:text-4xl ">
        Recipe By Category
      </h6>

      <section className=" md:max-w-6xl mx-auto px-4 pt-4 pb-4 mt-6 md:mt-0 md:pb-0 lg:px-0">
        <div className="recipesByCategory">
          <div className="overflow-x-scroll lg:overflow-x-auto py-4">
            <ol className="flex space-x-8 w-full py-4">
              {categories.map((category, index) => (
                <li
                  className="block w-20 md:w-24 flex-grow flex-shrink-0 text-center"
                  key={index}
                >
                  <NavLink to={`category/${categories[index].catagory}`}>
                    <img
                      width="183"
                      height="183"
                      src={`/images/foodByCategory/${categories[index].image}`}
                      className="rounded-full w-20 md:w-24 h-20 md:h-24 mb-2"
                      alt={categories[index].catagory}
                      decoding="async"
                      loading="lazy"
                      sizes="(min-width: 780px) 96px, 80px"
                    ></img>
                    <p className="font-sans text-sm font-bold text-black leading-tight">
                      {categories[index].name}
                    </p>
                  </NavLink>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className=" bg-rose-50 p-3 rounded-md h-80 md:max-w-6xl mx-auto flex flex-col items-center justify-evenly">
        <h2 className="text-4xl font-bold">Search A Recipe</h2>
        <form
          method="GET"
          action=""
          className="search-form mt-10 w-full"
          role="search"
          onSubmit={handleSearchSubmit}
        >
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
            <input
              className="
block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
              id="default-search"
              type="search"
              aria-label="Search our recipes"
              placeholder="Search our recipes"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <button
              type="submit"
              onSubmit={handleSearchSubmit}
              className="text-white absolute right-2.5 bottom-2.5 bg-orange-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
        <span className="hidden md:block mx-4 text-gray-600 -mt-0 text-4xl font-bold leading-none lowercase tracking-normal">
          or
        </span>
        <NavLink
          to="recipe"
          className=" rounded-lg h-fit py-2 px-3 shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
btn bg-orange-500 hidden md:flex font-bold uppercase  text-1xl text-center items-center leading-none"
        >
          {" "}
          + View All Recipes{" "}
        </NavLink>
      </div>

      <section className=" lg:mt-9 md:max-w-6xl mx-auto">
        <div className="md:grid grid-cols-12 gap-x-2">
          <div className="col-span-4 p-8 md:px-6 md:py-8 lg:py-3 lg:px-8 bg-gray-100 text-center">
            <h3 className="sm:mt-6 md:mt-0 lg:mt-6 mb-6 lg:mb-12 flex flex-col justify-center items-center text-black text-base font-arvo uppercase tracking-widest">
              <img src={logo} className="block h-32 w-32 md:hidden" alt="" />
              <span className="font-bold mt-9">Hi! We're RFN.</span>
              <span className="home-you font-bold">Nice to Meet You!</span>
            </h3>
            <p className=" lg:mb-3 lg:px-8 leading-loose md:leading-snug lg:leading-loose">
              Recipe For Everyone is here to help you cook delicious meals with
              less stress and more joy. We offer recipes and cooking advice for
              home cooks, by home cooks.
            </p>
            <NavLink
              to="AboutUs"
              className="btn mt-5 bg-gray-700 text-white
              rounded-lg py-3 px-3 shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
              hidden md:flex font-bold uppercase  text-1xl text-center items-center leading-none flex-col justify-center"
            >
              Learn More
            </NavLink>
          </div>
          <div className="col-span-4 hidden md:block">
            <img
              alt="In our kitchen"
              loading="lazy"
              width="760"
              height="960"
              src="/images/home.jpg"
              sizes="(min-width: 1240px) 379px, calc(28.18vw + 35px)"
            ></img>
          </div>
          <div className="col-span-4 hidden md:block">
            <img
              alt="Pouring olive oil"
              loading="lazy"
              width="760"
              height="960"
              src="/images/oil.png"
              sizes="(min-width: 1240px) 379px, calc(28.18vw + 35px)"
            ></img>
          </div>
        </div>
      </section>
      <OurCommunity/>
    </section>
  );
};

export default HomePage;