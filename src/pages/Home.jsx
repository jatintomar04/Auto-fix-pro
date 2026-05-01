import React from 'react'
import { FaCarSide } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { SiSpeedtest } from "react-icons/si";
import { IoCall } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Home = () => {


  const {user} = useSelector((state)=>state.auth)


  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div 
        className="pt-16 relative bg-cover bg-center h-[600px]" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Trusted Car Repair Service
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto px-4">
              Professional auto repair services to keep your vehicle running at its best
            </p>
          
         {
          user?.isAdmin ? (<>
             <div className="flex justify-center space-x-4">
          <Link to={'/car/all-users'} className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-semibold">
          All Users
         </Link>
         <Link to={'/car/all-complaints'} className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-semibold">
         All Complaints
       </Link>
        </div>
          </>):(
            <>
               <div className="flex justify-center space-x-4">
          <Link to={'/car/raise-complaint'} className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-semibold">
          Raise Complaint
         </Link>
         <Link to={'/car/all-complaints'} className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-semibold">
         My Complaints
       </Link>
        </div>
            </>
          )
         }
          
           
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<FaCarSide className="h-8 w-8" />}
              title="Engine Repair"
              description="Complete engine diagnostics and repair services to keep your car running smoothly"
            />
            <ServiceCard 
              icon={<FaRegDotCircle className="h-8 w-8" />}
              title="Brake Service"
              description="Professional brake inspection and repair for your safety on the road"
            />
            <ServiceCard 
              icon={<SiSpeedtest className="h-8 w-8" />}
              title="Tire Service"
              description="Tire rotation, balancing, and replacement services for optimal performance"
            />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Your Car Fixed?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our expert mechanics are here to help with any car problems
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 text-lg font-semibold flex items-center mx-auto">
            <IoCall className="h-5 w-5 mr-2" />
            Contact Us
          </button>
        </div>
      </div>

      
    </div>
    
  );
}

// Updated ServiceCard without TypeScript annotations
function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
  

export default Home