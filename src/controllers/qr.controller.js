import qr from '../views/qr.html?raw';

const createQR = () => {
    const divElement = document.createElement('div')
    divElement.classList.add('bg-gray-800',)
    divElement.innerHTML = qr;
    return divElement;
}

const eventQR = () => {
    const formulario = document.querySelector('#formulario')
    const contenedorQR = document.querySelector('#contenedorQR')
    const QR = new QRCode(contenedorQR);
    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        QR.makeCode(formulario.url.value);
    })
}

export {createQR, eventQR}