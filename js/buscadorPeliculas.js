document.getElementById('searchButton').addEventListener('click', buscarPelicula)

const api_key = 'c33b4d6515fb658f5a760a329696b155'
const urlBase = 'https://api.themoviedb.org/3/search/movie'
const urlImg = 'https://image.tmdb.org/t/p/w500'

//div dondé irán todos los resultados encontrados
let containerResults = document.getElementById('results')

function buscarPelicula() {
    //texto que aparece mientras va cargando la información de la API
    containerResults.innerHTML = 'Cargando...'
    //nombrePelicula debe ir dentro de la función para que se actualice cada vez que el usuario haga clic en el botón de id searchButton
    let nombrePelicula = document.getElementById('searchInput').value

    //LLamando a la API TMDb
    fetch(`${urlBase}?query=${nombrePelicula}&api_key=${api_key}`)
        .then(data => data.json())
        //tomamos la propiedad .results del objeto que retorna data porque ahí se encuentra la información pertinente a la búsqueda
        .then(data => mostrarInformación(data.results))
}

function mostrarInformación(movies) {
    //limpiamos el texto 'Cargando...' cuando ya cargó la información de la API
    containerResults.innerHTML = ''

    //Si no se ha encontrado ninguna película con el nombre ingresado
    if (movies.length === 0) {
        containerResults.innerHTML = 'No se encontró una película con ese nombre <br> Prueba con otro título :D'
        return //Finaliza la función, es como un break
    }

    //Por cada resultado encontrado:
    movies.forEach(movie => {
        //Crearemos un div padre
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')
        let titulo = document.createElement('h3')

        //Recibo el titulo de cada pelicula y lo traduzco
        fetchTraduccion(movie.original_title).then(traduccion => {
            //Una vez traducido lo asigno recién al textContent de la película
            titulo.textContent = traduccion
        })

        let anio = document.createElement('p')
        anio.textContent = 'Fecha de estreno: ' + movie.release_date

        let sinopsis = document.createElement('p')

        //Lo mismo con la sinopsis
        fetchTraduccion(movie.overview).then(traduccion => {
            sinopsis.textContent = `Sinopsis: ${traduccion}`
        })

        let poster = document.createElement('img')
        poster.src = urlImg + movie.poster_path

        let calificacion = document.createElement('p')
        calificacion.textContent = 'Calificación: ' + (movie.vote_average).toFixed(1)

        //Adjuntamos los elementos hijos al div padre
        movieDiv.appendChild(poster)
        movieDiv.appendChild(titulo)
        movieDiv.appendChild(anio)
        movieDiv.appendChild(calificacion)
        movieDiv.appendChild(sinopsis)

        //Adjuntamos cada div generado al div de id 'results'
        containerResults.appendChild(movieDiv)
    });

}

async function fetchTraduccion(texto) {
    const url_API_Traductor = 'https://text-translator2.p.rapidapi.com/translate';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '862e79fc33msh236b922f0d2a484p158209jsn1b6178be1b3b',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'en',
            target_language: 'es',
            text: texto
        })
    };

    try {
        const response = await fetch(url_API_Traductor, options);
        const result = await response.json();
        return result.data.translatedText //Nos retorna la propiedad del objeto promesa donde se guarda el texto traducido
    } catch (error) {
        console.error('Error:', error);
        return 'Error en la traducción'; // Retorna un mensaje de error si la traducción falla
    }
}
