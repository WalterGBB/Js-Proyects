// API para consultar el clima, url: https://openweathermap.org/current
const url_API_Clima = 'https://api.openweathermap.org/data/2.5/weather'
let apiKeyClima = 'be6db7e09bac5b69b60b0b939a368b4e'
const difKelvin = 273.15

// API para traducir la descripción del clima, url: https://rapidapi.com/dickyagustin/api/text-translator2/
const url_API_Traductor = 'https://text-translator2.p.rapidapi.com/translate';

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if (ciudad) { //Si ciudad no es ''
        fetchDatosClima(ciudad)
    } else {
        console.log('Ingrese el nombre de una ciudad')
    }
})

function fetchDatosClima(ciudad) {
    fetch(`${url_API_Clima}?q=${ciudad}&appid=${apiKeyClima}`)
        .then(data => data.json())
        .then(data => mostrarDatosClima(data))
}

function mostrarDatosClima(data) {
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML = '' //Siempre que demos click en botón Buscar se vaciará la información
    let nombreCiudad = data.name
    let nombrePais = data.sys.country
    /* Convertimos a minúsculas el nombre del país que recibimos de la API del clima para poder 
    usar la API de las banderas que lee el código en minúsculas*/
    let codBandera = nombrePais.toLowerCase()
    let temperatura = data.main.temp
    let humedad = data.main.humidity
    let presion = data.main.pressure
    let viento = data.wind.speed
    let descripcion = data.weather[0].description
    let iconoClima = data.weather[0].icon
    // Espera a que se resuelva la traducción antes de mostrar los datos
    // Primero llamamos a la función que traducirá la descripción
    // El argumento traduccion dentro de esta función será el texto traducido que retorna fetchTraduccion
    // Seguidamente se describen las acciones a realizar en el DOM luego de traducir el texto
    fetchTraduccion(descripcion).then(traduccion => {
        const ciudadTitulo = document.createElement('h2'); // Creamos un elemento h2
        ciudadTitulo.textContent = `${nombreCiudad}, ${nombrePais}`;
        // Asignamos un id al h2 para añadirle los íconos como elementos hijos
        ciudadTitulo.id = 'tituloCiudad'

        const temperaturaInfo = document.createElement('p');
        // toFixed(2) indica que el número flotante solo tomará los 2 primeros decimales
        temperaturaInfo.textContent = `Temperatura promedio: ${(temperatura - difKelvin).toFixed(2)}°C`;
        const humedadInfo = document.createElement('p')
        humedadInfo.textContent = `índice de humedad: ${humedad}%`
        const presionInfo = document.createElement('p')
        presionInfo.textContent = `Presión atmosférica: ${presion} hPa`
        const vientoInfo = document.createElement('p')
        vientoInfo.textContent = `Velocidad promedio del viento: ${Math.round(viento)} Km/h`
        const descripcionInfo = document.createElement('p');
        descripcionInfo.textContent = `Descripción meteorológica: "${traduccion}"`; //recién asignamos la traducción que nos retornó la función fetchTraduccion

        const iconClimaInfo = document.createElement('img');
        iconClimaInfo.src = `https://openweathermap.org/img/wn/${iconoClima}.png`;
        iconClimaInfo.alt = 'iconoClima-del-clima'

        // Url del API para insertar banderas: https://www.banderas-mundo.es/descargar/api
        const iconBandera = document.createElement('img')
        iconBandera.src = `https://flagcdn.com/32x24/${codBandera}.png`;
        iconBandera.alt = 'iconoClima-de-la-bandera'

        // Ingresamos los elementos creados como hijos al elemento padre div de id 'datosClima'
        divDatosClima.appendChild(ciudadTitulo);
        divDatosClima.appendChild(temperaturaInfo);
        divDatosClima.appendChild(humedadInfo);
        divDatosClima.appendChild(presionInfo);
        divDatosClima.appendChild(vientoInfo);
        divDatosClima.appendChild(iconClimaInfo);
        divDatosClima.appendChild(descripcionInfo);

        // Añadimos los íconos del clima y de la bandera al elemento padre h2 de id 'tituloCiudad'
        document.getElementById('tituloCiudad').appendChild(iconBandera);
    });
}

async function fetchTraduccion(descripcion) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '48e86c4600msh2c0cffd19e54b2dp13291ajsn587e554908a5',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'en',
            target_language: 'es',
            text: descripcion
        })
    };

    try {
        const response = await fetch(url_API_Traductor, options);
        const result = await response.json();
        /* Con .data.translatedText ingresamos a la propiedad predetermina dónde el objeto que retorna la 
        promesa resuelta guarda la traducción según la configuración de la API*/
        return result.data.translatedText
            // Expresión regular para capitalizar el primer caracter de la primera palabra del texto traducido
            // La función replace() en JavaScript toma esta expresión regular y la usa para buscar la primera letra de la primera palabra en la cadena.
            .replace(/^\w/, match => match.toUpperCase());
        /* expREG: (/^\w/)
        - Las barras '/' son los delimitadores de la expREG. 
        - ^ se interpreta como "inicio de cadena".
        - \w: se interpreta como "carácter de palabra", es un atajo para [a-zA-Z0-9_].
        - La barra invertida '\' indica que el siguiente carácter tiene un significado especial
        - match: Primer carácter de la primera palabra en la cadena sentence.*/
    } catch (error) {
        console.error('Error:', error);
        return 'Error en la traducción'; // Retorna un mensaje de error si la traducción falla
    }
}