import React, {useState} from 'react'
import blogService from '../services/blogs'
import {token} from '../services/setto'
import axios from 'axios'


const Blog = ({ blog, setstater }) => {
const [avisible, setAvisible] = useState()



const sendLike = async (att) => { try{const config = {headers: { Authorization: token}}; const likeNum = {blogİd : att,like: 1}; blogService.putLike(likeNum,config )}catch(err) {console.log(err)}}

const deleteİtem = async (id) => {try{const config = {headers: { Authorization: token}};axios.delete(`/api/blogs/${id}`,config)/*blogService.delBlog(id,config)*/}catch(err) {console.log(err)}}


const showWhenVisible = { display: avisible ? '' : 'none',paddingTop: 10,paddingLeft: 2,border: 'solid',borderWidth: 1,marginBottom: 5,width: '22%'}
const showWhenNonVisible = { display: avisible ? 'none' : '' }
  return (
<>


  <div style={showWhenVisible}>
    {blog.title} <button onClick={() =>setAvisible(false)}>Hide</button>
    <br/> {blog.url}<br/> <div> {Array.from(String(blog.likes), Number).sort()}  <button at={blog.id} onClick={(event) => { return sendLike(event.target.getAttribute('at')), setstater()}}>like</button> </div>
    <br/>  {blog.author} <br/> <button ata={blog.id} onClick={(event) => { if (window.confirm(`Remove blog " ${blog.title} "?`)) {return deleteİtem(event.target.getAttribute('ata'))}}}>remove</button>
  </div>





<div style={showWhenNonVisible}>
    {blog.title} &nbsp; {blog.author} <button onClick={() =>setAvisible(true)}>Show more</button>
  </div>


</>
  )}

export default Blog

