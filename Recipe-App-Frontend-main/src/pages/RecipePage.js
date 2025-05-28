import useAxios from "../hooks/useAxios";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import RatingSection from "../components/RatingSection";
import useImage from "../hooks/useImage";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FaTrash, FaClock, FaStar } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
/** Recipe page */
const RecipePage = () => {
   // Custom hook for private axios instance
  const axiosPrivate = useAxiosPrivate();
  const getImage = useImage;
  let { id } = useParams();
  const [EditSection, setIsEditSection] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [editComment, setEditComment] = useState("");
  const [isCommented, setIsCommented] = useState(false);
  const [rating, setRating] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [changeRating, setChange] = useState(false);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Fetch recipe data
  const [data, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `recipe/${id}`,
    requestConfig: {
      "Content-Language": "en-US",
    },
  });

   // Fetch user data
  const [user, erroruser, loadinguser] = useAxios({
    axiosInstance: axiosPrivate,
    method: "GET",
    url: `user`,
    requestConfig: {
      "Content-Language": "en-US",
    },
  });

  // Fetch comments data
  const [comments, commentserror, commentsloading, refetch] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `comments/${id}`,
    requestConfig: {
      "Content-Language": "en-US",
    },
  });

  // Save edited comment and update it
  const handleSaveChanges = async (comment) => {
    try {
      const toast_id = toast.loading("Please wait...");
      // eslint-disable-next-line
      const response = await axiosPrivate.put(`comments/${comment._id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: {
          comment: editComment,
          rating: rating,
        },
      });

   
      toast.update(toast_id, {
        render: `Your comment has been update.`,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "info",
        isLoading: false,
      });
      await refetch();
      setIsEdit(false);
    } catch (error) {
   
      setErrorMsg(data.message);
    }
  };

   // Delete comment and update comments list
  const handlDeleteComment = async (comment) => {
    try {
      const toast_id = toast.loading("Please wait...");
      // eslint-disable-next-line
      const response = await axiosPrivate.delete(`comments/${comment._id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
     
      toast.update(toast_id, {
        render: `Your comment has been deleted.`,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "info",
        isLoading: false,
      });
      await refetch();
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isCommented) refetch();
    return () => {
      setIsCommented(false);
    };
    // eslint-disable-next-line
  }, [isCommented]);

  return (
    <article className="mt-1">
      {loading && <p>Loading ..</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && data !== null && (
        <article className="w-3/4 mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="relative">
            <img
              src={getImage(data.Image)}
              alt={data.recipeName}
              className="h-64 w-full object-cover rounded-t-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2 text-white">
              <h2 className="text-2xl font-bold">{data.recipeName}</h2>
            </div>
          </div>
          <section className="px-4 py-3">
            <p className=" font-bold text-gray-900 pt-2 mb-3">
              Author:{data.author}
            </p>
            <p className="text-gray-600">
              <b>Callories:</b> {data.recipeCallories}
            </p>
            <div className="w-full flex items-center">
              <FaClock className="mr-2 text-black" />
              <p className="text-gray-600">
                <b>Cooking time: </b>
                {data.recipeTime}
              </p>
            </div>
          </section>
          <section className="px-4 py-3 bg-gray-100">
            {!commentsloading && !commentserror && comments !== null && (
              <RatingSection comments={comments} />
            )}
          </section>
          <section className="flex flex-col">
            <div>
              <h3 className="mt-5 font-bold">Ingredients:</h3>
              <ul
                className="flex flex-col hover:list-inside
              list-disc list-inside text-slate-700 bg-white ring-1 ring-slate-900/5 p-4 pl-8 "
              >
                {data &&
                  data.recipeIngredients &&
                  data.recipeIngredients.map((ingrdeent, index) => (
                    <li key={index}>{ingrdeent}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="mt-5 font-bold">Categories:</h3>
              <ul
                className="flex flex-col list-inside hover:list-inside
              list-disc text-slate-700 bg-white ring-1 ring-slate-900/5 p-4 pl-8 "
              >
                {data &&
                  data.recipeCategorys &&
                  data.recipeCategorys.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
              </ul>
            </div>
            <div>
            <h3 className="mt-5 font-bold">Description:</h3>
              {data.recipeDescription && (data.recipeDescription).split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </section>
        </article>
      )}
      <CommentSection setIsCommented={setIsCommented}></CommentSection>
      <h3 className="mb-4 w-3/4 mx-auto text-lg font-semibold text-gray-900">
        Comments
      </h3>
      {commentsloading && <p>Loading Comments ..</p>}
      {!commentsloading && commentserror && <p>{commentserror}</p>}
      {!commentsloading && !commentserror && comments !== null && (
        <article>
          {comments.map((singleComment, index) => (
            <section
              key={singleComment._id}
              className={`${
                index > 0 ? "mt-4" : ""
              } w-3/4 mx-auto border rounded-lg px-4 py-2 sm:px-6 sm:py-4 bg-gray-100`}
            >
              <h3 className="text-xl font-bold mb-2 text-amber-500">
                {singleComment.author}
              </h3>
              {isEdit && EditSection === singleComment._id ? (
                <div>
                  <p>
                    <input
                      className="text-gray-800 mb-4 rounded-md bg-gray-300 border border-3 focus:border-orange-500 focus:outline-none"
                      type="text"
                      placeholder={`${singleComment.comment}`}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      name=""
                      id=""
                    />
                  </p>
                  <p className="flex justify-start">
                    Rating:
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className={`text-zinic-400 focus:outline-none ${
                              rating >= star
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            onMouseEnter={() => handleRatingChange(star)}
                            onMouseLeave={() =>
                              !changeRating && handleRatingChange(0)
                            }
                            onClick={() => {
                              setChange(true);
                              handleRatingChange(star);
                            }}
                            onDoubleClick={() => setChange(false)}
                          >
                            <FaStar />
                          </button>
                        ))}
                      </div>
                    </div>
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-800 mb-4">{singleComment.comment}</p>
                  <p className="text-gray-700">
                    Rating: {singleComment.rating}{" "}
                  </p>
                </div>
              )}
              {!loadinguser &&
                !erroruser &&
                singleComment.author === user.username && (
                  <article className="flex ml-auto flex-col items-end justify-evenly">
                    {isEdit && EditSection === singleComment._id && (
                      <button
                        className="flex mb-5 bg-lime-300 border-2 border-green-400 rounded-md px-3 py-1.5 p-auto items-center justify-center hover:bg-green-500"
                        onClick={() => {
                          handleSaveChanges(singleComment);
                        }}
                      >
                        <BiEdit className=" text-lg mr-2" />
                        Save changes
                      </button>
                    )}
                    <button
                      className="flex bg-amber-300 border-2 border-amber-400 rounded-md px-3 py-1.5 p-auto items-center justify-center hover:bg-yellow-500"
                      onClick={() => {
                        setIsEdit((prev) => !prev);
                        setEditComment("");
                        handleRatingChange(0);
                        setIsEditSection(singleComment._id);
                      }}
                    >
                      <BiEdit className=" text-lg mr-2" />
                      Edit Comment
                    </button>
                    <button
                      className="flex mt-5 bg-rose-300 border-2 border-rose-400 rounded-md px-3 py-1.5 p-auto items-center justify-center hover:bg-red-500"
                      onClick={() => handlDeleteComment(singleComment)}
                    >
                      <FaTrash className=" text-lg mr-2" />
                      Delete Comment
                    </button>
                  </article>
                )}
            </section>
          ))}
          
        </article>
      )}
       {errorMsg && <p className="text-red-500 font-bold text-1xl mt-5">{errorMsg}</p>}
      <ToastContainer />
    </article>
  );
};
//

export default RecipePage;
