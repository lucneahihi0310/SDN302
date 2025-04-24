require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const connectDB = require('./config/db');

app.use('/api/movie', require('./routes/movie.route'));


app.use((req, res, next) => {
    const error = new Error('Đường dẫn không tồn tại hoặc không hợp lệ!');
    error.status = 404;
    next(error);
});


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
    // thực hiện kết nối cơ sở dữ liệu
    connectDB();
});