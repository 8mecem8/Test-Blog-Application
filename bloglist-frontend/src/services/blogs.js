import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => { return response.data})
}

const postBlog = (newContent, config) => {
   return axios.post(baseUrl, newContent, config)
  
  
}

const putLike = (likeNum,config) => {
  const request = axios.put(baseUrl,likeNum, config)
  return request.then(response => { return response.data})

}

export default { getAll,postBlog,putLike }