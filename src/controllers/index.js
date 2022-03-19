import Home from './home.controller'
import {createContador,eventContador} from './contador.controller'
import {createBackground,eventBackground} from './background.controller';
import { createFormulario,eventFormulario } from "./formulario.controller";

const pages = {
    home: Home,
    contador: {createContador,eventContador},
    background: {createBackground,eventBackground},
    formulario: {createFormulario,eventFormulario}
}

export default pages