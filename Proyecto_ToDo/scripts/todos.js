if(sessionStorage.getItem('jwt') !== null){
    window.addEventListener("load", function(){
        
        const username = document.querySelector('.user-info p');
        const tareasPendientes = document.querySelector('.tareas-pendientes');
        const tareasTerminadas = document.querySelector('.tareas-terminadas');
        const baseUrl = "https://ctd-todo-api.herokuapp.com/v1";

        // PEDIR A LA API NOMBRE DEL USUARIO
        const settingsDataUser = {
            method : "GET",
            headers : {
                "authorization" : sessionStorage.jwt
            }
        }

        fetch(`${baseUrl}/users/getMe`, settingsDataUser)
        .then(response => response.json())
        .then(data => {
            username.innerHTML = data.firstName;
            sessionStorage.setItem('nombre', data.firstName);
        });
    
        
        //configurando la petición de tareas
        const settingsTasks = {
            method: 'GET',
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
        }

        solicitarTareasAPI();

        function solicitarTareasAPI() {
            //solicitando todas las tareas del usuario
            fetch(`${baseUrl}/tasks`, settingsTasks)
                .then(function (response) {
                    return response.json()
                })
                .then(function (tasks) {
                    renderizarTodos(tasks);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

        function renderizarTodos(tasks) {
            //primero limpio los contenedores
            tareasPendientes.innerHTML="";
            tareasTerminadas.innerHTML="";

            if(tasks){
                tasks.forEach(tarea => {
                    
                    let template = `
                    <li class="tarea" id=task-${tarea.id}>
                    <div class="not-done"></div>
                    <div class="descripcion">
                    <p class="nombre">${tarea.description}</p>
                    <p class="timestamp">Creada: ${tarea.createdAt}</p>
                    </div>
                    </li>
                    `
                    
                    if(tarea.completed){
                        tareasTerminadas.innerHTML += template;
                    } else {
                        tareasPendientes.innerHTML += template;
                    }
                });
            }
        }
        
        // Crear nueva tarea
        const btnNuevaTarea = document.querySelector(".nueva-tarea button");
        btnNuevaTarea.addEventListener("click", function(e){
            e.preventDefault();
            
            const settingsNewTask = {
                method : "POST",
                headers : {
                    "Authorization" : sessionStorage.jwt,
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    "description": document.querySelector(".nueva-tarea input").value,
                    "completed": false
                })
            }

            fetch(`${baseUrl}/tasks`, settingsNewTask)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data);
                solicitarTareasAPI();
            })
            .catch(function (error) {
                console.log(error)
            })
        })

        //const chekPendientes = document.querySelectorAll(".tareas-pendientes .tarea .not-done");
        //const chekTerminadas = document.querySelectorAll(".tareas-terminadas .tarea .not-done");

        // Cerrar sesión
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