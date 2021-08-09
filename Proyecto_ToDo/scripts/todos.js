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
            mostrarSpinner();

            //solicitando todas las tareas del usuario
            fetch(`${baseUrl}/tasks`, settingsTasks)
                .then(function (response) {
                    return response.json()
                })
                .then(function (tasks) {
                    ocultarSpinner();
                    renderizarTodos(tasks);
                    cambiarEstado();
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
                    <div class="not-done ${tarea.completed ? "terminada" : "pendiente"}" data-completed=${tarea.id}></div>
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
                document.querySelector(".nueva-tarea input").value = "";
            })
            .catch(function (error) {
                console.log(error)
            })
        })

        // Cambio de estado
        function cambiarEstado(){
            const chekTasks = document.querySelectorAll(".tarea .not-done");
            
            chekTasks.forEach(item => {
                item.addEventListener("click", (e) => {
                    const id = e.target.dataset.completed;
                    const completada = e.target.classList.contains("terminada");

                    const settings = {
                        method : "PUT",
                        headers : {
                            "Authorization" : sessionStorage.jwt,
                            "content-type" : "application/json",
                            id
                        },
                        body : JSON.stringify({
                            "completed": `${!completada}`
                        })
                    }

                    fetch(`${baseUrl}/tasks/${id}`, settings)
                    .then(response => {
                        console.log(response.status);
                        solicitarTareasAPI();
                    })

                })
            })
        }
        
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