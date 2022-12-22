const express = require('express');
const {
  getImage,
  searchImageByName,
  getImageSavedByUser,
  getImageCreatedByUser,
  deleteImageById,
  getUserAndImageByIdImg,
  getCommentByImg,
  checkSavedByImg,
} = require('../controllers/imageController');
const imgRoute = express.Router();
const { verifyToken } = require('../middlewares/baseToken');

//GET danh sách ảnh
imgRoute.get('/getImage', getImage);
//GET tìm kiếm danh sách ảnh theo tên
imgRoute.get('/searchImageByName', searchImageByName);
//GET danh sách ảnh đã lưu theo user_id
imgRoute.get('/getImageSavedByUser/:user_id', verifyToken, getImageSavedByUser);
//GET danh sách ảnh đã tạo theo user_id
imgRoute.get(
  '/getImageCreatedByUser/:user_id',
  verifyToken,
  getImageCreatedByUser
);
//DELETE xoá ảnh đã tạo theo id ảnh
imgRoute.delete('/deleteImageById/:img_id', verifyToken, deleteImageById);
//GET thông tin ảnh và người tạo ảnh bằng id ảnh
imgRoute.get('/getUserAndImageByIdImg/:img_id', getUserAndImageByIdImg);
//GET thông tin bình luận theo id ảnh
imgRoute.get('/getCommentByImg/:img_id', getCommentByImg);
//GET thông tin đã lưu ảnh này hay chưa theo id ảnh
imgRoute.get('/checkSavedByImg', verifyToken, checkSavedByImg);

module.exports = imgRoute;
