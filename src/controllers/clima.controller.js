import clima from '../views/clima.html?raw';

const createClima = () => {
    const divElement = document.createElement('div')
    divElement.classList.add('bg-gray-800',)
    divElement.innerHTML = clima;
    return divElement;
}

const eventClima = () => {
    const form = document.querySelector("form");
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const ciudad = formData.get('ciudad');
        const pais = formData.get('pais');
        if (ciudad == '' || pais === null) {
            mostrarError('Ambos campos son obligatorios', this)
            return;
        } else {
            consultarAPI(ciudad, pais, this)
        }
    })
}

function consultarAPI(ciudad, pais, container) {
    const appId = '5a814fcb9ecc08eeb778a4821085b2ec';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            limpiarHTML();
            if (data.cod === '404') {
                mostrarError('Ciudad No Encontrada', container)
            } else {
                mostrarClima(data)
            }
        })
}

function KelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}

function mostrarClima(datos) {
    console.log(datos)
    const resultado = document.querySelector('#resultado');
    // Formatear el Clima...

    const { name, main: { temp, temp_max, temp_min } } = datos;


    const grados = KelvinACentigrados(temp);
    const min = KelvinACentigrados(temp_max);
    const max = KelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${grados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl')

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')


    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')


    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv)
}

function limpiarHTML() {
    const resultado = document.querySelector('#resultado');
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarError(mensaje, container) {
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}


export { createClima, eventClima };