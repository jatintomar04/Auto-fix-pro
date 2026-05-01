import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { closeComplaint, getComplaint } from '../features/complaints/ComplaintsSlice';
import { addComments, getComments } from '../features/comments/commentsSlice';

const CarDetails = () => {
  

  const [text, setText]= useState("");

  
  const {isLoading, isError,message, singleComplaints} = useSelector((state) =>state.complaint)
  const {comments} = useSelector(state => state.comment)
  

const handleCloseComplaint = (id) => {
  dispatch(closeComplaint(id))
}



// handle add comments 

const handleAddComment = (e) => {
  e.preventDefault()

  if(!text){
    toast.error("Empty Comment")
    return
  }

  dispatch (addComments({
    id : id , text : text
  }));
  setText (" ")
}


  const dispatch = useDispatch()
  const {id} = useParams()
  

  useEffect(()=> {
    dispatch(getComplaint(id))
    dispatch(getComments(id))

    if(isError && message) {
      toast.error(message)
    }

  },[isError, message ]);
   
  if(isLoading){
    return <Loading />
  }
  




  return (
    <div className="min-h-screen  bg-gray-50 flex items-center justify-center py-22 px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        {/* Car Info Section */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
          <img
            src={singleComplaints.carImage}
              alt="Car"
             className="w-64 h-40 object-cover rounded-lg shadow-md border border-gray-300"
                 />
          </div>
          <div className="flex flex-col md:flex-grow">
            <h2 className="text-3xl font-bold text-gray-900">{singleComplaints.car}</h2>
            <p className="text-sm text-gray-500 mt-1">Registration: <span className="font-medium">{singleComplaints.registration}</span></p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              <strong>Issue:</strong> {singleComplaints.description}
            </p>

            {/* Status Label */}
            <div className="mt-4 flex items-center space-x-4">
              <span className="inline-flex items-center px-4 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                {singleComplaints.status}
              </span>
              <button onClick={()=>handleCloseComplaint(singleComplaints._id)} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-md transition">
                Close Complaint
              </button>
            </div>
          </div>
        </div>
        
  
        {/* Comment History */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900">Comment History</h3>
          <div className="mt-3 space-y-2">
          
          {
  comments.map((comment, index) => (
    <p
      key={comment._id}
      className={`p-3 rounded-lg border border-gray-300 shadow-sm ${
        comment.isAdmin ? "bg-yellow-100" : "bg-gray-100"
      }`}
    >
      <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
      {comment.isAdmin && (
        <span className="text-xs text-white bg-blue-500 rounded-md px-2 py-0.5 ml-2">
          Admin
        </span>
      )}
      <span className="block font-semibold text-gray-800">{comment.text}</span>
    </p>
  ))
}

          </div>
        </div>

        {/* Comment Box */}
        <form onSubmit={handleAddComment} className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900">Comments</h3>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring focus:ring-blue-300"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Add Comment
          </button>
        </form>



        {/* Footer Section */}
        <div className="mt-8 text-center text-gray-500">
          <p className="text-sm">&copy; 2025 AutoFix Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
