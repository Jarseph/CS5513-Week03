const http = require("http");

const fs = require("fs").promises;

function requestListener(req, res) {
  const urlarray = req.url.split('/');

  console.log(urlarray);

  switch ( urlarray[1] ) {
    case "item":
      loadReturn('public/item.html', 'text/html', res);
      break;
    case "client":
      loadReturn('public/client.js', 'text/html', res);
      break;
    case "data":
      loadReturn('data.json', 'application/json', res);
      break;
    case "list":
      loadReturn('public/list.html', 'text/html', res);
      break;
    case "":
      loadReturn('public/list.html', 'text/html', res);
      break;
    case "favicon.ico":
      res.writeHead(404);
      res.end();
      break;
    default: 
      fs.readFile(__dirname + "/public/" + urlarray[1])
        .then(contents => {
            res.setHeader('Content-Type', 'image/jpeg');
            res.writeHead(200);
            res.end(contents);
          }
        );
  }

};

const server = http.createServer(requestListener);

const host = "0.0.0.0"; 
const port = "3000"; 

server.listen(
  port,
  host,
  () => {
    console.log('Server is running');
  }
);

function loadReturn(fname, ctype, res) {
  fs.readFile( __dirname + "/" + fname )
      .then(
        contents => {
          res.setHeader("Content-Type", ctype + "; charset=UTF-8");
          res.writeHead(200);
          res.end(contents);
        }
      );
}