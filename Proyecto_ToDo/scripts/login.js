const form = document.querySelector('#formLogin');
const errorPass = document.querySelector('.error-pass');
const errorEmail = document.querySelector('.error-email');

window.addEventListener("load", function () {

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const usuario = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        }

        const errores = validarInputs(usuario);

        if(errores == 0){
            sessionStorage.setItem('email', usuario.email);
            window.location.href = '/lista-tareas.html';
        }
    })
})

function validarInputs(usuario){
   
    errores = 0;

    errorEmail.innerHTML = "";
    if(usuario.email.length == 0){
        errorEmail.innerHTML = "El campo no puede estar vacío";
        errores++;
    }

    errorPass.innerHTML = "";
    if(usuario.password.length == 0){
        errorPass.innerHTML = "El campo no puede estar vacío";
        errores++;
    }

    return errores;
}