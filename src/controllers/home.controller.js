import home from '../views/home.html?raw'

export default ()=>{
    const divElement = document.createElement('div')
    divElement.innerHTML = home;
    return divElement;
}