import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify"
import Loading from './Loading'
import { Link } from 'react-router-dom';
import { getAllComplaints, getComplaints } from '../features/complaints/ComplaintsSlice';
import Complaintcard from '../components/Complaintcard';

const AllComplaints = () => {

  const {user} = useSelector((state)=> state.auth)


  const {isLoading, isError, isSuccess,message, allComplaints} = useSelector((state) =>state.complaint)
  
  const dispatch = useDispatch()

  
  
  useEffect(()=> {
    if (user.isAdmin) {
      dispatch(getAllComplaints());
    } else {
      dispatch(getComplaints());
    }

    if(isError && message) {
      toast.error(message)
    }

  },[isError, message]);
   
  if(isLoading){
    return <Loading />
  }
  
  
  
  return (
  
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
            <p className="mt-2 text-sm text-gray-600">Track and manage your vehicle service complaints</p>
          </div>
          <Link
            to="/car/raise-complaint"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Raise New Complaint
          </Link>
        </div>

       {
        allComplaints.map(complaint => {
          return <Complaintcard key={complaint._id} complaint={complaint} />
        })
       }
       
      </div>
    </div>
  );
};

export default AllComplaints;
