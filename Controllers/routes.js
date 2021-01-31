const BRouter = require('express').Router()
const Bschema = require('../mongoDb/Schema')
const User = require('../mongoDb/user')
const jwt = require('jsonwebtoken')
const config = require('../Utilities/config')




const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}




BRouter.get('/', async (request, response) => {
 await Bschema
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})


BRouter.put('/', async (request, response, next) => {

try{

const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await Bschema.findOne({_id : request.body.blogİd})


//console.log('blog is =====',user)
//console.log('request.body is ====',request.body)

   /* const newblog = new Bschema({
  
  _id: request.body.blogİd,
  title: blog.title,
  author: user.name,
  url: blog.url,
  likes: blog.likes + request.body.like ,
  user: user._id

  })*/




//console.log('newblog is ====',a)
 const sendBlog = await Bschema.findByIdAndUpdate(request.body.blogİd,{$set :{


  title: blog.title,
  author: user.name,
  url: blog.url,
  likes: blog.likes + request.body.like ,
  user: user._id



 }},{new: true} )



 //  const sendBlog = await newblog.save()


 // if (!sendBlog) { response.status(422).json('wrong content')}



response.status(200).json(sendBlog)

}
catch(err) {next(err)}


})







BRouter.post('/', async (request, response, next) => {


try{

const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

//console.log('user in post is ',user)
  
  const blog = new Bschema({
  
  title: request.body.title,
  author: user.name,
  url: request.body.url,
  likes: request.body.likes,
  user: user._id

  })


//console.log('blog in post is ',blog)

  const savedBlog = await blog.save()


  if (!savedBlog) { response.status(422).json('wrong content')}



      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
    response.status(200).json(savedBlog)
      
 } 
 catch(err) {next(err)}


})








BRouter.delete('/:id', async (request, response, next) => {


//console.log('request.params.id',request.params.id)



try{

const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const matchİd = await user.blogs.find(arg => { return arg == request.params.id } ) //============> another way to make equeal object and string is -- blog.user.toString() === userid.toString()

  //console.log('user in delete route is ===',typeof(user.blogs))
  //console.log('request.body.blogİd is =====', typeof(request.body.blogİd))
  //console.log('matchİd is ====',matchİd)
  //console.log('token is ======',token)

  if (!matchİd ){return response.status(401).json({ error: 'Blog-İD missing or invalid' })}
  else  { return await Bschema.findByIdAndDelete(matchİd),response.status(204).end()} //=====> another method for "this findOneAndDelete"

  
  

  //console.log('user in delete route is ===',user.blogs)
 // console.log('request.body.blogİd is =====', request.body.blogİd)

  
 } 
 catch(err) {next(err)}


})




















let az




async function foo() {
  
  var result= await (await Bschema.find({}))
  return result
  
}

async function load() {
  var result = await foo();
  return abs = JSON.stringify(result);
  
}

load().then(r => az = r);





/*(function(){
  async function getJoke(){
    let response = await Bschema.find({});
    return console.log(response) ;
  }

   getJoke().then((joke) => {
    Az = joke;
  });
})();*/










module.exports = BRouter