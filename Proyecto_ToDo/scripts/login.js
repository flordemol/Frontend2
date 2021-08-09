const form = document.querySelector('#formLogin');
const errorPass = document.querySelector('.error-pass');
const errorEmail = document.querySelector('.error-email');

window.addEventListener("load", function () {
    if (sessionStorage.getItem("jwt") && sessionStorage.getItem("nombre")) {
        window.location.href = './lista-tareas.html';
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const usuario = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        }

        const errores = validarInputs(usuario);

        if(errores == 0){
            
            const baseUrl = "https://ctd-todo-api.herokuapp.com/v1";

            const settings = {
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(usuario)
            }

            console.log("Consultando...");
            mostrarSpinner();

            fetch(`${baseUrl}/users/login`, settings)
            .then(response => response.json())
            .then(data => {

                if(data.jwt){
                    sessionStorage.setItem('nombre', usuario.firstName);
                    sessionStorage.setItem('email', usuario.email);
                    sessionStorage.setItem("jwt", data.jwt);
                    window.location.href = './lista-tareas.html';
                    ocultarSpinner();
                } else {
                    alert(data);
                    ocultarSpinner();
                }

            });
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