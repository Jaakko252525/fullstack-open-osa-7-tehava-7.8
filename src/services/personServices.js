
import axios from 'axios'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = (url) => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = async (url,newObject) => {

  const response = await axios.post(url, newObject)
  return response.data
}

const update = (id, url,newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
    getAll,
    create,
    update,
    setToken
     }


