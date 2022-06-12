import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data) 
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request
  .then(response => response.data)

}

const remove = (objectid) => {
  const request = axios.delete(baseUrl+`/`+objectid.toString())
  return request.then(response => response)
}

const replace = (newobject) => {
  const request = axios.put(baseUrl+`/`+newobject.id,newobject)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove,
  replace: replace
}