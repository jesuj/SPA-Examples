import formulario from '../views/formulario.html?raw'
import { crearRegistro,buscarid, actualizar } from "../db/citas";

const createFormulario = (id,type) => {
    const divElement = document.createElement('div');
    divElement.innerHTML = formulario;
    if (id!=0 && type == 'edit') {
        editarFormaulario(id)
    }
    return divElement
}

function editarFormaulario(id){
    buscarid(id)
}

const eventFormulario = (id,type) => {
    const form = document.querySelector("form");


    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get("name");
        const lastName = formData.get("lastName");
        const age = formData.get("age");

        const schemaName = {
            value: name,
            required: true,
            minLength: 3,
            maxLength: 10,
        };
        const schemaLastName = {
            value: lastName,
            required: true,
            minLength: 3,
            maxLength: 12,
        };
        const schemaAge = { value: +age, required: true, min: 1, max: 80 };
        let _mensaje;
        if (validate(schemaName) && validate(schemaLastName) && validate(schemaAge)) {
            // alert("SEND EMAIL");
            const objSend = {  name, lastName, age };
            if (type == 'edit') {
                objSend.id = id;
                _mensaje = actualizar(objSend);
            }else {
                objSend.id=Date.now();
                _mensaje = crearRegistro(objSend);
            }
        } else {
            // alert("DATOS NO VALIDOS");
            _mensaje = { mensaje: 'Datos no validos', tipo: 'error'}
        }
        let span = mensaje(_mensaje.mensaje,_mensaje.tipo);
        this.insertAdjacentElement('afterbegin', span)
        setTimeout( () => {
            span.remove();
            if (_mensaje.tipo == 'send') {
                location.replace('/#/clientes')
            }
        }, 3000);
    });
}

function mensaje(mensaje, tipo) {
    const span = document.createElement('span');
    if (tipo == 'error') {
        span.className = 'bg-red-500 text-center p-1 text-lg font-bold rounded-md tracking-wider';
    } else {
        span.className = 'bg-emerald-500 text-center p-1 text-lg font-bold rounded-md tracking-wider';
    }
    span.textContent = mensaje
    return span;
}

function validate({ value, required, minLength, maxLength, min, max }) {
    let isValid = true;
    if (required) {
        isValid = isValid && value.toString().trim().length !== 0;
    }

    if (minLength !== null && typeof value === "string") {
        isValid = isValid && value.length >= minLength;
    }

    if (maxLength !== null && typeof value === "string") {
        isValid = isValid && value.length <= maxLength;
    }

    if (min !== null && typeof value === "number") {
        isValid = isValid && value >= min;
    }

    if (max !== null && typeof value === "number") {
        isValid = isValid && value <= max;
    }

    return isValid;
}


export { createFormulario, eventFormulario }