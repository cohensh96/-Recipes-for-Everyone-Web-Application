import {  useState, useRef } from 'react';
import useAxios from '../hooks/useAxios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';

const AdmingRecipes = () => {
 // Custom hook for private axios instance
 const axiosPrivate = useAxiosPrivate();
 const toast_id = useRef(null);
 // State variables
 const [recipes, error, loading, refetch] = useAxios({
   axiosInstance: axiosPrivate,
   method: 'GET',
   url: 'recipe',
   requestConfig: {
     'Content-Language': 'en-US',
   },
 });
 const [selectedRecipe, setSelectedRecipe] = useState(null);

 // Function to delete a recipe
 const handleDeleteRecipe = async (selectedRecipe) => {
   try {
     // Show a loading toast while the delete request is being processed
     toast_id.current = toast.loading("Please wait...");

     // Send a delete request to delete the recipe
     // eslint-disable-next-line
     const response = await axiosPrivate.delete(`recipe`, {
       headers: { "Content-Type": "application/json" },
       data: {
         id: selectedRecipe._id
       },
       withCredentials: true,
     });

     // Update the loading toast with a success message
     toast.update(toast_id.current, {
       render: `${selectedRecipe.recipeName} recipe has been deleted.`,
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       type: "error",
       isLoading: false
     });

     // Refetch the recipes after deletion to update the UI
     await refetch();
     setSelectedRecipe(null);
   } catch (error) {
     // If an error occurs, update the loading toast with an error message
     toast.update(toast_id.current, {
       render: `${error}`,
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
       type: "error",
       isLoading: false
     });
   }
 };

 // Handle click on a recipe
 const handleRecipeClick = (recipe) => {
   setSelectedRecipe(recipe);
 };

  return (
    <section className="p-4">
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className='row-span-2'>
          <h2 className="text-lg font-bold mb-4">Recipes List</h2>
          <div className="bg-white rounded shadow overflow-hidden">
            {recipes &&
              recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className={`cursor-pointer px-4 py-2 border-b border-gray-200 ${
                    selectedRecipe && selectedRecipe._id === recipe._id
                      ? 'bg-blue-100'
                      : ''
                  }`}
                  onClick={() => handleRecipeClick(recipe)}
                >
                    <div className='flex justify-between'>
                    <p className="text-gray-700">{recipe.recipeName}</p>
                    <p className="text-gray-700">{recipe.author}</p>

                    </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 order-2">Recipe Details</h2>
          <div className="bg-white rounded shadow p-4">
            {selectedRecipe ? (
              <div>
                <div>
                  <p className="text-gray-700">Recipe Name: {selectedRecipe.recipeName}</p>
                  <p className="text-gray-700">Recipe Author: {selectedRecipe.author}</p>
                  <p className="text-gray-700">Description: {selectedRecipe.recipeDescription}</p>
                  <p className="text-gray-700">Comments: {selectedRecipe.recipeComments}</p>
                </div>
              </div>
            ) : (
              <p>Please select a Recipe to view details</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Actions</h2>
          <div className="bg-white rounded shadow p-4">
            {selectedRecipe ? (
              <div className='flex flex-col w-fit'>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteRecipe(selectedRecipe)}
                >
                  Delete Recipe
                </button>
              </div>
            ) : (
              <p>Please select a recipe to perform actions</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default AdmingRecipes;
