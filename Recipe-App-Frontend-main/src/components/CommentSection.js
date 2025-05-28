import { useState,useRef } from 'react';
import { FaStar, FaComment } from 'react-icons/fa';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Component for the comment section.
 * Allows users to leave comments and ratings.
 * @param {Function} setIsCommented - Callback function to update the state of whether a comment is posted.
 */
const CommentSection = ({ setIsCommented }) => {
  const toastId = useRef(null);
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [rating, setRating] = useState(0);
  const [changeRating, setChange] = useState(false);
  const [commentText, setComment] = useState('');

  /**
   * Handles the change in rating.
   * @param {number} newRating - The new rating value.
   */
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  /**
   * Handles the change in the comment text.
   * @param {object} event - The input change event.
   */
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  /**
   * Handles the submission of the comment.
   * @param {object} event - The form submission event.
   */
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const data = {
      comment: commentText,
      rating: rating,
    };

    try {
      const response = await axiosPrivate.post(`/comments/${id}`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      setIsCommented(true);
      setComment("");
      setRating(0);

      toastId.current = toast.success('You have posted a new comment', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if(! toast.isActive(toastId.current))
      {
        toastId.current = toast.error(`${(error?.response?.data?.message) ? error.response.data.message : error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return;
    }
  };

  return (
    <section className="w-3/4 mx-auto border rounded-lg px-4 py-6 sm:px-6 sm:py-8 bg-gray-100">
      <ToastContainer />
      <div className='flex'>
        <h3 className="text-lg font-bold mb-2 text-orange-600 mr-2">Leave a Comment</h3>
        <FaComment className='fill-[#f97315]' />
      </div>
      <div className="flex items-center mb-4">
        <p className="text-gray-700 mr-2">Rating:</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-zinic-400 focus:outline-none ${
                rating >= star ? 'text-yellow-500' : 'text-gray-300'
              }`}
              onMouseEnter={() => handleRatingChange(star)}
              onMouseLeave={() => !changeRating && handleRatingChange(0)}
              onClick={() => {
                setChange(true)
                handleRatingChange(star)
              }}
              onDoubleClick={() => setChange(false)}
            >
              <FaStar />
            </button>
          ))}
        </div>
      </div>
      <textarea
        className="w-full border rounded-md px-3 py-2 mb-4 text-gray-800"
        placeholder="Write your comment..."
        value={commentText}
        onChange={handleCommentChange}
      ></textarea>
      <button className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600" onClick={(e) => handleCommentSubmit(e)}>
        Submit
      </button>
    </section>
  );
};

export default CommentSection;