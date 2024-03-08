import { header } from "./componentes/header";
import { home } from "./vistas/home";

document.querySelector('header').innerHTML = header.template

document.querySelector('main').innerHTML = home.template
home.script()