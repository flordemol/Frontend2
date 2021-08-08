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
        
        if(sessionStorage.getItem('nombre') !== null){
            username.innerHTML = sessionStorage.getItem('nombre');
        }        
    
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
    })} else {
        window.location.href = "./index.html";
    }