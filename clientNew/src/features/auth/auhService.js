import axios from 'axios'


const register = async(formData) => {
   const base_url = import.meta.env.VITE_BASE_URL; // ✅ Correct for Vite
   const response = await axios.post(`${base_url}/api/auth/register`, formData);
   localStorage.setItem("user", JSON.stringify(response.data));
  
   return response.data
}


const login = async(formData) => {
  
   console.log(formData)
   const response = await axios.post(`${base_url}/api/auth/login`, formData);
   localStorage.setItem("user", JSON.stringify(response.data));
   console.log(response.data)
   return response.data
}



const authService = {register , login};

export default authService;