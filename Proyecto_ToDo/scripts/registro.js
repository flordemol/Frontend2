let usuarios = ["Ana", "Pedro", "Jorge", "Alejandra"];

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

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let usuario = {
            nombre : document.querySelector('#firstName').value,
            apellido : document.querySelector('#lastName').value,
            contrasenia : document.querySelector('#password').value,
            repetirContrasenia : document.querySelector('#rePassword').value,
            email : document.querySelector('#email').value
        }

        const errores = validarInputs(usuario);
       
        if(errores == 0){
            sessionStorage.setItem('nombre', usuario.nombre);
            sessionStorage.setItem('email', usuario.email);

            formulario.reset();
            window.location.href = '/lista-tareas.html';
        }
    })

});

function validarInputs(usuario){
   
    errores = 0;
    patronContrasenia = /([A-Z]+)/;
    patronMail = /@yahoo/;

    // busca que el nombre no esté repetido
    errorNombre.innerHTML = "";
    usuarios.forEach(u => {
        if(u == usuario.nombre){
            errorNombre.innerHTML = mjesError["usuarioExistente"];
            errores++;
        }
    })

    if(usuario.nombre.length == 0){
        errorNombre.innerHTML = mjesError["vacio"];
        errores++;
    }

    errorApellido.innerHTML = "";
    if(usuario.apellido.length == 0){
        errorApellido.innerHTML = mjesError["vacio"];
        errores++;
    }

    errorPass.innerHTML = "";
    if(usuario.contrasenia.length < 8 ){
        errorPass.innerHTML = mjesError["caracteresPass"];
        errores++;
    } else if(!patronContrasenia.test(usuario.contrasenia)){
        errorPass.innerHTML = mjesError["mayusculaPass"];
        errores++;
    }
   
    errorRepetirPass.innerHTML = "";
    if(usuario.contrasenia != usuario.repetirContrasenia){
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