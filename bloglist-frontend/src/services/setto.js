export let token = null

 function setToken(newToken)  {
  token = `bearer ${newToken}`
  
}



export default setToken