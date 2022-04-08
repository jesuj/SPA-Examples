export let DB;

window.addEventListener('DOMContentLoaded', () => {
    crearDB();
})

// Create BD de indexdDB
function crearDB() {
    let citasdb = window.indexedDB.open('citas', 1);
    citasdb.onerror = function (e) {
        console.log('error en la crear la db');
    }
    citasdb.onsuccess = function (e) {
        DB = citasdb.result;
        // console.log(DB)
    }
    citasdb.onupgradeneeded = function (e) {
        const db = e.target.result;
        const objectStore = db.createObjectStore('citas',{ keyPath: 'id', autoIncrement: true})

        objectStore.createIndex('name','name',{unique:false})
        objectStore.createIndex('lastName','lastName',{unique:false})
        objectStore.createIndex('age','age',{unique:false})
        objectStore.createIndex('id', 'id', { unique: true } );
    }
}

export function crearRegistro(cliente) {
    const transaction = DB.transaction(['citas'],'readwrite')
    const objectStore = transaction.objectStore('citas')
    objectStore.add(cliente);
    transaction.onerror = function (e) {
        return {mensaje: 'Error en la base de datos', tipo: 'error'}
    }
    transaction.oncomplete = function (e) {
        console.log('datos guardados')
    }
    return {mensaje: 'Datos Guardados',tipo: 'send'}
}

export function obtenerClientes(){
    const objectStore = DB.transaction('citas').objectStore('citas')
    objectStore.openCursor().onsuccess = function (e) {
        const cursor = e.target.result;
        if (cursor) {
            // console.log(cursor.value)
            const {name,lastName,age,id} = cursor.value;
            const listadoClientes = document.querySelector('#listado-clientes');
            listadoClientes.innerHTML += `
            <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${lastName}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${age}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="#/formulario?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="delete text-red-600 hover:text-red-900">Eliminar</a>
                </td>
            </tr>`;
            cursor.continue();
        }else {
            let deleteItem = document.querySelectorAll('.delete');
            // console.log(deleteItem)
            deleteItem.forEach(item =>{
                item.addEventListener('click', e=>{
                    e.preventDefault();
                    eliminar(Number(e.target.dataset.cliente))
                    e.target.parentElement.parentElement.remove();
                })
            })
        }
    }
}

function eliminar(id){
    const transaction = DB.transaction(['citas'],'readwrite');
    const objectStore = transaction.objectStore('citas')
    objectStore.delete(id)
    
}

export function buscarid(id){
    const transaction = DB.transaction(['citas'],'readwrite');
    const objectStore = transaction.objectStore('citas')

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
        const cursor = e.target.result;
        if (cursor) {
            if (cursor.value.id === id) {
                cargarDatosForm(cursor.value)
            }
            cursor.continue();
        }
    }
}

function cargarDatosForm({name,lastName,age,id}){
    console.log(name,lastName,age,id);
    const nameInput = document.querySelector('#name')
    const lastNameInput = document.querySelector('#lastName')
    const ageInput = document.querySelector('#age')
    const btn = document.querySelector('#send')

    nameInput.value = name
    lastNameInput.value = lastName
    ageInput.value = age
    btn.textContent='Actualizar'
}

export function actualizar(cliente){
    const transaction = DB.transaction(['citas'],'readwrite');
    const objectStore = transaction.objectStore('citas')
    objectStore.put(cliente)
    transaction.oncomplete = function(){
    }
    transaction.onerror = function(){
        return {mensaje: 'Error en la base de datos', tipo: 'error'}
    }
    return {mensaje: 'Datos Guardados',tipo: 'send'}
}