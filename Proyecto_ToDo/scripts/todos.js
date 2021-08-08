let listadoTodos = [
{
    description: "Mi hermosa tarea",
    createdAt: "19/04/20",
    status: "not-done"
},
{
    description: "Mi hermosa tarea 2",
    createdAt: "19/04/20",
    status: "done"
},
{
    description: "Mi hermosa tarea 3",
    createdAt: "19/04/20",
    status: "done"
}
];


if(sessionStorage.getItem('jwt') !== null){
    window.addEventListener("load", function(){
        
        const username = document.querySelector('.user-info p');
        
        const baseUrl = "https://ctd-todo-api.herokuapp.com/v1";

        // PEDIR A LA API NOMBRE DEL USUARIO
        const settings = {
            method : "GET",
            headers : {
                "authorization" : sessionStorage.jwt
            }
        }

        fetch(`${baseUrl}/users/getMe`, settings)
        .then(response => response.json())
        .then(data => {
            username.innerHTML = data.firstName;
            sessionStorage.setItem('nombre', data.firstName);
        });
    
        const tareasPendientes = document.querySelector('.tareas-pendientes');
        const tareasTerminadas = document.querySelector('.tareas-terminadas');
        
        function renderizarTodos() {
                   
            listadoTodos.forEach(tarea => {
                
                let template = `
                <li class="tarea">
                <div class="not-done"></div>
                <div class="descripcion">
                <p class="nombre">${tarea.description}</p>
                <p class="timestamp">Creada: ${tarea.createdAt}</p>
                </div>
                </li>
                `
                
                if(tarea.status === "not-done"){
                    tareasPendientes.innerHTML += template;
                } else {
                    tareasTerminadas.innerHTML += template;
                }
                
            });
        }
        
        renderizarTodos()
        
        const chekPendientes = document.querySelectorAll(".tareas-pendientes .tarea .not-done");
        const chekTerminadas = document.querySelectorAll(".tareas-terminadas .tarea .not-done");
        console.log(chekPendientes);

        const btnOff = document.querySelector("#off");
        
        btnOff.addEventListener("click", function(){
            let confirmar = confirm("¿Seguro desea cerrar sesión?");
            if(confirmar){
                sessionStorage.clear();
                window.location.href = "./login.html"
            }
        })

    })} else {
        window.location.href = "./index.html";
    }