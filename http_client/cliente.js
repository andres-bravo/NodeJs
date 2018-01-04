//Cliente Http/Https
//Url github.com/andres-bravo/

class Cliente {
    //Metodo constructor recibe como parametro, host, port, protocol
    constructor(host, port, protocol){
        this.host = host;
        this.port = port;
        this.protocol = protocol;
        //Validamos el protocolo para que sea http o https
        if (this.protocol != "http" && this.protocol != "https"){
            console.log("ERROR!!!!!!!!!!") //Realmente debería disparar un error
        }
    }

    //Metodo de autenticacion
    autenticacion(user, pass){
        //Lleva la clase Buffer, para introducir user y password y se codifica en base64
        //es una codificación web pero podría ser ascii
        this.basicAuth = new Buffer(user+":"+pass).toString("base64");
    }

    //Procesamiento de Headers para mantener session -> Se realiza en el request
    //En Headers también se procesa la autenticación.
    procesarHeaders(){
        var headers={
            "Accept":"*/*", //Que parámetros acepto
            "User-Agent": "NodeJs Client" //Navegador o cliente, como es el nuestro pongo NodeJs
        };
        /*Si hemos definido la autenticación, le ponemos al objeto headers un campo que admite
          Authorization y que es "Basic " + lo que hemos almacenado en basichAuth*/
        if (this.basicAuth != undefined){
            headers.Authorization = "Basic " + this.basicAuth;
        }
        return headers;
    }


    //Metodo Get, realiza peticiones tipo Get para obtener info
    get(url, callback){
        var opciones={
            hostname: this.host,
            port: this.port,
            method: 'GET',
            path: this.protocol + "://" + this.host + url, //La url viene por parámetro al get
            headers: this.procesarHeaders() //Llamo al metodo para que los calcule
        };
        this.request(opciones, null, callback); //Lanzamos la petición
    }

    post(url, data, callback){
        var opciones={
            hostname: this.host,
            port: this.port,
            method: 'POST',
            path: this.protocol + "://" + this.host + url, //La url viene por parámetro al post
            headers: this.procesarHeaders() //Llamo al metodo para que los calcule
        };
        this.request(opciones, data, callback); //Lanzamos la petición
    }

    //request para manejar peticiones.
    request(options, data, callback){
        //http o https es pasado por parámetro por el usuario importamos la librería dependiendo de esto
        var http = require(this.protocol); //http o https está validado en constructor debería mirar el puerto tb.
        var respuesta = {
            status: null,
            body: "",
            headers: null
        };
        //peticion es una clase http.ClientRequest que es lo que retorna http.request
        //canalRespuesta es un Stream que es el parámetro del callback
        var peticion = http.request(options, (canalRespuesta) =>{
            canalRespuesta.on('data', (chunk) => {
                respuesta.body += chunk;
            });
            canalRespuesta.on('end', ()=>{
                respuesta.status = canalRespuesta.statusCode;
                respuesta.headers = canalRespuesta.headers;
                callback(respuesta); //Este callback llama llama al del get que a su vez devuelve el control al main.js
            });
        });
        console.log("Visualizo data:"+data);
        if (data != undefined && data != null){
            console.log("data"+data);
            peticion.write(JSON.stringify(data));
        }
        peticion.end();
    }
        
}

module.exports = Cliente;