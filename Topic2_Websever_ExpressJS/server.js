const http = require('http');

const server = http.createServer((req, res) => {
// phân rã đối tượng "req" lấy các thuộc tính cần thiết
    const { method, url } = req;

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello world' }));
    } else if (url === '/books' && method === 'GET') {        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'List books' }));
    } else if (url === '/books/create' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Create new book',
                data: JSON.parse(body) // nếu gửi JSON
            }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }

    // if (req.url === '/') {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.write('<h1>Hello world</h1>');
    // } else if (req.url === '/books') {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.write('<h1>List books</h1>');
    // } else if (req.url === '/books/create') {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.write('<h1>Create new book</h1>');
    // } else {
    //     res.writeHead(404, { 'Content-Type': 'text/html' });
    //     res.write('<h1>404 Not Found</h1>');
    // }

    // res.end();
});
const port = 8080;
server.listen(port, () => {
    console.log('Server is running at http://localhost:' + port);
});
