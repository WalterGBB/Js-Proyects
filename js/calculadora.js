/*Función agregar recibe un valor que añade al texto del input de id = pantalla, ya sean
número u operadoradores*/
function agregar(valor){
    /* En JavaScript, length es una propiedad, no un método. Por lo tanto, cuando quieres 
    obtener la longitud de una cadena, no necesitas usar paréntesis. Los paréntesis se 
    tilizan para llamar a funciones o métodos en JavaScript.
       Por ejemplo, cuando deseas llamar a un método que realiza una operación en una 
    cadena, como toUpperCase() o split(), debes usar paréntesis después del nombre del 
    método para llamarlo, porque son funciones. Pero cuando quieres acceder a una 
    propiedad, como length, simplemente la mencionas sin paréntesis.*/
        document.getElementById('pantalla').value += valor //suma el valor de la pantalla con los que vayamos agregando
}

function reset(){
    document.getElementById('pantalla').value = ''
}

function borrar(){
    /*Tomamos todos caracteres de la cadena escepto el último (desde la posición start 0 a 
    la posición end -1 (última), el start si se cuenta, el end ya no*/
    const borrado = document.getElementById('pantalla').value.slice(0, -1)
    document.getElementById('pantalla').value = borrado
}

function calcular(){
    const valorPantalla = document.getElementById('pantalla').value
    
    if(valorPantalla.includes('%')){
        porcentaje()
    }else if(valorPantalla.includes('√')){
        raiz()
    }else{
        //eval es un método de JS que evalua un string matemáticamente y lo ejectua como si fuera código JS
        const resultado = eval(valorPantalla)
        document.getElementById('pantalla').value = resultado
    }
}

function porcentaje(){
 /* .split('%') divide la cadena en substrings por cada '%' que encuentre
    .slice(0, -1) indica que se tomaran los valores(substrings) desde la primera posición
    -1 representa el último elemento (cuando son negativos se cuenta en sentido contrario)
    slice(start, end) -> start va incluido, end no va incluido
    indico 1 para end porque la cadena deberá dividirse solo en dos substrings, es decir
    solo obtendremos las posiciones 0 y 1*/
    const cadena = document.getElementById("pantalla").value.split('%')
 /* Aquí indicamos el valor numérico de porcentaje que desamos hallar*/
    const porcentajeNum = cadena.slice(0, 1)
 /* Aquí indicamos que tome el subtring de la posición 1, es decir luego de haber
    encontrado el primer '%' */  
    const num = document.getElementById("pantalla").value.split('%').slice(1)
 // resultado representa lo q se mostrará en pantalla al llamar a calcular()
    let resultado
    
    //Si no hay un num antes del símbolo de % o si existen símbolos repetidos
    if(cadena[0] == '' || contieneSimboloRepetido() == true){
        resultado = 'ERROR, please enter AC and restart'
    }else if(cadena[1] == ''){ //Si hubiese num de porcentaje pero no se indica la cantidad a calcular dicho porcentaje
        resultado = porcentajeNum/100
    }else {
        resultado = (porcentajeNum/100)*num //Si hubiesen porcentaje y cantidad
    }
    
    document.getElementById('pantalla').value = resultado
}

function raiz(){
    /*dividimos la cadena por cada ocurrencia del símbolo '√', dará como 
    resultado 2 substring, el de la posición 0 estará vacío y el de la posición 1 tendrá
    al número al que le sacaremos la raiz cuadrada*/
    const cadena = document.getElementById('pantalla').value.split('√')
    const num = cadena.slice(1)

    if (num == '' || cadena[0].length > 0 || contieneSimboloRepetido() == true) {
        document.getElementById('pantalla').value = 'ERROR, please enter AC and restart'
    } else {
        const resultado = Math.sqrt(parseFloat(num))
        document.getElementById('pantalla').value = resultado
    }
}

/*Función para verificar si el símbolo % o √ aparecen más de una sola vez en pantalla*/
function contieneSimboloRepetido() {
    const cadena = document.getElementById('pantalla').value
    let contador = 0
    let seRepiten = false

    for (let i = 0; i < cadena.length; i++) { //Iteramos el string por cada uno de sus caracteres
        if (cadena[i] == '%' || cadena[i] == '√') { //Si encontramos un % o un √, el contador aumenta en 1
            contador++;
            if(contador>1){ //De haber más de un símbolo en pantalla retorna true y se rompe el bucle
                seRepiten = true
                break
            }
        }
    }

    return seRepiten
}



// function contieneRepetidos() {
//     const cadena = document.getElementById('pantalla').value
//     const caracteres = new Set();
    
//     for (let i = 0; i < cadena.length; i++) {
//         let caracter = cadena[i];
//         if (caracteres.has(caracter)) {
//             return true; // Se encontró más de una ocurrencia del mismo carácter
//         } else {
//             caracteres.add(caracter);
//         }
//     }
//     return false; // No se encontraron repetidos
// }