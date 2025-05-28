import { useState, useRef } from 'react';
import useAxios from '../hooks/useAxios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';

const Adminpage = () => {
   // Custom hook for private axios instance
   const axiosPrivate = useAxiosPrivate();
   const toast_id = useRef(null);
   // State variables
   const [usersList, error, loading, refetch] = useAxios({
     axiosInstance: axiosPrivate,
     method: 'GET',
     url: 'user/handle',
     requestConfig: {
       'Content-Language': 'en-US',
     },
   });
   const [selectedUser, setSelectedUser] = useState(null);
   const [isEdit, setIsEdit] = useState(false);
 
   // Function to toggle the edit mode for a user
   const handleEditUser = (userId) => {
     setIsEdit(prev => !prev);
   };
 
   // Function to save the changes made to a user
   const handleSaveChanges = async (selectedUser) => {
     try {
       // Show a loading toast while the save request is being processed
      toast_id.current = toast.loading("Please wait...");
 
       // Determine the updated roles based on the current state
       const roles = selectedUser.roles.Admin ? { "User": 80085 } : { "Admin": 420420, "User": 80085 };
 
       // Prepare the data for the PUT request
       const data = {
         id: selectedUser._id,
         roles: roles
       }
 
       // Send a PUT request to update the user
        // eslint-disable-next-line
       const response = await axiosPrivate.put('user/handle', data, {
         withCredentials: true
       });
 
       // Update the loading toast with a success message
       toast.update(toast_id.current, {
         render: `${selectedUser.username} info has been updated.`,
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         type: "info",
         isLoading: false
       });
 
       // Refetch the user list after saving changes to update the UI
       await refetch();
       setSelectedUser(null);
     } catch (error) {
       // If an error occurs, update the loading toast with an error message
       toast.update(toast_id.current, {
         render: `${error}`,
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         type: "error",
         isLoading: false
       });
     }
   }
 
   // Function to delete a user
   const handleDeleteUser = async (selectedUser) => {
     try {
       // Show a loading toast while the delete request is being processed
       const toast_id = toast.loading("Please wait...");
 
       // Send a delete request to delete the user
      // eslint-disable-next-line
       const response = await axiosPrivate.delete(`user/handle`, {
         headers: { "Content-Type": "application/json" },
         data: {
           id: selectedUser._id
         },
         withCredentials: true,
       });
 
       // Update the loading toast with a success message
       toast.update(toast_id, {
         render: `${selectedUser.username} the user has been deleted.`,
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         type: "error",
         isLoading: false
       });
 
       // Refetch the user list after deletion to update the UI
       await refetch();
       setSelectedUser(null);
     } catch (error) {
       // If an error occurs, update the loading toast with an error message
       toast.update(toast_id, {
         render: `${error}`,
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         type: "error",
         isLoading: false
       });
     }
   };
 
   // Handle click on a user
   const handleUserClick = (user) => {
     setSelectedUser(user);
     setIsEdit(false);
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
                    selectedUser && selectedUser._id === user._id
                      ? 'bg-blue-100'
                      : ''
                  }`}
                  onClick={() => handleUserClick(user)}
                >
                  <p className="text-gray-700">{user.username}</p>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 order-2">User Details</h2>
          <div className="bg-white rounded shadow p-4">
            {selectedUser ? (
              <div>
                <div>
                  <p className="text-gray-700">Username: {selectedUser.username}</p>
                  <p className="text-gray-700">Firstname: {selectedUser.firstname}</p>
                  <p className="text-gray-700">Lastname: {selectedUser.lastname}</p>
                  <p className="text-gray-700">Email: {selectedUser.email}</p>
                  <p className="text-gray-700">Create Date: {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-700">Roles: {selectedUser.roles && 
                      <p className='roles flex flex-wrap'>
                          {Object.keys(selectedUser.roles).map((role, index, roles) => ( 
                          <span className='mr-1 font-bold' key={role}>{role}{index + 1 === (roles.length) ? "" : ","}</span>
                          ))}
                      </p>}
                  </p>
                </div>
              </div>
            ) : (
              <p>Please select a user to view details</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Actions</h2>
          <div className="bg-white rounded shadow p-4">
            {selectedUser ? (
              <div className='flex flex-col w-fit'>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                  onClick={() => handleEditUser(selectedUser)}
                >
                  Edit Permissions
                </button>
                {isEdit && 
                    <button
                    className={`${!selectedUser.roles.Admin ? "bg-green-500 hover:bg-green-700" : "bg-amber-400 hover:bg-yellow-600"} text-white font-bold py-2 px-4 rounded mb-2`}
                    onClick={() => handleSaveChanges(selectedUser)}
                    >
                    {!selectedUser.roles.Admin ? "Add as Admin" : "Remove from Admin"}
                  </button>}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteUser(selectedUser)}
                >
                  Delete User
                </button>
              </div>
            ) : (
              <p>Please select a user to perform actions</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default Adminpage;
