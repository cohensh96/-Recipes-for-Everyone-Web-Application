import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';

const AdminComments = () => {
    // Custom hook for private axios instance
    const axiosPrivate = useAxiosPrivate();
    // State variables
    const [usersList, error, loading, refetch] = useAxios({
        axiosInstance: axiosPrivate,
        method: 'GET',
        url: 'user/handle',
        requestConfig: {
          'Content-Language': 'en-US',
        },
    });
    const [selectedComment, setSelectedComment] = useState(null);
    const [userComment, setUserSelectedComment] = useState(null);
    const [isLoadingCommnets, setLoading] = useState(false);
    const [isError, setError] = useState("");
    const [comments, setComments] = useState([]);

    // Function to delete a comment
    const handlDeleteComment = async(comment) => {
        try {
          // Show a loading toast while the delete request is being processed
          const toast_id = toast.loading("Please wait...")
          // eslint-disable-next-line
          const response = await axiosPrivate.delete(`comments/${comment._id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          // Update the loading toast with a success message
          toast.update(toast_id, 
          { render: `comment has been deleted.`,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored", type: "info", isLoading: false });      
          await refetch();
          setSelectedComment(null);
    
        } catch (error) {
            if(!isError)
            {
              setError(error.response.data.message);
            }
        }
      }
    // Fetch comments when a user is selected
    useEffect(() => {
        if(selectedComment != null)
        {
            // Fetch comments for the selected user
            const fetchCommentsUser = async() => {
                try {
                    const response = await axiosPrivate.get(`comments/admin/${selectedComment.username}`);
                    setComments(response.data);
                } catch (error) {
                    setError(error.message);
                }
                finally
                {
                    setLoading(false);
                }
            }
            fetchCommentsUser();
        }
        // eslint-disable-next-line
    },[selectedComment])
    
    // Handle click on a comment
    const handleCommentClick = (comment) => {
      setUserSelectedComment(comment.comment);
  }

  // Handle click on a user
  const handleUserClick = (user) => {
    setSelectedComment(user);
  };
  
    return (
      <section className="p-4">
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className='row-span-2'>
            <h2 className="text-lg font-bold mb-4">User List</h2>
            <div className="bg-white rounded shadow overflow-hidden">
              {usersList &&
                usersList.map((user) => (
                  <div
                    key={user._id}
                    className={`cursor-pointer px-4 py-2 border-b border-gray-200 ${
                        selectedComment && selectedComment._id === user._id
                        ? 'bg-blue-100'
                        : ''
                    }`}
                    onClick={() => handleUserClick(user)}
                  >
                      <div className='flex justify-between'>
                      <p className="text-gray-700">{user.username}</p>
  
                      </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 order-2">Comments List of User Details</h2>
            <div className="bg-white rounded shadow p-4">
              {selectedComment ? 
                (comments.length > 0 ? 
                    ( <article>
                        {isLoadingCommnets && <p>Loading...</p>}
                        {!isLoadingCommnets && isError && <p>{isError.message}</p>}
                        {comments.map(comment => (
                            <div key={comment._id} onClick={() => handleCommentClick(comment)}>
                                <div className={`cursor-pointer px-4 py-2 border-b border-gray-200 ${userComment && userComment._id === comment.comment._id
                        ? 'bg-blue-100': ''}`}>
                                    <p className="text-gray-700">Recipe Name: {comment.recipe[0].recipeName}</p>
                                    <p className="text-gray-700">Comment: {comment.comment.comment}</p>
                                </div> 
                        </div>
                        ))}
                    </article>
                    )
                    : 
                    (   
                    <p>User have no comments</p>
                    )
                ) 
              : 
              (
                <p>Please select a Recipe to view details</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Actions</h2>
            <div className="bg-white rounded shadow p-4">
              {selectedComment && userComment  ? (
                <div className='flex flex-col w-fit'>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handlDeleteComment(userComment)}
                  >
                    Delete Comment
                  </button>
                </div>
              ) : (
                <p>Please select a user comment to perform actions</p>
              )}
            </div>
          </div>
        </div>
        <ToastContainer/>
      </section>
    );
}

export default AdminComments