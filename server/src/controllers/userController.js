const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// encrypt password
const bcrypt = require('bcrypt');
// upload
const fs = require('fs');
const { successCode, errorCode, failCode } = require('../configs/response');
const { parseToken } = require('../middlewares/baseToken');

const register = async (req, res) => {
  try {
    const { email, passWord, fullName, age, avatar } = req.body;
    let passWordHash = bcrypt.hashSync(passWord, 12);
    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      failCode(res, '', 'Email already exists !!!');
    } else {
      const result = await prisma.user.create({
        data: {
          email,
          pass_word: passWordHash,
          full_name: fullName,
          age,
          avatar,
        },
      });
      successCode(res, result, 'Register success !!!');
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const login = async (req, res) => {
  try {
    const { email, passWord } = req.body;
    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      let checkPass = bcrypt.compareSync(passWord, checkEmail.pass_word);
      if (checkPass) {
        successCode(res, parseToken(checkEmail), 'Login success !!!');
      } else {
        failCode(res, '', 'Wrong Password !!!');
      }
    } else {
      failCode(res, '', 'Wrong Email !!!');
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const getUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    // convert string to int
    let id = +user_id;
    const user = await prisma.user.findFirst({
      where: {
        user_id: id,
      },
    });
    if (user) {
      successCode(res, user, 'Get user success !!!');
    } else {
      failCode(res, '', "User doesn't exist !!!");
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const updateUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    let { email, passWord, fullName, age } = req.body;
    let passWordHash = bcrypt.hashSync(passWord, 12);
    user_id = +user_id;
    let checkUser = await prisma.user.findFirst({
      where: {
        user_id,
      },
    });
    if (checkUser) {
      let result = await prisma.user.update({
        where: {
          user_id,
        },
        data: {
          email,
          pass_word: passWordHash,
          full_name: fullName,
          age,
        },
      });
      successCode(res, result, 'Update succeed !!!');
    } else {
      failCode(res, '', "User doesn't exist !!!");
    }
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const uploadAvatar = async (req, res) => {
  try {
    let { user_id } = req.params;
    let id = +user_id;
    if (req.file.size >= 400000) {
      fs.unlinkSync(process.cwd() + '/public/img/' + req.file.filename);
      res.send('Chỉ được phép upload 4Mb');
      return;
    }

    if (req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/jpg') {
      fs.unlinkSync(process.cwd() + '/public/img/' + req.file.filename);
      res.send('sai định dạng');
      return;
    }

    await fs.readFile(
      process.cwd() + '/public/img/' + req.file.filename,
      async (err, data) => {
        let dataBase = `data:${req.file.mimetype};base64, ${Buffer.from(
          data
        ).toString('base64')}`; //lưu xuống database
        //Xử lý xoá file
        setTimeout(() => {
          fs.unlinkSync(process.cwd() + '/public/img/' + req.file.filename);
        }, 5000);
        if (dataBase) {
          let checkUser = await prisma.user.findFirst({
            where: {
              user_id: id,
            },
          });
          // kiểm tra user có tồn tại hay không
          if (checkUser) {
            await prisma.user.update({
              where: {
                user_id: id,
              },
              data: {
                avatar: dataBase,
              },
            });
            // console.log(dataBase);
            successCode(res, '', 'Upload success');
          } else {
            failCode(res, '', 'Upload Failed !!!');
          }
        } else {
          console.log(err);
        }
      }
    );
  } catch (error) {
    errorCode(res, 'Internal Server Error');
  }
};

const postComment = async (req, res) => {
  try {
    const { user_id, img_id, content } = req.body;
    const checkUser = await prisma.user.findFirst({
      where: {
        user_id,
      },
    });
    const checkImg = await prisma.image.findFirst({
      where: {
        img_id,
      },
    });
    if (checkUser) {
      if (checkImg) {
        const checkComment = await prisma.comment.findFirst({
          where: {
            user_id,
            img_id,
          },
        });
        if (!checkComment) {
          const result = await prisma.comment.create({
            data: {
              user_id,
              img_id,
              date_comment: new Date(),
              content,
            },
          });
          successCode(res, result, 'Comment succeed !!!');
        } else {
          failCode(res, '', 'You was Comment this img !!!');
        }
      } else {
        failCode(res, '', "Image doesn't exist !!!");
      }
    } else {
      failCode(res, '', "User doesn't exist !!!");
    }
  } catch (error) {
    console.log(error);
    errorCode(res, 'Internal Server Error');
  }
};

module.exports = {
  login,
  register,
  getUser,
  updateUser,
  uploadAvatar,
  postComment,
};
