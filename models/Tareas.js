const Tarea = require("./Tarea");
require('colors');

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado;
    }
    constructor() {
        this._listado = {}
    }

    borrarTarea (id = '') {
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    cargarTareasFromArray (tareas = []){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        });
        
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto(){
       console.log()
       this.listadoArr.forEach( (tarea, i)=> {
                const index = `${i + 1}.`.green
                const {desc, completadoEn} = tarea
                const estado = (completadoEn)
                            ? 'Completado'.green 
                            : 'Pendiente'.red
                console.log(`${index} ${desc} :: ${estado}`)
                
            } )
        console.log()
    }

    listarCompletadasPendientes(completadas= true) {
        console.log()
        let number = 0;
        this.listadoArr.forEach( tarea=> {
            const {desc, completadoEn} = tarea
            if(completadas){
                if(tarea.completadoEn){
                    number += 1
                    console.log(`${(number + '.').green} ${desc} :: ${completadoEn.green}`)
                }
            }
            else {
                if(!tarea.completadoEn){
                    number += 1
                    console.log(`${(number + '.').green } ${desc} :: ${completadoEn}`)
                }
            }

        })
              
        console.log()
    }

    toggleCompletadas (ids = []) {
        ids.forEach( id => {
            const tarea =  this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null 
            }
        })
    }

}

module.exports = Tareas;
