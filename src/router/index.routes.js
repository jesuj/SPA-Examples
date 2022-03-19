import pages from "../controllers/index";

const app = document.querySelector('#root')

export const router = (route) => {
    app.innerHTML = '';
    switch (route) {
        case '#/':
            app.appendChild(pages.home())
            break;
        case '#/contador': 
            app.appendChild(pages.contador.createContador())
            pages.contador.eventContador();
            break;
        default:
            break;
    }
}
