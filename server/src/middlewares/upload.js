const multer = require('multer');
const storage = multer.diskStorage({
  // Định nghĩa đường dẫn lưu file
  destination: (req, file, callBack) => {
    callBack(null, process.cwd() + '/public/img');
  },
  // Đổi tên file khi upload (trước khi lưu file)
  filename: (req, file, callBack) => {
    let fileName = Date.now() + '_' + file.originalname; // => tên file gốc chứa định dạng file để hiển thị
    callBack(null, fileName);
  },
});
const upload = multer({ storage });

module.exports = { upload };
