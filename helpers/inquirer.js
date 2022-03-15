const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        pageSize: 12,
        message: '¿Qué desea hacer?',
        choices:  [
            {
                value: '1',
                name: `${'1.'.green} Crear lista`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar una tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir\n`
            },

        ]
    }
]

const pausa = [
    {
        type: 'input',
        name: 'tecla',
        message: `Presione ${'ENTER'.green} para continuar`,

    }

]


const inquirerMenu = async() => {
    console.clear();
    console.log('============================'.green);
    console.log('     Seleccione una opción  '.green);
    console.log('============================\n'.green);
    
    const {opcion} = await inquirer.prompt(preguntas)
    return opcion
}

const inquirerPause = async () => {
    await inquirer.prompt(pausa)
}

const inquireInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ]
    const descripcion = await inquirer.prompt(question)
    return descripcion
}

const inquireBorrar = async (tareas = [])=> {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`

        }
    })
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Elija una tarea a borrar',
            choices:  choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas)
    return id
} 

const confirmar = async (message) => {
    const preguntas = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(preguntas)
    return ok
}

const inquireCheckList = async (tareas = [])=> {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false

        }
    })
  
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione tareas ',
            choices:  choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas)
    return ids
} 

module.exports = {
    inquirerMenu,
    inquirerPause,
    inquireInput, 
    inquireBorrar,
    confirmar,
    inquireCheckList
}