const formulario = document.querySelector('form');
const errorNombre = document.querySelector('.error-nombre');
const errorApellido = document.querySelector('.error-apellido');
const errorPass = document.querySelector('.error-pass');
const errorRepetirPass = document.querySelector('.error-pass2');
const errorEmail = document.querySelector('.error-email');

const mjesError = {
    vacio : "El campo no puede estar vacío",
    usuarioExistente : "El usuario ya existe",
    caracteresPass : "La contraseña debe tener al menos 8 caracteres",
    mayusculaPass : "La contraseña debe tener al menos 1 mayúscula",
    noCoincidenPass : "Las contraseñas no coinciden",
    mailYahoo : "No se aceptan email de Yahoo"
}

window.addEventListener("load", function(){
    if (sessionStorage.getItem("jwt") && sessionStorage.getItem("nombre")) {
        window.location.href = './lista-tareas.html';
    }

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let usuario = {
            firstName : document.querySelector('#firstName').value,
            lastName : document.querySelector('#lastName').value,
            password : document.querySelector('#password').value,
            rePassword : document.querySelector('#rePassword').value,
            email : document.querySelector('#email').value
        }

        const errores = validarInputs(usuario);
       
        if(errores == 0){

            const baseUrl = "https://ctd-todo-api.herokuapp.com/v1";

            const settings = {
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                        "firstName": usuario.firstName,
                        "lastName": usuario.lastName,
                        "email": usuario.email,
                        "password": usuario.password
                })
            }

            console.log("Consultando...");
            mostrarSpinner();

            fetch(`${baseUrl}/users`, settings)
            .then(response => response.json())
            .then(data => {
                
                console.log(data)

                if(data.jwt){
                    sessionStorage.setItem('nombre', usuario.firstName);
                    sessionStorage.setItem('email', usuario.email);
                    sessionStorage.setItem("jwt", data.jwt);
                } else {
                    alert(data);
                }

                ocultarSpinner();
                formulario.reset();
                window.location.href = './lista-tareas.html';
            });
        }
    })

});

function validarInputs(usuario){
   
    errores = 0;
    patronContrasenia = /([A-Z]+)/;
    patronMail = /@yahoo/;

    if(usuario.firstName.length == 0){
        errorNombre.innerHTML = mjesError["vacio"];
        errores++;
    }

    errorApellido.innerHTML = "";
    if(usuario.lastName.length == 0){
        errorApellido.innerHTML = mjesError["vacio"];
        errores++;
    }

    errorPass.innerHTML = "";
    if(usuario.password.length < 8 ){
        errorPass.innerHTML = mjesError["caracteresPass"];
        errores++;
    } else if(!patronContrasenia.test(usuario.password)){
        errorPass.innerHTML = mjesError["mayusculaPass"];
        errores++;
    }
   
    errorRepetirPass.innerHTML = "";
    if(usuario.password != usuario.rePassword){
        errorRepetirPass.innerHTML = mjesError["noCoincidenPass"];
        errores++;
    }

    errorEmail.innerHTML = "";
    if(usuario.email.length == 0){
        errorEmail.innerHTML = mjesError["vacio"];
        errores++;
    }

    if(patronMail.test(usuario.email)){
        errorEmail.innerHTML = mjesError["mailYahoo"];
        errores++;
    }

    return errores;
}