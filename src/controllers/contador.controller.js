import contador from '../views/contador.html?raw'

const createContador = () => {
    const divElement = document.createElement('div')
    divElement.classList.add('bg-gray-800')
    divElement.innerHTML = contador;
    return divElement;
}


const eventContador = ()=>{
    const decremento = document.querySelector('#btnDecrement');
    const incremento = document.querySelector('#btnIncrement');
    const result = document.querySelector('#result');
    const btnToggle = document.querySelector('#btnToggle')
    const box = document.querySelector('#box')
    
    let count = 1;
    let isToggle = true;
    
    decremento.addEventListener('click', () => {
        result.textContent = count > 0 ? --count : 0;
    })
    
    incremento.addEventListener('click', () => {
        result.textContent = ++count;
    })
    
    btnToggle.addEventListener('click', (e) => {
        isToggle = !isToggle;
        box.classList.remove(isToggle ? 'bg-white' : 'bg-gray-700');
        box.classList.add(isToggle ? 'bg-gray-700' : 'bg-white')
    })
}

export {createContador,eventContador}