import { NavLink } from "react-router-dom"
/**
 * Component for displaying an error page.
 *
 * This component is used to display a 404 error page when a requested page is not found.
 * It provides a message and a link to the home page for users to navigate back.
 *
 * Returns:
 *   The error page component.
 */
export default function ErrorPage() {
  return (
    
      <div className="mt-8 mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <NavLink to="/" className="inline-flex text-white bg-orange-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</NavLink>         
    </div>
  )
}

