require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productRoute = require('./routes/product.route');

app.get('/', async(req, res)=>{
    try {
        res.send({message: 'Welcome to Practical Exam!'});
    } catch (error) {
        res.send({error: error.message});
    }
});


app.use('/api/orders', require('./routes/oder.route'));
app.use('/api/products', productRoute);
app.use('/api/customers', require('./routes/customer.route'));

app.use((req, res, next) => {
    const error = new Error('Đường dẫn không tồn tại hoặc không hợp lệ!');
    error.status = 404;
    next(error);
});

app.use(require('./middleware/errorHandler'));
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);
    connectDB();
});