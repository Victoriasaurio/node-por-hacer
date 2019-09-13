const argv = require('./config/yargs').argv;
const porHacer = require('./Por-Hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];
switch (comando) {
    case 'listar':
        let listado = porHacer.getListar();

        for (let tarea of listado) {
            console.log('====== Por hacer ========'.rainbow);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('========================='.rainbow);
        }

        break;

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no reconocido');
}