//Importamos la clase cliente
var Cliente = require("./cliente.js");

//Creamos un cliente, instanciación de la clase

//Utilizo api.github.com para que me devuelva un html de mi usuario
//https://api.github.com/users/andres-bravo
//esto nos devuelve algo que podemos leer
var clienteGitHub = new Cliente("api.github.com","443","https"); 

console.log(clienteGitHub);
console.log("host:", clienteGitHub.host);

/*Aquí tendríamos que autenticarnos también.
no hacemos respuesta = .... para no bloquear la ejecución en cambio ponermos un callback para 
que la aplicación siga ejecutando*/
clienteGitHub.get("/users/andres-bravo", (respuesta)=> {
    console.log(respuesta);
});
