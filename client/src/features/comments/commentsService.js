import axios from "axios"
import { ApiUrl } from "../../config"

const feathComments = async(token, id) => {

    let options = {
        headers :{
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`${ApiUrl}/api/car/${id}/comment`, options)
    return response.data
}

const createComments = async(formData ,token) => {

    let options = {
        headers :{
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(`${ApiUrl}/api/car/${formData.id}/comment`,formData, options)
    return response.data
}



const commentService = {
    feathComments,
    createComments
}



export default commentService