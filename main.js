import './src/tailwind.css'

const iconBtn = document.querySelector('[aria-controls=mobile-menu]')
const mobileMenu = document.querySelector('#mobile-menu')

iconBtn.addEventListener('click', (e)=>{
  const svgOpen = iconBtn.querySelector('svg');
  const svgExit = svgOpen.nextElementSibling;
  // JSON.parse es para convertir a true
  let isToggle = JSON.parse(iconBtn.getAttribute('aria-expanded'))
  iconBtn.setAttribute('aria-expanded', !isToggle)
  if (isToggle) {
    svgOpen.classList.remove('hidden')
    svgExit.classList.add('hidden')
    mobileMenu.classList.remove('hidden')
  }else {
    svgOpen.classList.add('hidden')
    svgExit.classList.remove('hidden')
    mobileMenu.classList.add('hidden')
  }
})


import {router} from './src/router/index.routes'
// Routas
window.addEventListener('hashchange', ()=>{
  router(window.location.hash)
})

window.addEventListener('load', (e)=>{
  if (window.location.pathname == '/' && window.location.hash == '') 
    router('#/')
  else 
    router(window.location.hash)
})
