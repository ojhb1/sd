/*const { response } = require('express');
var http = require('http');
http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type' : 'text/plain'});
    response.end('Hola a todas y a todos');
}).listen(8080);
console.log('Servidor ejecutandose en puerto 8080...');*/
'use strict'
const port = process.env.PORT || 3000;
const PORT = 443;
const https = require('https');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const mongojs = require('mongojs');
const app = express();

var db = mongojs("SD");
var fs = require('fs');
const  OPTIONS_HTTPS = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};
var id = mongojs.ObjectID; 

// Declaraciones
// var allowCrossTokenHeader = (req, res, next) => {
// res.header("Access-Control-Allow-Headers", "*");
// return next();
// };
var allowCrossTokenHeader = (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    return next();
    };
    var allowCrossTokenOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    return next();
    };


    function auth (req, res, next) { 
    
        const jwt = req.headers.authorization.split(' ')[1]; 
        TokenService.decodificaToken(jwt)
        .then (userId =>{
            req.user = {
                id :userId,
                token : jwt
            }
            return next();
        })
         .catch (err =>
             res.status(400).json({
                 result: 'Error',
                 msg: err
             })
             );
         
     }

// Middlewares
app.use(cors());
app.use(allowCrossTokenHeader);
app.use(allowCrossTokenOrigin);
app.use(helmet());
app.use(logger('dev')); // probar con: tiny, short, dev, common, combined
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(allowCrossTokenHeader);



app.param("coleccion", auth,(req, res, next, coleccion) => {
    console.log('param /api/:coleccion');
    console.log('colección: ', coleccion);
    req.collection = db.collection(coleccion);
    return next();
    });
// Implementamos el API RESTFul a través de los métodos

app.get('/api', auth, (req, res, next) => {
    console.log('GET /api');
    console.log(req.params);
     console.log(req.collection);
     db.getCollectionNames((err, colecciones) => {
     if (err) return next(err);
     res.json(colecciones);
     });
 });
 app.get('/api/:coleccion', auth,(req, res, next) => {
    req.collection.find((err, coleccion) => {
    if (err) return next(err);
    res.json(coleccion);
     });
 });
 app.get('/api/:coleccion/:id', auth, (req, res, next) => {
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

https.createServer(OPTIONS_HTTPS,app).listen(port, () => {
    console.log(`SEC WS API REST ejecutándose en https://localhost:${port}/api/`);
});

