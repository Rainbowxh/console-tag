const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath;

  // 如果请求的是根路径，则读取 example/index.html
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    // 否则，读取相应的文件
    filePath = path.join(process.cwd(), req.url);
  }

  // 读取文件内容并发送响应
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found!');
    } else {
      // 获取文件的 Content-Type
      const extname = path.extname(filePath);
      let contentType = 'text/html'; // 默认为 HTML 类型
      if (extname === '.js') {
        contentType = 'application/javascript';
      } else if (extname === '.css') {
        contentType = 'text/css';
      }

      // 设置响应头
      res.writeHead(200, {'Content-Type': contentType});
      // 发送文件内容
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});