import axios from "axios";


const AddComplaint = async (formData, token) => {
   

   const options = {
      headers: {
         Authorization: `Bearer ${token}`,  
         "Content-Type": "application/json"
      }
   };
   console.log(options);

   const response = await axios.post('/api/car/', formData, options);
   
   return response.data;
};


const fetchComplaints = async (token) => {
   

   const options = {
      headers : {
         authorization: `Bearer ${token}`  
      }
   }

   const response = await axios.get('/api/car' , options)
   return response.data
};

const fetchComplaint = async (id, token) => {
   
   const options = {
      headers : {
         authorization: `Bearer ${token}`  
      }
   }

   const response = await axios.get(`/api/car/${id}` , options)
   return response.data
};

const updateComplaint = async (id, token) => {
  
   
   const options = {
      headers : {
         authorization: `Bearer ${token}`, 
      }
   }

   const response = await axios.put(`/api/car/${id}` ,{status : "close"} , options)
   console.log(response.data)
   return response.data
};


const fetchAllComplaint = async (token) => {
   
   const options = {
      headers : {
         authorization: `Bearer ${token}`  
      }
   }

   const response = await axios.get(`/api/admin/complaints` , options)
   console.log(response.data)
   
   return response.data
};


const complaintsService = { fetchComplaints , fetchComplaint , updateComplaint, fetchAllComplaint, AddComplaint};


export default complaintsService;