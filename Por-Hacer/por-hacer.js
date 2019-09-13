const fs = require('fs');

let listadoHacer = [];

const guardarBD = () => {
    data = JSON.stringify(listadoHacer);

    fs.writeFile('bd/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const getListar = () => {
    cargarBD();
    return listadoHacer;
}

const cargarBD = () => {
    try {
        listadoHacer = require('../bd/data.json');
    } catch (error) {
        listadoHacer = [];
    }
}

const crear = (descripcion) => {
    cargarBD();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoHacer.push(porHacer);
    guardarBD();
    return porHacer;

}

/* Busca tareas y las compara para despúes poder actualizar */
const actualizar = (descripcion, completado = true) => {
    cargarBD();

    /* Se puede reducir la función flecha en una solo instrucción */
    let index = listadoHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoHacer[index].completado = completado;
        guardarBD();
        return true;
    } else {
        return false;
    }
}

/* filter: filtra o borra los archivos de un arreglo */
const borrar = (descripcion) => {
    cargarBD();

    let nuevoListado = listadoHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoHacer = nuevoListado;
        guardarBD();
        return true;
    }
}

module.exports = {
    crear,
    getListar,
    actualizar,
    borrar
}