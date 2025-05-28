import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LOGIN_URL = "/login";

/**
 * Component for the login form.
 * Allows users to enter their username and password to log in.
 * @param {Function} setView - Callback function to change the current view.
 * @param {Function} setIsLogin - Callback function to set the login status.
 */
const Login = ({ setView, setIsLogin }) => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameBorderColor, setUsernameBorderColor] = useState(true);
  const [passwordBorderColor, setPasswordBorderColor] = useState(true);

  // CSS class names for valid and invalid input fields
  const validInputClass = "peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";
  const invalidInputClass = "peer h-full w-full rounded-md border border-red-600 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-600 placeholder-shown:border-t-red-600 focus:border-2 focus:border-red-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-red-600";
  const validLabelClass = "block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";
  const invalidLabelClass = "block text-red-600 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-red-600 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-red-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-red-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-red-600 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-600 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-red-600";

  /**
   * Handles the form submission.
   * Attempts to log in the user using the provided username and password.
   * If successful, sets the authentication information and updates the login status.
   * If there's an error, displays an appropriate error message.
   * @param {Object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, password, roles, accessToken });
      setIsLogin(false);
      setUser("");
      setPassword("");
      // Navigate to the profile page
      navigate('/profile');
    } catch (error) {
      const { data } = error.response;
      setUsernameBorderColor(false);
      setPasswordBorderColor(false);
      if (data.message === "Missing few fields in user register.") {
        setError("Missing few fields.");
      } else if (data.message === "User not found.") {
        setError("Username not found.");
      } else if (data.message === "username or password dosent match.") {
        setError("Wrong username or password.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  /**
   * Toggles the "persist" state.
   * Updates the persistence setting when the "Trust this Device" checkbox is toggled.
   */
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <form
      className="flex h-full flex-col justify-evenly items-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor="header" className="text-4xl uppercase font-bold">
        Sign in
      </label>
      <div className="relative lg:h-11 w-full min-w-[200px] lg:mt-8 mb-2">
        <input
          className={usernameBorderColor ? validInputClass : invalidInputClass}
          type="text"
          name="username"
          placeholder=" "
          autoFocus
          autoComplete="true"
          value={user}
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

      <div className="lg:mt-4 relative h-11 w-full min-w-[200px]">
        <input
          className={
            passwordBorderColor ? validInputClass : invalidInputClass
          }
          type="password"
          name="password"
          id=""
          placeholder=" "
          minLength="6"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordBorderColor(true);
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

      <div className="text-right mb-10 w-full">
        <div className="persistCheck mt-3 flex justify-center items-end text-sm">
          <input
            className="h-5 w-5 m-1 accent-orange-300 focus:border-1 focus:border-orange-600"
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label className="m-0" htmlFor="persist">
            Trust this Device
          </label>
        </div>
        <button
          type="submit"
          className="
          mt-6 block w-full select-none rounded-lg bg-orange-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
          "
        >
          Log In
        </button>

        {error && <p className="bt-6 text-red-500 text-sm">{error}</p>}
      </div>
      <article className="">
        <p className="block font-small text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          Create new account?
          <button
            type="button"
            className="font-medium text-orange-500 transition-colors hover:text-orange-800"
            href="#"
            onClick={() => setView("signup")}
          >
            Sign Up
          </button>
        </p>
      </article>
    </form>
  );
};

export default Login;
