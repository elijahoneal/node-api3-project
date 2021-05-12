const express = require('express');
const User = require('./users-model')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')
const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then( users => res.status(200).json(users) )
  .catch( err  => {
    console.log(err)
    res.status(500).json({ message: 'Something done broke' })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id

});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
  .then( newUser => res.status(201).json(newUser))
  .catch( err => {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  } )
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.body)
  .then( updateUser => res.status(200).json(updateUser) )
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Something went wrong'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
  .then(deleteUser => res.status(200).json(deleteUser))
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Something went wrong'})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const user = req.users
  User.getUserPosts(user.id)
  .then( posts => res.status(200).json(posts) )
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Something went wrong'})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.insert(req.body)
  .then( newPost => res.status(201).json(newPost))
  .catch( err => {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  } )
  
});

// do not forget to export the router
module.exports = router;