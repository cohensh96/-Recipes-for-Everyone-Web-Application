import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import useImage from '../hooks/useImage';


/**
 * SortedRecipes component displays a list of recipes filtered by category.
 */
const SortedRecipes = () => {
  const { sortedByCategory } = useParams()
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getImage = useImage;
    useEffect(() => {
      const fetchData = async () => {
         // Fetch recipe data
        const response = await axios.get('recipe');
        const data =  response.data;
        

         // Filter recipes based on the sortedByCategory parameter
        const sortedRecipes = data.filter((recipe) => { 
            const foundCategory=(recipe.recipeCategorys).find((category)=> category.toLowerCase() === sortedByCategory.toLowerCase())
            if(foundCategory)
              return true
            return false
        });
        
        setIsLoading(false);
        setRecipes(sortedRecipes);
      };
      fetchData();
      // eslint-disable-next-line
    }, []);

    return (
        
      <div className="sorted-recipes-layout allRecipes">
        <div className="bg-orange-500">
          <div className="pt-5 px-4 md:px-2 md:max-w-4xl mx-auto text-center"></div>
          <header className="pt-3 pb-12 px-4 md:pt-5 md:pb-28 md:px-2 md:max-w-4xl mx-auto text-center">
            <h1 className="text-center text-white text-5xl md:text-7xl mb-4 md:mb-8">
             Recipes By Category
            </h1>
            <p className="my-0 text-white font-bold md:text-xl">
              Dietary restrictions, weeknight dinners, meal prep recipes, some of
              our most tried-and-true… no matter how you browse, we’re sure you’ll
              find just what you were looking for.
            </p>
          </header>
        </div>

          {/* Recipes By Category */}
        <section className="bg-white py-8 pb-8 pt-4 px-4 mx-auto md:max-w-5xl">
          <header className="max-w-xl md:mx-auto text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <h2 className="font-sans font-bold tracking-widest text-2xl uppercase text-orange-500 m-0">
              {sortedByCategory} Recipes
              </h2>
            </div>
            <p className="hidden md:block font-bold">
              Out of all the many recipes, these are our {sortedByCategory} recipes.
            </p>
          </header>
  
          <div className="container mx-auto flex  items-center flex-wrap pt-4 pb-12">
            {isLoading && <p>Loading..</p>}
             {/* No Recipes Found --> displat appropiate message to the user.*/}
            {recipes.length===0 &&  <div className=" items-center ">   
                 <img
                 className=" w-400 h-500 rounded"
                 src="../images/search-no-result.jpg"
                 alt="Picutre of Recipe"
               ></img>
                  <h3 className="text-center flex justify-center text-2xl mb-8 font-bold">
             Sorry we couldn't find any matches recipes for {sortedByCategory} category.
            </h3>
            <div className=" flex justify-center">

            <NavLink
          to="/recipe"
          className="flex rounded-lg py-2 px-3 shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
           btn bg-orange-500 hidden md:flex font-bold uppercase  text-1xl text-center items-center leading-none">
            Move To All Recipes<img
                    className="hover:grow hover:shadow-lg w-20 h-20 rounded"
                    src= "../images/next.png"
                    alt="Picutre of Recipe"
                  ></img>
        </NavLink>
        </div>
               </div>}

             {/* Display Recipes */}
            {recipes && recipes.length!==0 &&
              !isLoading &&
              recipes.map((recipe) => (
                <div className="md:h-full mb-4 p-6 flex flex-wrap w-full bg-white rounded overflow-hidden shadow-lg hover:grow hover:shadow-lg  hover:ring-2 hover:ring-orange-500 hover:ring-opacity-50" key={recipe._id}>
                  <NavLink to={`/recipe/${recipe._id}`} state={{id:recipe._id}} className="flex md:flex-row flex-col">
                  <div className="mt-4 w-full hover:grow hover:shadow-lg md:w-1/3 rounded-t">
                  <img
                    className="hover:grow hover:shadow-lg w-400 h-500 rounded"
                    src= {getImage(recipe.Image)}
                    alt="Picutre of Recipe"
                  ></img>
                  
                  </div>

                  <div className="w-full md:w-2/3 flex flex-col flex-grow flex-shrink">

                  <div className=" flex justify-end  w-20 top-0 right-0 mt-4 ml-5 bg-orange-500 text-black rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase  flex justify-center items-center">
            <span className=" flex items-center font-bold text-bkack" >{recipe.recipeDifficulty}</span>
          </div>


                  <p className=" font-bold text-orange-400  md:text-2xl pt-6 px-6">{recipe.recipeName}</p>
                  <p className="pt-1 font-bold text-gray-900 pt-2 px-6">Author:{recipe.author}</p>
                  <p className="font-bold text-gray-600 text-xs md:text-sm pt-3 px-6">{recipe.recipeDescription.substring(0, 100)} 
                  <u> Read more...</u></p>

                  <div className="flex justify-end mt-4 mb-4 text-gray-500">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="ml-1 lg:text-xl">{recipe.recipeTime}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 lg:text-xl">{recipe.recipeIngredients.length}</span>
              </div>
            </div>  
              </div>
              </NavLink>
              </div>
              ))}
          </div>
        </section>
      </div>
    );
  };
  
  export default SortedRecipes;
