import React, { useState, useEffect,useCallback } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import noteService from './services/setto'
import {token} from './services/setto'
import Togglable from '../src/components/Togglable'
import BlogForm from './components/BlogForm'



const App = () => {
  const [sos, setsos] = useState([])
  
  const [blogs, setBlogs] = useState([])
  const blogSorted = blogs.sort((at, ut) => ut.likes - at.likes )
  
  const [errorMessage, setErrorMessage] = useState('')
  const [Message, setMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) //{'name': 'zafer'}
  


 

 //console.log(sos)
 //console.log('message is ====',kur)
//console.log('deneme teknik is ',blogService.putLike)

  useEffect(() => {
    blogService.getAll().then(blog => setBlogs( blog ))}, [])


useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON === undefined) {console.log('loggedUserJSON is undefined')}

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService(user.token)
    }
  }, [])





const handleLogin = async (event) => {
    event.preventDefault()
    
    
   try {
      const user = await loginService({username, password,})

          console.log('user in handlelogin ===',user)


      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      
      noteService(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } 
    
    
    catch (exception)
     {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }}
//-----------------------------------------------------------------


const Alert = () => {

 if(errorMessage === ('')) {return <div></div>}
 
 else {
                console.log('error message is ',errorMessage)
return (
    <div className={'error'}>
      
      {errorMessage}
    
      
    </div>
  )
}
}

//------------------------------------------------------------------
 const postNewBlog = async (newBlogContent) => {
      
  console.log('newBlogContent is===========',newBlogContent)
try{
           
            const config = {headers: { Authorization: token}}
            /*const newBlogContent = {
          title: document.getElementById('inputTitle').value,
          author: document.getElementById('inputAuthor').value,
          url: document.getElementById('inputUrl').value, }*/

      blogService.postBlog(newBlogContent,config)
         
 }catch(err) {setErrorMessage('Posting Blog  has not done' );  setTimeout(() => {setErrorMessage('')}, 9000)}
}
//--------------------------------------------------------------------

const loginForm = () => (
        <form onSubmit={handleLogin}>
            
        <div>
      <h2>
        Log in to application
      </h2>      
      </div>
       


        <div>
          username:
            &nbsp;
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
        />
        </div>
        <br/>
        <div>
           password:
            &nbsp;
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      )

//--------------------------------------------------------------------------



  const kuku = () => {setsos('kurna')
  }


const mainContent = () => (
  
  
  <>
  <h1>Blogs</h1>
  <Togglable buttonLabel={'New Blog'}>
  <BlogForm postBlog={postNewBlog}/>
  </Togglable>

  <div>
     <h2>Blogs Content</h2>
     <div>
      {blogSorted.map(blog =>
        <Blog key={blog.id} blog={blog} setstater={kuku} />
      )}
    </div>
</div>
</>
)

//---------------------------------------------------------------------------


  return (
    <div>
        <Alert/>

    { user === null ?
       loginForm():


        <div>
           
        <p><button onClick={() => {setUser(null); window.localStorage.removeItem('loggedNoteappUser') }}>Log out</button>&nbsp;&nbsp;&nbsp;{user.name} <span>Logged in</span> </p>
       {mainContent()}
        </div>
      
      }
     </div> 

  )
}

export default App