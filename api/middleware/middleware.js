module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log( `[${new Date().toISOString()}] ${req.method} to ${req.url} ` )

  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  

  if(id) {
    req.user = user
    next();
  } else {
    res.status(404).json({ message: "user not found" })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const name = req.body.name
  if(name){
    next()
  } else {
    res.status(404).json({message: "missing required name field"})
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const text = req.body.text

  if(text){
    next()
  } else {
    res.status(404).json({message: "missing required text field"})
  }
}

// do not forget to expose these functions to other modules
