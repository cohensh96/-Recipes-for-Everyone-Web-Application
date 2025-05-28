import { useRef, useEffect, useState } from 'react';
import Login from './Login';
import SignUp from './signUp';
import logo from "../Logo.png";
import { NavLink } from 'react-router-dom';

/**
 * Represents a popup component for login and signup.
 * @param {Object} props - The component props.
 * @param {Function} props.setIsLogin - A function to set the login state.
 * @returns {JSX.Element} The Popup component.
 */
const Popup = ({ setIsLogin }) => {
  const [view, setView] = useState('login');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        setIsLogin(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setIsLogin]);

  return (
    <section className="z-50 fixed w-full h-full flex justify-end items-end md:justify-center md:items-center bg-gray-800/60">
      <article
        ref={wrapperRef}
        className="h-3/4 flex flex-col w-full md:w-3/6 md:h-fit lg:w-1/4 relative bg-gray-100  items-center p-4 rounded-md"
        onClick={undefined}
      >
        <NavLink to="/" onClick={() => setIsLogin(false)}>
          <img src={logo} className='hidden md:mx-auto md:grid md:place-content-center' alt="logo" width={100} height={100} />
        </NavLink>
        <section
          className="text-3xl absolute top-0 right-0 m-5 hover:fill-orange-500 cursor-pointer"
          onClick={() => setIsLogin(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </section>
        <div className="popup h-full md:h-full md:my-auto lg:w-3/4">
          {view === 'login' ? <Login setView={setView} setIsLogin={setIsLogin} /> : <SignUp setView={setView} />}
        </div>
      </article>
    </section>
  );
};

export default Popup;
