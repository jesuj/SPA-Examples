import background from '../views/background.html?raw';

const createBackground = () => {
    const divElement = document.createElement('div')
    divElement.innerHTML = background;
    divElement.classList.add('mb-10')
    return divElement;
}

const eventBackground = () => {
    const red = document.querySelector('#red')
    const green = document.querySelector('#green')
    const blue = document.querySelector('#blue')
    const border = document.querySelector('#border')
    const p = document.querySelector('p')
    const box = document.querySelector('#box')
    const colors = document.querySelector('#colors')

    function render(e) {
        const r = red.value;
        const g = green.value;
        const b = blue.value;
        const borderValue = border.value;
        console.log(colors.value);

        red.nextElementSibling.textContent = `${r}`
        green.nextElementSibling.textContent = `${g}`
        blue.nextElementSibling.textContent = `${b}`
        border.nextElementSibling.textContent = `${borderValue}`

        document.body.style.backgroundColor = `rgb(${r},${g},${b})`
        p.textContent = `rgb(${r}, ${g}, ${b})`
        colors.value = `#${ColorToHex(r) + ColorToHex(g) + ColorToHex(g)}`
        box.style.borderWidth = `${borderValue}px`
    }

    red.addEventListener('input', render)
    green.addEventListener('input', render)
    blue.addEventListener('input', render)
    border.addEventListener('input', render)

    function ColorToHex(color) {
        var hexadecimal = color.toString(16);
        return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
    }
}

export {createBackground,eventBackground}