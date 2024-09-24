//Desestructuración de datos
import { barcelona, roma, paris, londres } from "./infoCiudades.js"; // . y / porque están en la misma carpeta

/*Obtener los elementos del DOM (Document Object Model)
  Representación estructurada de un doc html, permite modificar la estructura, contenido o
  estilos de la página web de forma dinámica; el DOM se organiza como un árbol de nodos,
  cada nodo es un elemento que es un obejeto en JS con propiedades y métodos con los que
  podemos interactuar y modificar la aplciación para hacerla más dinámicas, el buen uso
  del DOM permite hacer páginas más dinámicas e interactivas*/
let enlaces = document.querySelectorAll('li > a') //seleccionamos todos los <a> descendientes del li para no afectar el nav
let tituloElemento = document.getElementById('titulo')
let subTituloElemento = document.getElementById('subtitulo')
let parrafoElemento = document.getElementById('parrafo')
let precioElemento = document.getElementById('precio')
let ubicacionElemento = document.getElementById('ubicacion')
let imagenElemento = document.getElementById('imagen')

//Agregamos un evento click y una función a cada enlace
enlaces.forEach(function (enlace) {
    enlace.addEventListener('click', function () { //Agregamos el evento click a cada enlace y describimos la función que desencadena al dar dicho click

        //Removemos la clase active, volvemos a recorrer cada enlace
        enlaces.forEach(enlace => {
            enlace.classList.remove('active');
        });

        //Agregamos la clase active al enlace que hicimos click (this hace referencia al enlace que dimos click)
        this.classList.add('active')

        //Obetener el contenido (objeto) correspondiente según el enlace
        let contenido = obtenerContenido(this.textContent) //textContent representa el texto que va dentro de cada enlace <a>

        //Mostrar el contenido en el DOM
        tituloElemento.innerHTML = contenido.titulo //igualamos el texto de los elementos según su id al texto que obtenemos de las propiedades de infoCiudades.js
        subTituloElemento.innerHTML = contenido.subtitulo
        parrafoElemento.innerHTML = contenido.parrafo
        precioElemento.innerHTML = contenido.precio
        /*En el caso del iframe, no se utiliza innerHTML porque no estamos manipulando el 
        contenido HTML dentro del iframe, solo cambiamos el atributo src*/
        ubicacionElemento.src = contenido.ubicacion
        ubicacionElemento.style.display = 'inline'
        imagenElemento.src = contenido.imagen
        //Para mostrar la imagen que se encuentra oculta (hidden)
        imagenElemento.style.display = 'inline'
        imagenElemento.style.display = 'inline'
    })
})


//Función para traer la información correcta desde infoCiudades.js
function obtenerContenido(enlace) { //enlace es un string que representa el nombre de la ciudad que dimos click
    /*Entre comillas va el nombre que aparece en el doc html, luego de los dos puntos va 
    el nombre de los objetos definidos en infoCiudades.js*/
    let contenido = {
        'Barcelona': barcelona, //si damos click en el enlace Barcelona nos devolverá el objeto barcelona
        'Roma': roma,
        'París': paris,
        'Londres': londres
    }
    /*Al final retornamos la información del objeto que corresponda según el nombre del
    enlace que estemos dando click*/
    return contenido[enlace]
}