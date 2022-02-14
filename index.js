/*const { response } = require('express');
var http = require('http');

http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type' : 'text/plain'});
    response.end('Hola a todas y a todos');

}).listen(8080);

console.log('Servidor ejecutandose en puerto 8080...');*/
'use strict'
const port = process.env.PORT || 8888;
const express = require('express');
const app = express();

app.get('/hola/unNombre',(req,res)=>{
   res.status(200).send({mensaje: `Hola ${req.params.unNombre} desde sd!`});
});


app.listen(port, ()=>{
    console.log(`API REST ejecutandose en http://localhost:${port}/hola/unNombre`);

});