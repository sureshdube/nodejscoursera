const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = "localhost";
const port = 3000;
const server = http.createServer(function(req,res){
    console.log(req.headers);
    res.setHeader("Content-Type","text/html");
    if(req.method == "GET"){
        var fileURl;
        if(req.url == "/") {
            fileURl = "/index.html";
        }else{
            fileURl = req.url;
        }
        var filePath = path.resolve("./public" + fileURl);
        var fileExt = path.extname(filePath);
        if(fileExt == ".html"){
            fs.exists(filePath,(exists) =>{
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader("Content-Type","text/html");
                    res.end("<html><body><h1>Not Found : "+fileURl+"<h1></body></html>");
                    return;
                }
                res.statusCode = 200;
                res.setHeader("Content-Type","text/html");
                fs.createReadStream(filePath).pipe(res);
            })
        }
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type","text/html");
        res.end("<html><body><h1>Not Found method : "+req.method+"<h1></body></html>");
        return;
    }
});
server.listen(port,hostname,function(){
    console.log("Server running at http://${hostname}:${port} ");
});
