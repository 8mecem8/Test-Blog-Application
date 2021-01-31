import React from 'react'






const BlogForm = ({postBlog}) => {

 
 const postNewBlog = async () => {
       
            postBlog({
          title: document.getElementById('inputTitle').value,
          author: document.getElementById('inputAuthor').value,
          url: document.getElementById('inputUrl').value, })

}




    return (
 <div>
      
      <form onSubmit={postNewBlog}>
        <div>Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input id='inputTitle' placeholder='Example The sky is blue'></input></div>&nbsp;
        <div>Author: &nbsp;<input id='inputAuthor' placeholder='Example John wick'></input></div>&nbsp;
        <div>Url:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input id='inputUrl' placeholder='Example www.zurna.com'></input></div>&nbsp;<br/> 
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button>Create</button>
      </form>
          <br/><br/>
         
    </div>

    )}


    export default BlogForm