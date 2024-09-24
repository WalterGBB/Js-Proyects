//Utilizaremos Firebase como una base de datos no relacional, para capturar la información enviada por el formulario y guardarla
const firebaseConfig = {
    apiKey: "AIzaSyCzvhPDqFtstjAGQ20fkIgbvqJE_aWcio4",
    authDomain: "datosformulario-69d4c.firebaseapp.com",
    projectId: "datosformulario-69d4c",
    storageBucket: "datosformulario-69d4c.appspot.com",
    messagingSenderId: "26256615459",
    appId: "1:26256615459:web:bac62e32c0f5652ad66996",
    measurementId: "G-VNPYLXS77E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    //preventDefault para suprimir la actualización de la página por defecto
    event.preventDefault()

    /*OJO: En JS, las cadenas vacías '' se consideran valores "falsy". Esto significa 
    que cuando se evalúan en un contexto booleano (como dentro de un if), se convierten 
    en false, por defecto para que un if se ejecute la condición debe ser verdadera, sino
    pasará a ejecutarse el else. */

    //Validar nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') { //.trim() borra los espacios de los costados
        errorNombre.textContent = 'Por favor introduce tu nombre'
        emailError.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar correo electrónico
    let entradaEmail = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailPattern.test(entradaEmail.value)) { //Si el email ingresado no cumple con el patrón de la regEXP:
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    } else { //Si cumple:
        emailError.textContent = 'Por favor introduce un email válido'
        emailError.classList.add('error-message')
    }

    //Validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
    if (!contrasenaRegExp.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener entre 8 y 15 caracteres (incluir al menos un número, una mayúscula y un caracter especial)'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    // if (errorNombre.textContent === '' && emailError.textContent === '' & contrasenaError.textContent === '') { //Verificamos que todos los errores estén vacíos
    /*Es lo mismo que lo anterior pero más sintetizado, si todos los errores son falsos, es decir, están vacíos,
    el negador ! los convertirá a true, entonces el operador lógico && en verdadero cuando todos son true, por lo
    tanto si hubiera un solo true o error no vacío, el negador lo hará false impidiendo la ejecución del condicional
    ya que en && solo se es verdadero si todos true, asimismo si todos los errores fueran true, el negador los convierte
    a false impiendo que se ejecute el if de igual modo*/
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        //BACKEND QUE RECIBA LA INFORMACIÓN
        // Si no hay errores, el código accede a Firestore a través de la instancia db
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: entradaEmail.value,
            password: contrasenaEntrada.value
        })
            //La operación .add() devuelve una promesa y cuando esta promesa se resuelve correctamente, el bloque .then() se ejecuta.
            //docRef es el objeto que representa la referencia al nuevo documento creado en Firestore. 
            //docRef.id es el identificador único (ID) del documento recién creado. 
            //Firestore genera automáticamente este ID cuando se crea el documento.    
            .then((docRef) => {
                alert('El formulario se ha enviado con éxito', docRef.id)
                document.getElementById('formulario').reset(); //reset viene por defecto en JS y limpia el formulario
            })
            .catch((error) => {
                alert(error)
            });
    }

})