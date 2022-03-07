/*const { response } = require('express');
var http = require('http');
http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type' : 'text/plain'});
    response.end('Hola a todas y a todos');
}).listen(8080);
console.log('Servidor ejecutandose en puerto 8080...');*/
'use strict'
const port = process.env.PORT || 3000;
const express = require('express');
const logger = require('morgan');
const mongojs = require('mongojs');
const app = express();
const cors = require('cors');
var db = mongojs("SD");

var id = mongojs.ObjectID; 
// Declaraciones
var allowCrossTokenHeader = (req, res, next) => {
res.header("Access-Control-Allow-Headers", "*");
return next();
};
var auth = (req, res, next) => {
    if(req.headers.token === "password1234") {
    return next();
    } else {
    return next(new Error("No autorizado"));
    };
};

// Middlewares
app.use(cors());
app.use(logger('dev')); // probar con: tiny, short, dev, common, combined
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(allowCrossTokenHeader);


app.param("coleccion", (req, res, next, coleccion) => {
    console.log('param /api/:coleccion');
    console.log('colección: ', coleccion);
    req.collection = db.collection(coleccion);
    return next();
    });
// Implementamos el API RESTFul a través de los métodos
app.get('/api', (req, res, next) => {
    console.log('GET /api');
    console.log(req.params);
     console.log(req.collection);
     db.getCollectionNames((err, colecciones) => {
     if (err) return next(err);
     res.json(colecciones);
     });
 });
 app.get('/api/:coleccion', (req, res, next) => {
    req.collection.find((err, coleccion) => {
    if (err) return next(err);
    res.json(coleccion);
     });
 });
 app.get('/api/:coleccion/:id', (req, res, next) => {
    req.collection.findOne({_id: id(req.params.id)}, (err, elemento) => {
    if (err) return next(err);
    res.json(elemento);
     });
 });

         app.post('/api/:coleccion', auth, (req, res, next) => {
            const elemento = req.body;
            if (!elemento.nombre) {
            res.status(400).json ({
            error: 'Bad data',
            description: 'Se precisa al menos un campo <nombre>'
            });
        } else {
            req.collection.save(elemento, (err, coleccionGuardada) => {
            if(err) return next(err);
            res.json(coleccionGuardada);
            });
            }
            });
        app.put('/api/:coleccion/:id', auth, (req, res, next) => {
                let elementoId = req.params.id;
                req.collection.update({_id: id(elementoId)}, {$set: req.body},
                {safe: true, multi: false}, (err, result) => {
                if (err) return next(err);
                res.json(result);
                });
        });
        app.delete('/api/:coleccion/:id', auth, (req, res, next) => {
                let elementoId = req.params.id;
                req.collection.remove({_id: id(elementoId)}, (err, resultado) => {
                if (err) return next(err);
                res.json(resultado);
                });
        });
// Lanzamos nuestro servicio API
app.listen(port, () => {
console.log(`API REST ejecutándose en http://localhost:${port}/api/products`);
});