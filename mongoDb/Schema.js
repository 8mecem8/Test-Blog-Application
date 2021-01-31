const mongoose = require('mongoose')




const blogSchema = new mongoose.Schema({
  title: {
      type: String,
      minlength: 5,
      requred: true,
      unique: true
    },
  author: {
      type: String,
      minlength: 3,
      requred: true,
    },
  url: {
      type: String,
      minlength: 5,
      requred: true,
    },
  likes: {
      type: Number,
      default: 0,
      requred: true,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
    }
})




blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})





module.exports = mongoose.model('Blog', blogSchema)