let puntaje
let respuesta
let num
const elementos = document.getElementsByClassName('ocultos') //devuelve una colección de todos los elementos en el doc html que tengan dicha clase

function jugar() {
	puntaje = 100
	respuesta = null
	num = numAleatorio()
	document.getElementById('puntaje').textContent = 'Puntaje: ' + puntaje
	document.getElementById('respuesta').value = respuesta
	document.getElementById('pista').textContent = ''
	/* OJO --> Si intentas llamar a una función que no se encuentra declarada en el script, 
	el intérprete de JavaScript al no encontrar identificará este error y detendrá 
	la ejecución evitando que el resto del script se ejecute correctamente.*/
	// OJO --> No llamar por el mismo nombre a variables y métodos para evitar errores
	// document.getElementById('numero').value = num
	document.getElementById('btnJugar').style.display = 'none'
	// Iteramos sobre la colección y cambiamos el estilo de visualización de cada elemento
	for (var i = 0; i < elementos.length; i++) {
		elementos[i].style.display = 'inline-block'; // hacemos aparecer los elemntos ocultos
	}
}

function comprobar() {
	let valor = document.getElementById('respuesta').value

	if (valor == 0) { //El valor por defecto de un input number será 0
		document.getElementById('pista').textContent = 'Ingresa un valor válido'
	} else {

		if (valor == num) {
			/* Con la propiedad textContent los caracteres de escape como \n no se interpretan como saltos de línea
			   por eso uso innerHTML para agregar la etiqueta de salto de linea <br>al doc html*/
			document.getElementById('pista').innerHTML = '¡ FELICIDADES, ganaste :) !<br>Puntuación: ' + puntaje
			resetear()
		} else {
			if (valor > num) {
				document.getElementById('pista').textContent = 'prueba con un número menor'
			} else {
				document.getElementById('pista').textContent = 'prueba con un número mayor'
			}
			puntaje -= 5
			document.getElementById('puntaje').textContent = 'Puntaje: ' + puntaje
		}
	}

	if (puntaje == 0) {
		document.getElementById('pista').textContent = 'PERDISTE :(, inténtalo otra vez'
		resetear()
	}

}

function numAleatorio() {
	const numAleatorio = Math.random() * 100
	const num = Math.floor(numAleatorio) + 1
	return num
}

function resetear() {
	document.getElementById('btnJugar').style.display = 'inline-block'
	document.getElementById('btnJugar').value = 'Jugar otra vez'
	for (var i = 0; i < elementos.length; i++) {
		elementos[i].style.display = 'none'; //ocultamos los elementos al perder o ganar el juego
	}
}