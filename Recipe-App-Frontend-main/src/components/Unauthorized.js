import { useNavigate } from "react-router-dom";

/**
 * Represents a page component displayed when a user is unauthorized to access a certain page.
 */
const Unauthorized = () => {
  const navigate = useNavigate();

  /**
   * Handles the "Go Back" button click event.
   * Navigates back to the previous page in the browser's history.
   */
  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
};

export default Unauthorized;
