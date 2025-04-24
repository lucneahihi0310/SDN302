const express = require('express');
const router = express.Router(); // router là phiên bản thu gọn của expressjs
const multer = require('multer');
const path = require('path');
const { listAll, create, detail, booksByAuthor, uploadImages } = require('../controllers/book.controller');
const middleware = require('../auth/auth.middleware'); // import middleware xác thực người dùng
// cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload');
    },
    filename: function (req, file, cb) {
        const uniqueName = new Date()
            .toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
            .replace(/[\/:]/g, '-') + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// tạo môt custom middleware để in ra log về thời gian khi request đến server

const timlog = (req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next(); // gọi hàm tiếp theo trong chuỗi middleware
}
router.use(timlog);
router.use(express.json()); // sử dụng middleware để phân tích dữ liệu JSON trong body của request


// định nghĩa các route cho client
router.get('/', listAll);

router.get('/:bookId', detail);
router.get('/authour/:authorId', booksByAuthor);

router.post('/create', middleware, create);


// PUT /:id/uploads
router.put('/:id/uploads', upload.array('images', 10), uploadImages);

module.exports = router; // xuất router ra ngoài để sử dụng trong các file khác