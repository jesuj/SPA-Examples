import cliente from '../views/clientes.html?raw'
import { obtenerClientes } from "../db/citas";

const createListarClientes = () => {
    const divElement = document.createElement('div');
    divElement.className = 'md:w-3/5  xl:w-4/5 px-5 py-10 mx-auto'
    divElement.innerHTML = cliente;
    return divElement
}

const eventListarClientes = () => {
    obtenerClientes();
}

export { createListarClientes, eventListarClientes }