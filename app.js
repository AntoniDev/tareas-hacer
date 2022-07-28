
require('colors');

const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
const { guardarDB,
    leerDB
} = require('./helpers/guardarArchivo')
// const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // crear opción
                const desc = await leerInput('Descripción: ');
                console.log(desc);
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                // console.log(ids)
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    // console.log({id});
                    // console.log({ok});
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }

                break;
        }

        // const tarea = new Tarea('Comprar comida');
        // tareas._listado[tarea.id] = tarea;
        // console.log(tareas)

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();

    } while (opt !== '0');


}

main();