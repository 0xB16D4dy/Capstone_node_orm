const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { successCode, errorCode, failCode } = require('../configs/response');

const getImage = async (req, res) => {
  try {
    const result = await prisma.image.findMany({});
    if (!result.length) {
      successCode(res, result, 'Lấy ảnh thành công !!!');
    } else {
      failCode(res, result, 'Không có bất kỳ ảnh nào được tìm thấy !!!');
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const searchImageByName = async (req, res) => {
  try {
    const { imageName } = req.body;
    const searchImage = await prisma.image.findMany({
      where: {
        img_name: {
          contains: imageName,
        },
      },
    });
    if (searchImage.length !== 0) {
      successCode(res, searchImage, 'Lấy ảnh thành công !!!');
    } else {
      failCode(res, '', 'Không có bất kỳ ảnh nào được tìm thấy !!!');
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const getImageSavedByUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    user_id = +user_id;
    const checkUser = await prisma.user.findFirst({
      where: {
        user_id,
      },
    });
    if (checkUser) {
      const itemFound = await prisma.save_img.findMany({
        include: {
          image: true,
        },
        where: {
          user_id,
        },
      });
      if (itemFound.length !== 0) {
        successCode(res, itemFound, 'Lấy ảnh thành công !!!');
      } else {
        failCode(res, '', 'No photos have been saved yet before !!!');
      }
    } else {
      failCode(res, '', "User doesn't exist !!!");
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const getImageCreatedByUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    user_id = +user_id;
    const checkUser = await prisma.user.findFirst({
      where: {
        user_id,
      },
    });

    if (checkUser) {
      const itemFound = await prisma.image.findMany({
        where: {
          user_id,
        },
      });
      if (itemFound.length !== 0) {
        successCode(res, itemFound, 'Lấy ảnh thành công');
      } else {
        failCode(res, '', 'Không có ảnh nào được tìm thấy !!!');
      }
    } else {
      failCode(res, '', "User doesn't exist !!!");
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const deleteImageById = async (req, res) => {
  try {
    let { img_id } = req.params;
    img_id = +img_id;
    const checkImg = await prisma.image.findFirst({
      where: {
        img_id,
      },
    });
    if (checkImg) {
      await prisma.image.delete({
        where: {
          img_id,
        },
      });
      successCode(res, '', 'Ảnh đã được xoá !!!');
    } else {
      failCode(res, '', "Image doesn't exist to Delete !!!");
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const getUserAndImageByIdImg = async (req, res) => {
  try {
    let { img_id } = req.params;
    img_id = +img_id;
    const checkImg = await prisma.image.findFirst({
      where: {
        img_id,
      },
      include: {
        // Lấy thông tin user nhưng không lấy mật khẩu
        user: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
            age: true,
            avatar: true,
          },
        },
      },
    });
    if (checkImg) {
      successCode(res, checkImg, 'Lấy ảnh thành công !!!');
    } else {
      failCode(res, '', 'Không có ảnh nào được tìm thấy !!!');
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const getCommentByImg = async (req, res) => {
  try {
    let { img_id } = req.params;
    img_id = +img_id;
    const checkImg = await prisma.image.findFirst({
      where: {
        img_id,
      },
    });
    if (checkImg) {
      const checkComment = await prisma.comment.findMany({
        include: {
          image: true,
        },
        where: {
          img_id,
        },
      });
      if (checkComment.length !== 0) {
        successCode(res, checkComment, 'Lấy comment thành công !!!');
      } else {
        failCode(res, '', "Comment doesn't exist");
      }
    } else {
      failCode(res, '', 'Không có ảnh nào được tìm thấy !!!');
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const checkSavedByImg = async (req, res) => {
  try {
    let { user_id, img_id } = req.body;
    const checkUser = await prisma.user.findFirst({
      where: {
        user_id,
      },
    });
    if (checkUser) {
      const checkImg = await prisma.image.findFirst({
        where: {
          img_id,
        },
      });
      if (checkImg) {
        const checkSave = await prisma.save_img.findFirst({
          where: {
            user_id,
            img_id,
          },
        });
        if (checkSave) {
          successCode(res, checkSave, 'This photo has been saved');
        } else {
          failCode(res, '', 'This photo has not been saved yet !!!');
        }
      } else {
        failCode(res, '', 'Không có ảnh nào được tìm thấy !!!');
      }
    } else {
      failCode(res, '', 'user không tồn tại !!!');
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

module.exports = {
  getImage,
  searchImageByName,
  getImageSavedByUser,
  getImageCreatedByUser,
  deleteImageById,
  getUserAndImageByIdImg,
  getCommentByImg,
  checkSavedByImg,
};
