var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function (req, res) {


    var parsedURL = url.parse(req.url, true);

    var path = parsedURL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    
    var queryStringObject = parsedURL.query;

    var method = req.method.toLowerCase();

    var headers = req.headers;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data);
    });
    
    req.on('end',function(){
        buffer += decoder.end();
        res.end('Hat geklappt');
        console.log(buffer);
    });

    console.log(headers);
});
server.listen(3000, function () {
    console.log("Server is running on 3000");
})

