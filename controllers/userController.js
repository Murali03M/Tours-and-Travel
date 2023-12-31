const fs = require('fs')


// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/../../dev-data/data/users.json`));


const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`))


exports.checkId = (req, res, next, val)  =>
{
  console.log(`checing the id ${val}`);

  if (req.params.id * 1 == users.length) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid ID'
    });
  }
  next();
}

exports.getAllUsers = (req, res) => {

  try {

      res.status(200).send(JSON.stringify(users));
  } catch (error) {
        res.status(500).json({
          status: 'error',
          message: error.message
        });
    }
  
  };
exports.getUser = (req, res) => {
  try {
    const userId = req.params.id;
    const user = users.find(user => user._id === userId);
    if (!user)
    {
      res.status(404).json({
        status: 'error',
        message: 'User not found!'
      });
      return;
    }
    res.status(200).json(user);
    
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
      
    }
    
   
  };
exports.createUser = (req, res) => {


  try {

  const _id = req.body._id;
  const name = req.body.name;
  const email = req.body.email;
  const roles = req.body.roles;
  const active = req.body.active;
  const photo = req.body.photo;
  const password = req.body.password;

  const user = { _id, name, email, roles, active, photo, password };
  
  users.push(user);
  res.status(201).json(user);

    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
    
  }
    
   
  };
  exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };