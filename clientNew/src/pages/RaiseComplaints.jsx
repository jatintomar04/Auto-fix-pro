import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { raiseComplaint } from '../features/complaints/ComplaintsSlice';

const RaiseComplaints = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // State to manage form data
  const [formData, setFormData] = useState({
    
    user: user?.id || '',
    car: '',
    description: '',
    registration: '',
    carImage: '',
    status: 'open',
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { user, car, description, registration, carImage } = formData;
    console.log(formData)

    if (!user || !car || !description || !registration || !carImage) {
      toast.error("Please fill all the fields!");
      return;
    }

    // Dispatch the complaint
    dispatch(raiseComplaint(formData));
    toast.success("Complaint submitted successfully!");

    // Clear the form
    setFormData({
      user: user?._id || '',
      car: '',
      description: '',
      registration: '',
      carImage: '',
      status: 'open',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-22 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Submit a Complaint</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please provide details about your vehicle issue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner's Name</label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                value={user?.name || ''}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="registration" className="block text-sm font-medium text-gray-700">Registration Number</label>
              <input
                id="registration"
                name="registration"
                type="text"
                value={formData.registration}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="e.g. ABC-123"
              />
            </div>

            <div>
              <label htmlFor="car" className="block text-sm font-medium text-gray-700">Car Model</label>
              <select
                id="car"
                name="car"
                value={formData.car}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="" disabled>Select a car model</option>
                <option value="scorpio">Scorpio</option>
                <option value="thar">Thar</option>
                <option value="xuv700">XUV 700</option>
                <option value="3xo">3XO</option>
                <option value="bolero">Bolero</option>
              </select>
            </div>

            <div>
              <label htmlFor="carImage" className="block text-sm font-medium text-gray-700">Vehicle Photo URL</label>
              <input
                id="carImage"
                name="carImage"
                type="url"
                value={formData.carImage}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Issue Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Please describe the issue"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RaiseComplaints;
