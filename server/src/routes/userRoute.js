const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../middlewares/baseToken');
const { upload } = require('../middlewares/upload');
const {
  login,
  register,
  getUser,
  uploadAvatar,
  updateUser,
  postComment
} = require('../controllers/userController');

//login
userRoute.get('/login', login);
//register
userRoute.post('/register', register);
//GET user info
userRoute.get('/getUser/:user_id', verifyToken, getUser);
//PUT update user info
userRoute.put('/updateUser/:user_id', verifyToken, updateUser);
//POST avatar user
userRoute.post(
  '/uploadAvatar/:user_id',
  verifyToken,
  upload.single('dataUpload'),
  uploadAvatar
);
//POST comment
userRoute.post('/postComment',verifyToken, postComment)

module.exports = userRoute;
