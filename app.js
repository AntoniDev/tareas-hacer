
require('colors');

const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();


const main = async() =>{
    console.log('Hola mundo');

    do {
        mostrarMenu();
    } while (opt !== 0);
   

    // pausa();

}

main();