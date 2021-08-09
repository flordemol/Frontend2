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
