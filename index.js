'use strict';
const http = require('http');
const pug = require('pug');
const server = http.createServer((req, res) => {
  //ACCESS LOG
  //console.log()
  //console.info() info
  //console.warn() stderr
  //comsole.error() stderr
  const now = new Date();
  console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  //res.write(req.headers['user-agent']);
  switch (req.method) {
    case 'GET':
      //res.write('GET' + req.url);
      //const fs = require('fs');
      //const rs = fs.createReadStream('./form.html');
      //rs.pipe(res);
      if (req.url === '/enquetes/work-place') {
        res.write(pug.renderFile('./form.pug', {
          path: req.url,
          firstItem: '東京',
          secondItem: '仙台'
        }));
      } else if (req.url === '/enquetes/work-tokyo') {
        res.write(pug.renderFile('./form.pug', {
          path: req.url,
          firstItem: '東京23区内',
          secondItem: '東京23区外'
        }));
      }
      res.end()
      break;
    case 'POST':
      //res.write('POST' + req.url);
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        //make one body
        body = Buffer.concat(body).toString();
        //console.info('[' + now + '] Data posted: ' + body);
        const decoded = decodeURIComponent(body);
        console.info('[' + now +'] 投稿: ' + decoded);
        res.write('<!DOCTYPE html><html lang="ja"><body><h1>' +
          decoded + 'が投稿されました</h1></body></html>');
        res.end();
      });
      break;
    case 'DELETE':
      res.write('DELETE ' + req.url);
      break;
    default:
      break;
  }
}).on('error', (e) => {
  console.error('[' + new Date() +  '] Server Error', e);
}).on('clientError', (e) => {
  console.error('[' + new Date() + '] Client Error', e);
});
const port = 8000;
server.listen(port, () => {
  console.info('[' + new Date() + ']Listening on ' + port);
});
