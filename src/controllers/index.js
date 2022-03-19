import Home from './home.controller'
import {createContador,eventContador} from './contador.controller'
import {createBackground,eventBackground} from './background.controller';

const pages = {
    home: Home,
    contador: {createContador,eventContador},
    background: {createBackground,eventBackground}
}

export default pages