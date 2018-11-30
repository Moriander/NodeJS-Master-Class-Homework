var http = require('http');
var url = require('url');
var server = http.createServer(function (req, res) {


    var parsedURL = url.parse(req.url, true);

    var path = parsedURL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    
    var queryStringObject = parsedURL.query;

    var method = req.method.toLowerCase();

    res.end("Hat geklappt");

    console.log(method);
});
server.listen(3000, function () {
    console.log("Server is running on 3000");
})

