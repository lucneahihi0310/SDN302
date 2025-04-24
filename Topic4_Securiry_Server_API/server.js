// cấu hình dạnh toàn cục đẻ load và sử dụng biến môi truòng từ .env
require('dotenv').config();
// khai báo module express
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express(); // khoi tạo ứng dụng express
// sử dụng middleware để phân tích dữ liệu JSON trong body của request
app.use(express.json()); // loại bỏ dữ liệu làm việc trên web server
app.use(express.urlencoded({ extended: true })); // cho phép tiếp nhận dữ liệu kiểu multiple-form-data(uploat file)
app.use(morgan('dev')); // sử dụng morgan để log các request đến server
const connectDB = require('./config/db'); // import file kết nối cơ sở dữ liệu
const userRoute = require('./Route/user.route'); // import file định nghĩa route cho user

// tạo thư mục upload nếu chưa có
if (!fs.existsSync('upload')) {
    fs.mkdirSync('upload');
}

// thực hiện định tuyến cơ bản
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Hello world' });
});

app.use('/api/books', require('./Route/book.route'))
app.use('/api/auth', userRoute); // sử dụng route cho user


// Middleware 404: Nếu không route nào khớp thì tạo lỗi và đẩy vào middleware lỗi tổng quát
app.use((req, res, next) => {
    const error = new Error('Đường dẫn không tồn tại hoặc không hợp lệ!');
    error.status = 404;
    next(error); // đẩy vào middleware xử lý lỗi
});

// Middleware xử lý lỗi tổng quát cho tất cả lỗi 4xx và 5xx
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: true,
        status: statusCode,
        message: err.message || 'Đã xảy ra lỗi phía server. Vui lòng thử lại sau!'
    });
});


app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Server is running at http://${process.env.HOST_NAME}:${process.env.PORT}`);
    // tthực hiện kết nối cơ sở dữ liệu
    connectDB();
});
