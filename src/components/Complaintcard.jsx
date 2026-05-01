import { Link } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../pages/Loading';
import { getComplaint, getComplaints } from '../features/complaints/ComplaintsSlice';

const Complaintcard = ({complaint}) => {

    const {isLoading, isError, isSuccess,message, allComplaints} = useSelector((state) =>state.complaint)
  
   

  useEffect(()=> {
 

    if(isError && message) {
      toast.error(message)
    }

  },[isError, message]);
   
  if(isLoading){
    return <Loading />
  }
  

  return (
    <div className="bg-white my-2 shadow overflow-hidden sm:rounded-md">
    <ul className="divide-y divide-gray-200 ">
      {/* Example of a complaint card */}
      <li>
        <div className="px-4 py-4  sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-600 w-12">#12345</p>
              <p className="text-sm font-medium text-gray-900 mx-1 truncate">{complaint.car}</p>
              <p className="text-sm font-medium text-gray-600 mx-1 truncate">{complaint.registration}</p> {/* Added registration number */}
            </div>
            <div className="flex items-center space-x-4">
              {/* Status Badge */}
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {complaint.status}
              </span>
              <Link
                to={`/car/complaint/${complaint._id}`}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                {/* Eye icon */}
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4-4m0 0l4 4m-4-4v12m-4 0h-6a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2z" />
                </svg>
                View Details
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <div className="sm:flex sm:justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <p>{complaint.createdAt}</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
             {complaint.description}
            </p>
          </div>
        </div>
      </li>
      {/* Repeat for more complaints */}
    </ul>
  </div>
  )
}

export default Complaintcard