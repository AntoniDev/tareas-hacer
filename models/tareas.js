

/**
 *  _listado:{
 *     'uuid-123414-141342-1: { id:uuid-123414-141342-1, desc:asd, completadoEn:92231},
 *      'uuid-123414-141342-1: { id:uuid-123414-141342-1, desc:asd, completadoEn:92231},
 *      'uuid-123414-141342-1: { id:uuid-123414-141342-1, desc:asd, completadoEn:92231},
 *      'uuid-123414-141342-1: { id:uuid-123414-141342-1, desc:asd, completadoEn:92231},
 * }
 **/

const Tarea = require("./tarea");
require('colors');


class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        // indice: verde,
        // Completada: verde,
        // Pendiente: rojo

        // 1. Alma :: Completada | Pendiente
        // 2. Piedra :: Completada | Pendiente
        // 3. Realidad :: Completada | Pendiente

        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx}. ${desc} :: ${estado}`)

        })

    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            }

        })
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        })

        this.listadoArr.forEach( tarea => {
            
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }

}

module.exports = Tareas;

