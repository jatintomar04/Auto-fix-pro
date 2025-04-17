import axios from 'axios'
import { ApiUrl } from '../../config';

const register = async(formData) => {
   console.log(formData)
   const response = await axios.post(`${ApiUrl}/api/auth/register`, formData);
   localStorage.setItem("user", JSON.stringify(response.data));
   return response.data
}


const login = async(formData) => {
 
   const response = await axios.post(`${ApiUrl}/api/auth/login`, formData);
   localStorage.setItem("user", JSON.stringify(response.data));
   return response.data
}



const authService = {register , login};

export default authService;