import Home from './home.controller'
import {createContador,eventContador} from './contador.controller'

const pages = {
    home: Home,
    contador: {createContador,eventContador},
}

export default pages