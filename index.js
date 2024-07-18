const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
    "P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h",
    "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", 
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ,"~","`","!","@","#","$","%","^","&","*","(",")","_",
    "-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"
];


// 0-25 A-Z
// 26-51 a-z
// 52-61 0-9
// 62-90 Especials
/*
console.log(characters.length)
for (let i = 0; i < characters.length; i++) {
    console.log("Numero " + i + ": " + characters[i])
}
*/

let button = document.getElementById("btGenerate");

button.addEventListener("click", generatePasswords);


// Obtiene un numero aleatorio incluyendo el valor maximo
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

// Genera una contraseña de la longitud que se indique
function stringCharactersRandom(numchar) {
    let str = "";

    for (let i = 0; i < numchar; i++) {
        // Fuerzo a que haya 1/4 de posibilidades entre
        // Lower, Upper, Number y Especial Characters

        // Numero aleatorio del 0 al 3
        let randomType = Math.floor(Math.random() * 4);
        let random;
        if (randomType === 0) {  // Para Upper
            random = getRandomIntInclusive(0, 25);
        } else if (randomType === 1) { // Para Lower
            random = getRandomIntInclusive(26, 51);
        } else if (randomType === 2) { // Para Números
            random = getRandomIntInclusive(52, 61);
        } else if (randomType === 3) { // Para Caracteres especiales (Ya se que el if sobra)
            random = getRandomIntInclusive(62, 90);
        } else {
            console.log("ERROR: Fallo en 'stringCharactersRandom' al elegir tipo de caracter")
        }
        str += characters[random];
    }
    return str;
}

// Valida que la contraseña tenga al menos 1 tipo de cada caracter
function validPassword(pass) {
    let valUpper = false;
    let valLower = false;
    let valNumber = false;
    let valEspcialChar = false;
    for (let i = 0; i < pass.length; i++) {

        // Validacion de letras Mayusculas
        if (!valUpper) {
           for (let j = 0; j < 26; j++) {
                if (pass[i] === characters[j]) {
                    valLower = true;
                    break;
                }
            } 
        }
        
        // Validacion de letras Minusculas
        if (!valLower) {
            for (let j = 26; j < 52; j++) {
                 if (pass[i] === characters[j]) {
                     valNumber = true;
                     break;
                 }
             } 
         }

        // Validacion de numeros
        if (!valNumber) {
            for (let j = 52; j < 62; j++) {
                 if (pass[i] === characters[j]) {
                     valUpper = true;
                     break;
                 }
             } 
         }

         // Validacion de caracteres especiales
        if (!valEspcialChar) {
            for (let j = 62; j < 91; j++) {
                 if (pass[i] === characters[j]) {
                     valEspcialChar = true;
                     break;
                 }
             } 
         }

         if (valUpper && valLower && valNumber && valEspcialChar) {
            return true;
         }
    }

    return false;
}

// Genera contraseñas hasta dar con una valida para los 2 huecos
function generatePasswords() {

    let num = document.getElementById("lenght_password").value;
    console.log(num);
    num = parseInt(num);
    let password1, password2;

    do {
        password1 = stringCharactersRandom(num);
    } while (validPassword(password1))
    
    do {
        password2 = stringCharactersRandom(num);
    } while (validPassword(password2))
    
    // Podria darles id pero es una cosa de un día de momento
    
    setClipboard1.style.pointerEvents = "all";
    setClipboard2.style.pointerEvents = "all";

    setClipboard1.textContent = password1;
    setClipboard2.textContent = password2;

}

let setClipboard1 = document.getElementsByClassName("lb-clip")[0];
    setClipboard1.addEventListener("click", () => {
        // Copy the text inside the text field
        navigator.clipboard.writeText(setClipboard1.textContent);
        
        // Alert the copied text
        alert("Copied the password 1: " + setClipboard1.textContent);
    });


let setClipboard2 = document.getElementsByClassName("lb-clip")[1];

setClipboard2.addEventListener("click", () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(setClipboard2.textContent);
    
    // Alert the copied text
    alert("Copied the password 2: " + setClipboard2.textContent);
});



