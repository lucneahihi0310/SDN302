const Book = require("../models/book.model");
const Author = require("../models/author.model");

/**
 * outputlistAll:[
 * {bookID, bookTitle, bookAuthorName: [ , ], publicationYear, genre}
 * ]
 */
exports.listAll = async (req, res, next) => {
    try {
        const books = data.books.map(book => {
            const authorNames = book.authorId.map(id => {
                const author = data.authors.find(a => a.id === id);
                return author ? author.name : null;
            }).filter(name => name !== null);

            return {
                bookID: book.id,
                bookTitle: book.title,
                bookAuthorName: authorNames,
                publicationYear: book.publicYear,
                genre: book.genre
            };
        });

        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};


exports.create = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new Error('No data');
        }
        // khởi tạo dữ liệu kiểu book
        // const newBook = new Book({
        //     title: req.body.title,
        //     authors: ['Author1', 'Author2'],
        //     publicationYear: req.body.publicationYear,
        //     genre: req.body.genre
        // });
        // const addBook = await newBook.save();

        // res.status(201).json(addBook);
        const { title, authors: authorNames, publicationYear, genre } = req.body;

        if (!title || !authorNames || !publicationYear || !genre) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const authorDocs = await Promise.all(authorNames.map(async (name) => {
            let author = await Author.findOne({ name });
            if (!author) {
                author = new Author({ name, books: [] });
                await author.save();
            }
            return author;
        }));

        const newBook = new Book({
            title,
            publicationYear,
            genre,
            authors: authorDocs.map(author => author._id)
        });

        await newBook.save();

        await Promise.all(authorDocs.map(async (author) => {
            if (!author.books.includes(newBook._id)) {
                author.books.push(newBook._id);
                await author.save();
            }
        }));

        // lưu book vào từng author

        res.status(201).json({
            message: 'Book created successfully',
            book: {
                bookID: newBook._id,
                title: newBook.title,
                publicationYear: newBook.publicationYear,
                genre: newBook.genre,
                authors: authorDocs.map(a => a.name)
            }
        });
    } catch (error) {
        next(error);
    }
}
/**
 * outputdetail: /api/books/:bookId
 *{
 * bookID, bookTitle, authorName: [ , ]
 * }
 */
exports.detail = async (req, res, next) => {
    try {
        const bookId = parseInt(req.params.bookId);
        const book = data.books.find(b => b.id === bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const authorNames = book.authorId.map(id => {
            const author = data.authors.find(a => a.id === id);
            return author ? author.name : null;
        }).filter(name => name);

        const detail = {
            bookID: book.id,
            bookTitle: book.title,
            authorName: authorNames
        };

        res.status(200).json(detail);
    } catch (error) {
        next(error);
    }
};


/**
 * outputAthours:/api/books/authors/:authourId
 * [
 * {bookID, bookTitle, publicationYear, genre}
 * ]
 */
exports.booksByAuthor = async (req, res, next) => {
    try {
        const authorId = parseInt(req.params.authorId);
        const books = data.books
            .filter(book => book.authorId.includes(authorId))
            .map(book => ({
                bookID: book.id,
                bookTitle: book.title,
                publicationYear: book.publicYear,
                genre: book.genre
            }));

        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

exports.uploadImages = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const uploadedFiles = files.map(file => ({
            filename: file.filename,
            path: file.path
        }));

        res.status(200).json({
            message: `Uploaded ${files.length} image(s) for book ID: ${bookId}`,
            files: uploadedFiles
        });
    } catch (error) {
        next(error);
    }
};

