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
        
        // check the router
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer       
        }
    
        chosenHandler(data, function(statusCode, payload) {
            // actual statusCode, otherwise default to 500
            statusCode = typeof(statusCode) == 'number' ? statusCode : 500;
            payload = typeof(payload) == 'object' ? payload : {};
            var payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('Hat geklappt');

        })
    });


    console.log(headers);
});

// Start the server
server.listen(3000, function () {
    console.log("Server is running on 3000");
})

// Define handlers
var handlers = {};

handlers.hello = function(data, callback){
    let msg = {'answer': 'World!'};
    callback(200,msg);
}

handlers.notFound = function(data, callback){
    callback(404);
}

var router = {
    'hello' : handlers.hello
};
