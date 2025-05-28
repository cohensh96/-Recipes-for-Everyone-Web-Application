
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "reactjs-popup/dist/index.css";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register_URL = "/register";
const SignUp = ({ setView}) => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setError] = useState(null);
  const [usernameBorderColor, setUsernameBorderColor] = useState(true);
  const [emailBorderColor, setEmailBorderColor] = useState(true);
  const [passwordBorderColor, setPasswordBorderColor] = useState(true);
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] =useState(true);

  const validInputClass =
    "peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";
  const invalidInputClass =
    " peer h-full w-full rounded-md border border-red-600 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-600 placeholder-shown:border-t-red-600 focus:border-2 focus:border-red-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-red-600";
  const validLabelClass =
    "block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";
  const invalidLabelClass =
    "block text-red-600 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-red-600 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-red-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-red-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-red-600 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-600 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-red-600";
/**
 * Handles the form submission when the user clicks the "Sign Up" button.
 *
 * @param {Event} event - The form submission event.
 */
const handleSubmit = async (event) => {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const data = {
    username: formdata.get("username"),
    password: formdata.get("password"),
    firstname: formdata.get("firstname"),
    lastname: formdata.get("lastname"),
    email: formdata.get("email"),
    confirm: formdata.get("confirm"),
  };

  try {
    // Send a POST request to the register endpoint with the form data
    // Show a loading toast message while the request is being processed
    const responseRegister = await toast.promise(
      axios.post(Register_URL, data),
      {
        pending: 'Loading...',
        success: 'You have registered successfully'
      },
    ); 

    // If the registration request is successful (status code 201),
    // log the user in by sending a POST request to the login endpoint
    if (responseRegister.status === 201) {
      const responseLogin = await axios.post(
        '/login',
        JSON.stringify({ username: data.username, pwd: data.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Extract the access token, roles, username, and password from the login response
      const accessToken = responseLogin?.data?.accessToken;
      const roles = responseLogin?.data?.roles;
      const user = data.username;
      const pwd = data.password;

      // Set the user authentication information using the useAuth hook
      setAuth({ user, pwd, roles, accessToken });

      // Navigate to the profile page
      navigate('/profile');
    }
  } catch (error) {
    // Handle error response
    if (error.response) {
      const { data } = error.response;

      // Check the error message and update the state accordingly
      if (data.message === "username taken already please try somthing else.") {
        setError("Username is already taken.");
        setUsernameBorderColor(false);
      } else if (data.message === "Some fields does not meet the requirements.") {
        setError("The password and the confirm must match."); 
        setPasswordBorderColor(false);
        setConfirmPasswordBorderColor(false);
      } else if (data.message === "email taken already please try somthing else.") {
        setError("Email is already taken."); 
        setEmailBorderColor(false);
      } else {
        setError(data.message); 
      }
    } else {
      setError("An error occurred.");
    }
  }
};

  return (
    <div>
      <form className="flex h-full flex-col items-center justify-evenly" onSubmit={handleSubmit}>
        <label htmlFor="header" className="text-4xl uppercase font-bold">Sign up</label>
        <div className="relative h-11 w-full min-w-[200px] mt-8 mb-2 ">
          <input
            className={
              usernameBorderColor ? validInputClass : invalidInputClass
            }
            type="text"
            name="username"
            minLength="4"
            autoFocus
            autoComplete="true"
            value={username}
            onChange={(e) => {
              setUser(e.target.value);
              setUsernameBorderColor(true);
              setError(null);
            }}
            required
          />
          <label
            className={
              usernameBorderColor ? validLabelClass : invalidLabelClass
            }
          >
            Username
          </label>
        </div>

        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={
              passwordBorderColor ? validInputClass : invalidInputClass
            }
            type="password"
            name="password"
            minLength="8"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordBorderColor(true);
              setConfirmPasswordBorderColor(true);
              setError(null);
            }}
            required
          />
          <label
            className={
              passwordBorderColor ? validLabelClass : invalidLabelClass
            }
          >
            Password
          </label>
        </div>

        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={
              confirmPasswordBorderColor ? validInputClass : invalidInputClass
            }
            type="password"
            name="confirm"
            minLength="8"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setConfirmPasswordBorderColor(true);
              setPasswordBorderColor(true);
              setError(null);
            }}
            required
          />
          <label
            className={
              confirmPasswordBorderColor ? validLabelClass : invalidLabelClass
            }
          >
            Confirm Password
          </label>
        </div>

        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={validInputClass}
            type="text"
            name="firstname"
            minLength="1"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label className={validLabelClass}>First name</label>
        </div>
        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={validInputClass}
            type="text"
            name="lastname"
            minLength="1"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label className={validLabelClass}>Last name</label>
        </div>
        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={emailBorderColor ? validInputClass : invalidInputClass}
            type="email"
            name="email"
            minLength="11"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailBorderColor(true);
              setError(null);
            }}
            required
          />
          <label
            className={emailBorderColor ? validLabelClass : invalidLabelClass}
          >
            Email
          </label>
          {errorMsg && errorMsg.includes("email") && (
            <p className="text-red-500 text-sm">Email is already taken.</p>
          )}
        </div>

        <div className="text-right mb-10 mt-auto">

          <button
            type="submit"
            className="mt-6 block w-full select-none rounded-lg bg-orange-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Sign Up
          </button>
   

        <p className="mt-4 block font-small text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            Already have an account?
            <button
              type="button"
              onClick={() => setView("login")}
              className="font-medium text-orange-500 transition-colors hover:text-orange-800"
              href="#"
            >
              Login
            </button>
          </p>
          {errorMsg && <p className="bt-6 text-red-500 text-sm">{errorMsg}</p>}
              </div> 
      </form>
        <ToastContainer/> 
    </div>
  );
};

export default SignUp;
