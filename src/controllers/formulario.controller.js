import formulario from '../views/formulario.html?raw'

const createFormulario = () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = formulario;
    return divElement
}

const eventFormulario = () => {
    const form = document.querySelector("form");

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

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get("name");
        const lastName = formData.get("lastName");
        const age = formData.get("age");

        const schemaName = {
            value: name,
            required: true,
            minLength: 4,
            maxLength: 10,
        };
        const schemaLastName = {
            value: lastName,
            required: true,
            minLength: 4,
            maxLength: 12,
        };
        const schemaAge = { value: +age, required: true, min: 1, max: 80 };

        if (validate(schemaName) && validate(schemaLastName) && validate(schemaAge)) {
            alert("SEND EMAIL");
            const objSend = { name, lastName, age };
            console.log(objSend);
        } else {
            alert("DATOS NO VALIDOS");
        }
    });
}

export {createFormulario,eventFormulario}