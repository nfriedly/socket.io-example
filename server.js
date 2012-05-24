var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  // listen for events from the browser
  socket.on('click', function(data) {
  	console.log(data);
  });
  
  // this is a mock of a hardware event
  setTimeout(function(){
  	socket.emit('news', { info: "It's been 10 seconds" });
  }, 10*1000);
  
});

