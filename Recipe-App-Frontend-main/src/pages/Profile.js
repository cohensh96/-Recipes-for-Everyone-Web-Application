import { useEffect, useRef, useReducer, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { FaStar, FaDoorOpen,FaUser  } from 'react-icons/fa';
import { MdDinnerDining } from 'react-icons/md';
import { GiCook } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import {FaUserEdit } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import useLogout from '../hooks/useLogout';
/**
 * Reducer function for managing state updates based on dispatched actions.
 *
 * @param {Object} state - The current state object.
 * @param {Object} action - The action object dispatched to update the state.
 * @returns {Object} - The updated state object.
 */
function reducer(state, action) {
  switch (action.type) {
    case "QUEUE_FOR_REMOVAL":
      return {
        collection: state.collection,
        toRemove: [...state.toRemove, action.id]
      };
    case "CLEAN_COLLECTION":
      return {
        collection: state.collection.filter(
          v => !state.toRemove.includes(v._id)
        ),
        toRemove: []
      };
    case "UNDO":
      return {
        collection: state.collection,
        toRemove: state.toRemove.filter(v => v !== action.id)
      };
    case "SET_COLLECTION":
        return {
          collection: action.collection,
          toRemove: state.toRemove
        };
    default:
      return state;
  }
}
/**
 * Profile Component
 *
 * This component displays the user's profile information, including personal details,
 * average rating, last comments, and a list of their recipes. It also provides functionality
 * to update the profile, create a new recipe, and perform administrative actions.
 *
 * @returns {JSX.Element} - The rendered Profile component.
 */
const Profile = () => {
  const toast_id = useRef(null);
  const axiosPrivate = useAxiosPrivate();
  const {auth} = useAuth();
  const location = useLocation();
  const logout = useLogout();
  const navegate = useNavigate();

  const [user,erroruser,loadinguser] = useAxios({
    axiosInstance: axiosPrivate,
    method:"GET",
    url: `user`,
    requestConfig: {
      'Content-Language': "en-US"
    }
  })

  const [avarage,errorAvarage,loadingAvarage, refetchAvarage] = useAxios({
    axiosInstance: axiosPrivate,
    method:"GET",
    url: `recipe/avarage`,
    requestConfig: {
      'Content-Language': "en-US"
    }
  })
  const [loadingRecipe, setIsLoadingRecipes] = useState(false);
  const [errorRecipe, setErrorRecipes] = useState(null);

  const [comments, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    collection: [],
    toRemove: []
  });


  useEffect(() => {
    const fetchComments = async() => {
      try {
        const response = await axiosPrivate.get(`comments`);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      finally {
        setIsLoading(false);
      }
    }
    const fetchRecipes = async() => {
      try {
        const response = await axiosPrivate.get(`recipe/search/10`);
        setCollection(response.data);
      } catch (error) {
        setErrorRecipes(error);
      }
      finally {
        setIsLoadingRecipes(false);
      }
    }
    fetchRecipes();
    fetchComments();
    // eslint-disable-next-line
  },[])

  const handleDelete = async(recipe) => {
    const id = recipe._id;
    try {
      dispatch({
        id,
        type: "QUEUE_FOR_REMOVAL"
      });
      toast_id.current = toast.loading("Pending request ...")
      
      const response = await axiosPrivate.delete(`recipe`,
      {
        headers: { "Content-Type": "application/json" },
        data: {
          id: recipe._id
        },
        withCredentials: true,
      });
      toast.update(toast_id.current, 
      { render: `${response.data.recipeName} has been deleted.`,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", type: "error", isLoading: false });
      dispatch({ type: "CLEAN_COLLECTION" })
      refetchAvarage();
    } catch (error) {
      console.log(error.message);      
    }
  }
  const setCollection = (data) => {
    dispatch({
      type: "SET_COLLECTION",
      collection: data
    });
  };
  const handleSignOut = async() => {
    await logout();
    navegate('/');
  }
  return (
    <section className='font-display'>
      <ToastContainer closeOnClick={false} closeButton={false} />
      <article className='flex flex-col  mx-auto pt-10 lg:grid lg:place-content-start lg:grid-cols-2 lg:gap-5'>
        {/* Profile + Icon */}
        <article className='flex text-5xl text-orange-500 lg:col-span-2 lg:place-content-center lg:mb-2'>
          <GiCook/>
          <h2>My Profile</h2>
        </article>
        <article className='user-panel mt-10 h-fit p-2 text-xl flex flex-col justify-between bg-orange-100 w-full lg:h-fit lg:w-3/4 lg:mx-auto lg:rounded-md'>
            {!loadinguser && !erroruser && 
              <div>
                  <h2 className='text-2xl text-center'>
                    <span className='font-bold whitespace-nowrap'>Welcome </span>{user.firstname} {user.lastname} !
                  </h2>
                  <h3 className='mt-10 text-xl font-bold'>Personal Details:</h3>
                    <p className='text-lg'>Username: {user.username}</p>
                    <p className='text-lg'>Email: {user.email}</p>
                    <p className='text-lg'>Rating: {loadingAvarage && 
                    <span>
                      Loading avarage...
                    </span>}
                  {!loadingAvarage && !errorAvarage && 
                  <span>
                    {avarage.avarage > 0 ? Number(avarage.avarage).toFixed(1) : avarage.avarage}/5
                  </span>}</p>
              </div>
              }
              <article className='buttons-area mt-10 mx-auto flex flex-col items-center'>
             
             <NavLink to={`/updateProfile/${user._id}`} state={{from: location}}>
             <button  type="button"  className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2">
             <FaUserEdit className="h-6 w-8" />
                Update Profile   
                </button>         
             </NavLink>
            
              <NavLink to={"/CreateRecipe"}>
                <button 
                  type="button" 
                  className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2"
                  >
                  <MdDinnerDining className="h-8 w-8"/>
                  Create Recipe
                </button>
              </NavLink>
              {auth && auth?.roles?.find(role => role === 420420) &&
              <NavLink to={"/admin"}>
                <button 
                  type="button" 
                  className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2"
                  >
                  <FaUser className="h-8 w-8"/>
                  Admin page
                </button>
              </NavLink>}
              <NavLink to={"/"} state={{from: location}} replace>
                <button 
                  type="button" 
                  className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                  onClick={() => handleSignOut()}
                >
                  <FaDoorOpen className="h-8 w-8"/>
                  Logout
                </button>
              </NavLink>
           
              </article>
        </article>
        <article className='comments-area mt-10 w-full flex flex-col justify-evenly h-[50vh] md:h-fit lg:order-3 lg:w-3/4 lg:mx-auto'>
          <h2 className='text-xl font-bold text-center'>Your last comments:</h2>
          {loading && <p>Loading ..</p>}
          {!loading && error && <p>{error}</p>}
          {!loading && !error && comments !== null &&

            comments.length <= 0  ? 
            (<p>No comments posted</p>) :
            (comments.map(element => (
              <NavLink key={element.comment._id} to={`/recipe/${element.comment.recipeId}`} state={{from: location}}>
                <article className=' bg-slate-50 w-full h-fit rounded-md relative hover:bg-orange-200 md:h-36 md:mt-3'>
                  <div className='p-3'>
                    <h2 className='text-1xl underline'>{element.recipe[0].recipeName}</h2>
                    <h3>{element.comment.comment}</h3>
                  </div>
                  <div className='absolute p-1 bottom-0 right-0'>
                    <p className='inline w-full'>
                      Rating:
                    <ol className='flex'>
                        {
                            [1, 2, 3, 4, 5].map((star, index) => (
                                <li key={index}><FaStar className={element.comment.rating >= star ? 'text-yellow-500' : 'text-gray-300'}/></li>
                            ))
                        }
                    </ol>
                    </p>
                  </div>
                  <p className=' absolute top-0 right-0'>{(new Date(element.comment.createdAt)).toLocaleDateString()}</p>
                </article>              
              </NavLink>
            )))
          }
        </article>
  
        <article className='recipe-area mt-10 flex flex-col w-full justify-between lg:cols-span-full lg:place-content-start lg:mt-0 lg:w-3/4 lg:mx-auto'>
        <p className='mt-8 text-xl font-bold text-center lg:mt-0'>Your Recipes:</p>
          {loadingRecipe && <p>Loading ..</p>}
          {!loadingRecipe && errorRecipe && <p>{errorRecipe}</p>}
          {!loadingRecipe && !error && 
            state.collection.length <= 0  ? 
            (<p>No recipes posted</p>) 
            :
            (state.collection.filter(recipe => !state.toRemove.includes(recipe._id))
            .map((recipe) => (
              <article key={recipe._id} className='bg-slate-50 min-h-10 mt-5 w-full p-2 md:grid md:grid-cols-2'>
                <section className='right-side p-3 flex flex-col'>
                    <h2 className='text-1xl'><b className='underline'>Recipe name:</b> {recipe.recipeName}</h2>
                    <p className='mt-5 flex flex-wrap'>Catagorys:
                      {(recipe.recipeCategorys).map((category,index) => (
                        <span key={index} className='w-fit m-1 bg-zinc-200 border border-zinc-500 rounded-md p-1'>{category}</span>
                      ))}
                    </p>
                </section>
                <article className='button-area mt-5 flex flex-col'>
                        <button className='bg-green-100 px-2 py-2 w-3/4 mx-auto border-2 text-xl rounded-md border-green-500 lg:hover:bg-green-600 lg:hover:text-white uppercase whitespace-nowrap'>
                            <NavLink to={`/recipe/${recipe._id}`} state={{from: location}}>
                               Read more
                            </NavLink>
                        </button>
                        <button className='bg-amber-100 mt-3 px-2 py-2 mx-auto w-3/4 border-2 text-xl rounded-md border-amber-500 lg:hover:bg-yellow-500 lg:hover:text-white  uppercase whitespace-nowrap'>
                          <NavLink to={`/recipe/edit/${recipe._id}`} state={{from: location}}>
                               Edit
                            </NavLink>
                        </button>
                        <button 
                        className='bg-rose-100 mt-3 px-2 py-2 border-2 mx-auto w-3/4 text-xl rounded-md border-rose-500 lg:hover:bg-rose-600 lg:hover:text-white uppercase whitespace-nowrap'
                        onClick={() => handleDelete(recipe)}>
                            Delete
                        </button>
                </article>
              </article>
            )))
          }
        </article>
      </article>
    </section>
  )
}

export default Profile