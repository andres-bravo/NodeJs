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

    //Procesamiento de Headers para mantener session -> Se realiza en el request
    procesarHeaders(){
        var headers={
            "Accept":"*/*", //Que parámetros acepto
            "User-Agent": "Cliente Node.js" //Navegador o cliente, como es el nuestro pongo NodeJs
        };
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
        this.request(opciones, callback); //Lanzamos la petición
    }

    post(url, data){

    }

    //request para manejar peticiones.
    request(options, callback){
        //http o https es pasado por parámetro por el usuario importamos la librería dependiendo de esto
        var http = require(this.protocol); //http o https está validado en constructor debería mirar el puerto tb.
        var respuesta = {
            status: null,
            body: "",
            headers: null
        };
        var peticion = http.request(options, (canalRespuesta) =>{
            canalRespuesta.on('data', (chunk) => {
                respuesta.body += chunk;
            });
            canalRespuesta.on('end', ()=>{
                respuesta.status = canalRespuesta.statusCode;
                respuesta.headers = canalRespuesta.headers;
                callback(respuesta);
            });
        });
        peticion.end();
    }
        
}

module.exports = Cliente;