import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


/**
 * The UpdateProfile component is used to update user profile information.
 * It fetches the user data from the server and allows the user to update their profile.
 */
const UpdateProfile = () => {
  const toast_id = useRef(null);
  // Custom hook for making private Axios requests
  const axiosPrivate = useAxiosPrivate();
  // React Router hook for navigation
  const navigate = useNavigate();
  // State variables
  const [errorMsg, setError] = useState(null);
  const [error, setErrorData] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    confirm: "",
  });

   // Fetch user data from the server when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const response = await axiosPrivate.get(`user`);
        console.log(response);
        setUserData({
          id: response.data._id,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          confirm: response.data.password,
        });
      } catch (error) {
        setErrorData(error.response.data.message);
     
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, []);


// Handle input changes in the form
  const handleInputChange = (event) => {
    setError(null);
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Show a loading toast message
      toast_id.current = toast.loading("Please wait...");
       // Send a PUT request to update the user profile
      await axiosPrivate.put(`user`, userData);
       // Update the toast message to indicate success
      toast.update(toast_id.current, {
        render: `Your profile updated successfully!`,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "success",
        isLoading: false,
      });
       // Navigate to the profile page
      navigate(`/profile`);
    } catch (error) {
       // Set error messages based on the response data
       let errorMessage = '';
      if (error.response) {
        const { data } = error.response;
        setError(data.message);
         if (data.message === "Missing few fields in user data.") {
            errorMessage = "Missing few fields in user data.";
           setError("Missing few fields in user data.");
         }else if(data.message=== "Some fields does not meet the requrements."){
            errorMessage = "The password and the confirm must be match.";
            setError("The password and the confirm must be match."); 
         }else {
          errorMessage = "An error occurred.";
          setError("An error occurred.");
         }
      } else {
        errorMessage = "An error occurred.";
        console.log(error.message);
        setError("An error occurred.");
      }
        toast.update(toast_id.current, {
          render: `${errorMessage}`,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          type: "error",
          isLoading: false,
        });
    }
  };

  return (
    <div>
      {/* Loading state */}
      {loading && <p>Loading...</p>}

       {/*  Update Your Profile form */}
      {!loading && error && <p>{error}</p>}
      {!loading&&!error && userData.id !== "" &&
     <form
        onSubmit={handleSubmit}
        className="flex h-full flex-col items-center justify-evenly"
      >
        <header className="max-w-xl md:mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-4 mt-4">
            <h2 className="mb-6 font-sans font-bold  text-2xl uppercase text-orange-500 m-0">
              Update Your Profile
            </h2>
          </div>
        </header>

       
        <div className="relative h-11 w-full min-w-[200px] mt-8 mb-2 ">
        <label className="block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Username:
          </label>
         <input
           
            type="text"
            name="username"
            value={userData.username}
            autoFocus
            autoComplete="true"
            className="peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => {
              setError("You can't change your Username.");
            }}
            aria-disabled={true}
          />
         
        </div>

        <div className="mt-4 relative h-11 w-full min-w-[200px]">
        <label className="block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Email:
          </label>
          
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={(e) => {
                setError("You can't change your Email.");
              }}
            className="peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            aria-disabled={true}
          />
    
        </div>

        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            name="password"
            minLength="8"
            value={userData.password}
            onChange={handleInputChange}
            className="peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          />
          <label className="block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Password:
          </label>
        </div>
        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            name="confirm"
            minLength="8"
            value={userData.confirm}
            onChange={handleInputChange}
            className="peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          />
          <label className="block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Confirm Password:
          </label>
        </div>
        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            type="text"
            name="firstname"
            minLength="1"
            value={userData.firstname}
            onChange={handleInputChange}
            className="peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          />
          <label className="block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            First Name:
          </label>
        </div>
        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            type="text"
            name="lastname"
            minLength="1"
            value={userData.lastname}
            className="peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={handleInputChange}
          />
          <label className="block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Last Name:
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 block w-full select-none rounded-lg bg-orange-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Update
        </button>
         {/* If there is an error, display it the the user. */}
        {errorMsg && <p className="text-red-500 font-bold text-1xl mt-5">{errorMsg}</p>}
      </form>}
       {/**toast */}
      <ToastContainer closeOnClick={false} closeButton={false} />
    </div>
  );
};

export default UpdateProfile;
