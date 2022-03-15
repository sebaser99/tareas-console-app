const { guardarDb, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, inquirerPause, inquireInput, inquireBorrar, confirmar, inquireCheckList } = require('./helpers/inquirer');
const Tarea = require('./models/Tarea');
const Tareas = require('./models/Tareas');


require('colors');

const main = async () => {
    let opcion = '';
    const tareas = new Tareas();
    const tareasDb = leerDb();

    if(tareasDb) {   
      tareas.cargarTareasFromArray(tareasDb)
    }
   
    do{
        opcion = await inquirerMenu()
       

        switch(opcion){
            case '1':
                const {desc} = await inquireInput('Descripción: ')
                tareas.crearTarea(desc)
            break;

            case '2':
                tareas.listadoCompleto()
            break;

            case '3':
                tareas.listarCompletadasPendientes()
            break;

            case '4':
                tareas.listarCompletadasPendientes(false)
            break;

            case '5':
                const ids = await inquireCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
            break;

            case '6':
                const id =  await inquireBorrar(tareas.listadoArr)
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro que desea borrar esta nota?')
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log(`
                        Tarea borrada Exitosamente
                        `)
                    }
                }
            break;

        }

        guardarDb(tareas.listadoArr)
        // const tarea = new Tarea('Hacer la comida')
        // console.log(tarea)
        // const tareas = new Tareas()
        // tareas._listado[tarea.id] = tarea
        // console.log(tareas)
        if(opcion !== '0') await inquirerPause()

       
      
    } while(opcion !== '0')
   

}

main()