# Backend CRUD API REST

_Ejemplo de WS REST con NodeJS que proporciona un API CRUD para gestionar una DB MongoDB._

-Primero de todo comenzaremos con instalarnos mongodb
-Posterior a esto crearemos un servicio CRUD(Crear,Leer,Actualizar,Eliminar) mediante API REStful y MongoDb
-Y por ultimo probaremos el nuevo servicio creado.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


Ver **Deployment** para conocer cómo desplegar el proyecto.


### Pre-requisitos 📋

_Qué cosas necesitas para instalar el software y cómo instalarlas_

Antes de todo necesitaras tener un repositorio creado ya sea en github o en bitbucket para poder continuar e implementar
adecuadamente una base de datos.

Una vez que ya tenemos una cuenta procederemos a instalar el nodemon para ir actualizando el repositorio sin tener que estar actualizandolo constantemente

$ npm i -D nodemon

Utilizando nuestro editor (recomendacion Visual Studio Code)incluimos una línea (resaltada en negrita: "start": "nodemon index.js",) en la sección scripts del archivo package.json para crear un script de inicio que invoque nodemon

El comando para poner en marcha el index.js será:

$ npm start

Se sustituye este nuevo comando por el antiguo ya node index.js

Ahora procederemos con la instalacion de morgan 

$ npm i -S morgan

Gracias a morgan tendremos mas informacion sobre lo que esta ocurriendo cuando realizemos las operaciones de CRUD o cualquier otro tipo de accion.


Por ultimo utilizaremos postman para las operaciones CRUD para ello será necesario crearse una cuenta y vincularla con nuestro 
repositorio remoto, utilizando postman crearemos distintas colecciones para llevar a cabo las operaciones de CRUD.


Proporciona un ejemplo
```

### Instalación 🔧

Primero procederemos a instalar mongodb con las siguientes instrucciones:

$ sudo apt update
$ sudo apt install -y mongodb

Los comandos basicos de mongo los podremos utilizar con "systemctl" lo que nos quedaria el siguiente comando

$ sudo systemctl start mongodb

Para verificar si mongo esta funcionando correctamente usaremos:

$ mongo --eval 'db.runCommand({ connectionStatus: 1 })'

Finalmente, en otra terminal podemos abrir el gestor de la base de datos (cliente mongo) y probar
directamente desde la terminal comandos para gestionarla

$ mongo --host 127.0.0.1:27017
> show dbs

Ahora tendremos que instalar el cliente de mongo en nuestra carpeta proyecto

$ cd
$ cd node/api-rest
$ npm i -S mongodb
$ npm i -S mongojs

En este caso utilizaremos la libreria de mongojs



## Ejecutando las pruebas ⚙️

Para ejecutar las pruebas iremos a postman y crearemos distintas colecciones con get,delete,put y post, iniciaremos con el comando:

$ npm start

Y procederemos a utilizar los comandos anteriormente mencionados en el Postman

### Analice las pruebas end-to-end 🔩

_Explica qué verifican estas pruebas y por qué_

```
Proporciona un ejemplo
```

### Y las pruebas de estilo de codificación ⌨️

_Explica qué verifican estas pruebas y por qué_

```
Proporciona un ejemplo
```

## Despliegue 📦

_Agrega notas adicionales sobre cómo hacer deploy_

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - El framework web usado
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [ROME](https://rometools.github.io/rome/) - Usado para generar RSS

## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://gist.github.com/tu/tuProyecto) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tu/proyecto/wiki)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Paco Maciá** - *Trabajo Inicial* - [pmacia](https://github.com/pmacia)
* **Omar Hsiba Busquets** - *Documentación* - [fulanitodetal](#fulanito-de-tal)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quiénes han participado en este proyecto. 

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.