import { useParams, useNavigate } from 'react-router-dom';
import useImage from '../hooks/useImage';
import { useState, useRef, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FaPlusCircle, FaTrash,FaUserEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Component for editing a recipe.
 *
 * This component allows users to edit their existing recipes by providing
 * details such as recipe name, description, calories per serving, cooking time,
 * difficulty level, ingredients, and category.
 * Users can add and remove ingredients and categories dynamically.
 * Once the recipe is edited, the component navigates back to the recipe page.
 */
const EditRecipe = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const toast_id = useRef(null);

  const getImage = useImage;
  const axiosPrivate = useAxiosPrivate();

  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [errorMsg, setError] = useState(null);
  const [error,setErrorData] = useState('');
  const [loading,setLoading] = useState(true);

  const [recipeEdit, setRecipeEdit] = useState({
    id:"",
    recipeName: '',
    recipeDescription: '',
    recipeDifficulty: '',
    recipeCallories: '',
    recipeTime:'',
    recipeCategorys: [],
    recipeIngredients: []
  });
  useEffect(() => {
    const fetchRecipes = async() => {
      try {
        const response = await axiosPrivate.get(`recipe/${id}`);
        setRecipeEdit({
          id:response.data._id,
          recipeName: response.data.recipeName,          
          recipeDescription: response.data.recipeDescription,
          recipeDifficulty: response.data.recipeDifficulty,
          recipeCallories:response.data.recipeCallories,
          recipeCategorys:response.data.recipeCategorys,
          recipeIngredients: response.data.recipeIngredients,
          recipeTime: response.data.recipeTime,
          Image:response.data.Image
        })
      } catch (error) {
        setErrorData(error);
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchRecipes();
    //eslint-disable-next-line
  },[])


  const handleInputChange = (event) => {
    setRecipeEdit({
      ...recipeEdit,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      toast_id.current = toast.loading("Please wait...")
      await axiosPrivate.put(`recipe`, recipeEdit);
      toast.update(toast_id.current, 
        { render: `The recipe updated successfully!`,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", type: "success", isLoading: false });
      navigate(`/profile`); 

    } catch (error) {
      console.error(error);
      if (error.response) {
        const { status, data } = error.response;
        console.log(status); 
        console.log(data.message);
        if (
          data.message === "You have no permissions to edit the recipe"
        ) {
          setError("You have no permissions to edit the recipe");
        }else if( data.message ===  "Recipe callorias must be number!"){
          setError("Recipe callorias must be number!"); 
        }else {
          console.log(error.message);
          setError("An error occurred, Please try again later."); 
        }
      } else {
        console.log(error.message);
        setError("An error occurred, Please try again later.");
      }
    }
};


  const handleCategoryDelete = (deleteItem) => {
    setRecipeEdit(oldValues => {
      return {
        ...oldValues,
        recipeCategorys: oldValues.recipeCategorys.filter((item) => item !== deleteItem)
      };
    });
  };
  
  const handleIngredientDelete = (deleteItem) => {
    setRecipeEdit(oldValues => {
      return {
        ...oldValues,
        recipeIngredients: oldValues.recipeIngredients.filter((item) => item !== deleteItem)
      };
    });
  };
  

  const handleCategoryAdd = () => {
    if (category && recipeEdit.recipeCategorys && !recipeEdit.recipeCategorys.includes(category)) {
      setRecipeEdit(prevState => ({
        ...prevState,
        recipeCategorys: [...prevState.recipeCategorys, category]
      }));
      setCategory("");
    }
  }
  
  const handleIngredientAdd = () => {
    if (ingredient && !recipeEdit.recipeIngredients.includes(ingredient)) {
      setRecipeEdit(oldValues      => ({
        ...oldValues,
        recipeIngredients: [...oldValues.recipeIngredients, ingredient],
      }));
      setIngredient("");
    }
  };


  return (
    <article className='mt-1'>
         
        <header className="max-w-xl md:mx-auto text-center">

          <div className="flex justify-center items-center space-x-2 mb-4 mt-4">
            <h2 className="mb-6 font-sans font-bold  text-2xl uppercase text-orange-500 m-0">
            Update Your Recipe
            </h2>
          </div>
        </header>
      {loading && <p>Loading ..</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && recipeEdit !== null && 
        <form onSubmit={handleSubmit} className="w-3/4 mx-auto bg-white rounded-lg shadow-xl p-6 ring-1 ring-orange-500">
          <div className='relative'>
            <img src={getImage(recipeEdit.Image)} alt={recipeEdit.recipeName} className='h-64 w-full object-cover rounded-t-lg' />
            <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2 text-white'>
             <h3 className=" font-bold">Recipe Name:</h3>
              <input
                type="text"
                name="recipeName"
                value={recipeEdit.recipeName}
                onChange={(e) => handleInputChange(e)}
                className="w-full border rounded-md px-3 py-2 mb-4 text-gray-800 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
          <section className='px-4 py-3'>
          <div className="w-full flex items-center">
          <h3 className=" font-bold">Recipe Callories:</h3>
            <input
              type="text"
              name="recipeCallories"
              value={recipeEdit.recipeCallories}
              onChange={handleInputChange}
              className=" ml-4 mt-2 border rounded-md px-3 py-0 mb-4 text-gray-800 focus:border-orange-500 focus:outline-none"
            />
            </div>
            <div className="w-full flex items-center">
            <FontAwesomeIcon icon={faClock}  className="mr-2" />
            <h3 className=" font-bold">Recipe time: </h3>
            <input
              type="text"
              name="recipeTime"
              value={recipeEdit.recipeTime}
              onChange={handleInputChange}
              className=" ml-4 mt-2 border rounded-md px-3 py-0 mb-4 text-gray-800 focus:border-orange-500 focus:outline-none"
            />
            </div>
          </section>
          <section className='mb-5 flex flex-col px-4 py-3 bg-gray-100'>
            <div >
              <h3 className="mt-5 mb-1 font-bold">Description:</h3>
              <textarea
                name="recipeDescription"
                value={recipeEdit.recipeDescription}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 mb-4 text-gray-800 focus:border-orange-500 focus:outline-none"/>
            </div>
          </section>
          <section className="flex items-center" >
          <div className="col-span-3 mb-4">
                  <label
                    htmlFor="recipeingredients"
                    className=" font-bold tracking-tight text-gray-900"
                  >
                    Recipe Ingredients:
                  </label>
                  <input
                    className="mt-4 w-full p-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-500"
                    type="text"
                    name="recipeingredients"
                    id="recipeingredients"
                    placeholder="Enter Recipe Ingredient"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                  />
               
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className="ml-6 h-12 mt-6 text-gray-800 transition-colors duration-150 font-bold rounded border-b-2 border-amber-500 hover:border-orange-600 hover:bg-orange-500 hover:text-white shadow-xl py-2 px-6 inline-flex items-center"
                    onClick={handleIngredientAdd}
                  >
                    <span className="mr-2">Add</span>
                    <FaPlusCircle />
                  </button>
                </div> 
              </section>


              <section>
                <ul className="flex flex-wrap">
                  {recipeEdit.recipeIngredients &&
                    recipeEdit.recipeIngredients.map((singleIng, index) => (
                      <button
                        type="button"
                        className="bg-amber-300 transition-colors duration-150hover:bg-orange-500 text-white py-2 px-4 rounded inline-flex items-center m-1"
                        key={index}
                        onClick={() => handleIngredientDelete(singleIng)}
                      >
                        {singleIng} <FaTrash className="ml-1" />
                      </button>
                    ))}
                </ul>
              </section>
              <section className="grid grid-cols-5 gap-6 mt-4 mb-4">
                <div className="col-span-3">
                  <label
                    htmlFor="recipeCategorys"
                    className="font-bold tracking-tight text-gray-900"
                  >
                    Recipe Categories:
                  </label>
                  <input
                    className=" mt-4 w-full p-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-500"
                    type="text"
                    name="recipeCategorys"
                    id="recipeCategorys"
                    placeholder="Enter Recipe Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className=" h-12 mt-6 text-gray-800 transition-colors duration-150 font-bold rounded border-b-2 border-amber-500 hover:border-orange-600 hover:bg-orange-500 hover:text-white shadow-xl py-2 px-6 inline-flex items-center"
                    onClick={handleCategoryAdd}
                  >
                    <span className="mr-2">Add</span>
                    <FaPlusCircle />
                  </button>
                </div>
              </section>
              <section>
                <ul className="flex flex-wrap">
                  {recipeEdit.recipeCategorys &&
                    recipeEdit.recipeCategorys.map((singleCat, index) => (
                      <button
                        type="button"
                        className="bg-orange-300 transition-colors duration-150 hover:bg-orange-500 text-white py-2 px-4 rounded inline-flex items-center m-1"
                        key={index}
                        onClick={() => handleCategoryDelete(singleCat)}
                      >
                        {singleCat} <FaTrash className="ml-1" />
                      </button>
                    ))}
                </ul>
             
          </section>

          <div>
                  <label
                    htmlFor="recipedifficulty"
                    className="font-bold tracking-tight text-gray-900"
                  >
                    Recipe Difficutly
                  </label>
                  <select
                    className=" mt-4 w-full p-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-500"
                  
                    name="recipedifficulty"
                    id="recipedifficulty"
                    placeholder="Enter Recipe Difficulty"
                    value={recipeEdit.recipeDifficulty}
                    onChange={handleInputChange}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
          
          <button type="submit"
  className="mt-5 bg-orange-500 transition-colors duration-150 hover:bg-black text-white py-2 px-4 rounded flex items-center"
>
  <FaUserEdit className="mr-2" />
  Update
</button>
{errorMsg && (
            <p className="text-red-500 mt-2 font-bold text-sm">{errorMsg}</p>
          )}

        </form>
      }
     <ToastContainer closeOnClick={false} closeButton={false} />
    </article>
  )
}

export default EditRecipe

