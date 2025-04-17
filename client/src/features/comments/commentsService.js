import axios from "axios"

const feathComments = async(token, id) => {

    let options = {
        headers :{
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`/api/car/${id}/comment`, options)
    return response.data
}

const createComments = async(formData ,token) => {

    let options = {
        headers :{
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(`/api/car/${formData.id}/comment`,formData, options)
    return response.data
}



const commentService = {
    feathComments,
    createComments
}



export default commentService