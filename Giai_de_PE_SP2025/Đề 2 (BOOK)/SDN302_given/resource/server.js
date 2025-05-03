require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async(req, res)=>{
    try {
        res.send({message: 'Welcome to Practical Exam!'});
    } catch (error) {
        res.send({error: error.message});
    }
});

app.use('/api/books', require('./routes/book.route'));
app.use('/api/borrowRecords', require('./routes/borrowRecord.route'));
app.use('/api/users', require('./routes/user.route'));

app.use((req, res, next) => {
    const error = new Error('Path does not exist or is invalid!');
    error.status = 404;
    next(error);
});


app.use(require('./middlewares/errorHandler'));
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);
    connectDB();
});