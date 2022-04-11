import pages from "../controllers";

const app = document.querySelector('#root')

/**
 * 
 * @param {String} route 
 */
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
        case '#/background':
            app.appendChild(pages.background.createBackground())
            pages.background.eventBackground();
            break;
        case '#/formulario':
            app.appendChild(pages.formulario.createFormulario())
            pages.formulario.eventFormulario();
            break;
        case '#/clientes':
            app.appendChild(pages.cliente.createListarClientes())
            pages.cliente.eventListarClientes();
            break;
        case '#/clima':
            app.appendChild(pages.clima.createClima())
            pages.clima.eventClima();
            break;
        default:
            break;
    }
    if (/^\#\/formulario\?id=\d+/.test(route)) {
        // console.log(route.match(/\d+/))
        let id = route.match(/\d+/)
        app.appendChild(pages.formulario.createFormulario(Number(id[0]), 'edit'))
        pages.formulario.eventFormulario(Number(id[0]), 'edit');
    }
}
