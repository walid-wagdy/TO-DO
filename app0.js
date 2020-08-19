var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
res.writeHead(200,{'Content-Type' : 'text/html'});
console.log(req.url);
var myReadStream = fs.createReadStream(__dirname+'/index.html','utf8');
myReadStream.pipe(res);
});
server.listen(5555,'10.1.3.135');
console.log('5555');
