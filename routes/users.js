const express = require('express');
const router = express.Router();
const uc = require('../controllers/usercontroller');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// http;//localhost:3000/users/register
router.post('/register', uc.registerUser);
// http;//localhost:3000/users/login
router.post('/login', uc.authenticateUser);

module.exports = router;
