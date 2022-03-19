import pages from "../controllers/index";

const app = document.querySelector('#root')

export const router = (route)=>{
    app.innerHTML = '';
    console.log(route);
    switch (route) {
        case '#/':
            app.appendChild(pages.home())
            break;
    
        default:
            break;
    }
}