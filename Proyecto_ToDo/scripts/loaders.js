function mostrarSpinner() {
   
    const body = document.querySelector("body");
    const form = document.querySelector("form");
    
    // Crear spinner
    const spinnerContainer = document.createElement("div");
    spinnerContainer.setAttribute("id", "contenedor-carga");
    
    const spinner = document.createElement("div");
    spinner.setAttribute("id", "carga");
    
    // Ocultar el formulario
    form.classList.add("hidden");
    
    // Agregar el Spinner
    spinnerContainer.appendChild(spinner);
    body.appendChild(spinnerContainer);
    
    return;
}

function ocultarSpinner() {
    
    const body = document.querySelector("body");
    const form = document.querySelector("form");
    
    // Seleccionar el spinner
    const spinnerContainer = document.querySelector("#contenedor-carga");
    
    // Remover el spinner del HTML
    body.removeChild(spinnerContainer);
    
    // Quitar la clase que oculta el formulario
    form.classList.remove("hidden");
    return;
}             

function renderizarSkeletons(cantidad, contenedor) {
    // Seleccionamos el contenedor
    const contenedorTareas = document.querySelector(contenedor);
    
    // Creamos un array que tendrá un lenght igual a la cantidad de
    //skeletons que queremos renderizar
    const skeletons = Array.from({ length: cantidad });
    
    // Iteramos sobre el array accediendo a cada elemento
    skeletons.forEach(() => {
    // Guardamos el HTML de cada skeleton. Agregamos una clase con el selector del contenedor
    // Esto nos permitirá luego poder eliminar los skeletons de dicho contenedor
    const template = `
    <li class="skeleton-container ${contenedor.replace(".", "")}-child">
        <div class="skeleton-card">
        <p class="skeleton-text"></p>
        <p class="skeleton-text"></p>
        </div>
    </li>
    `;
    
    // Insertamos el HTML dentro del contenedor
    contenedorTareas.innerHTML += template;
    });
}

function removerSkeleton(contenedor) {
    // Seleccionamos el contenedor
    const contenedorTareas = document.querySelector(contenedor);
    
    // Seleccionamos todos los skeletons dentro de ese contenedor
    const skeletons = document.querySelectorAll(`${contenedor}-child`);
    
    // Iteramos sobre la lista de skeletons y removemos cada uno de ellos
    // de dicho contenedor
    skeletons.forEach((skeleton) => contenedorTareas.removeChild(skeleton));
}