let datosPersona = {
  nombre: "",
  edad: 0,
  ciudad: "",
  interesPorJs: "",
};

function obtenerDatosDelUsuario() {
  /* --------------- PUNTO 1: Escribe tu codigo a partir de aqui --------------- */
  const hoy = new Date;
    
  datosPersona.nombre = prompt("Ingresa tu nombre");

  let anioNacimiento = parseInt(prompt("Ingresa el año en que naciste"));
  while(isNaN(anioNacimiento)){
    anioNacimiento = parseInt(prompt("¡Debe ser un valor numérico!\nPor favor ingresa el año en que naciste:"));
  };
  datosPersona.edad = hoy.getFullYear() - anioNacimiento;

  datosPersona.ciudad = prompt("Ingresa la ciudad donde vives");
  datosPersona.interesPorJs = (confirm("Te interesa JavaScript")) ? "Si" : "No";
}


function renderizarDatosUsuario() {
  /* ------------------- NO TOCAR NI ELIMINAR ESTA FUNCION. ------------------- */
  obtenerDatosDelUsuario();
  /* --------------- PUNTO 2: Escribe tu codigo a partir de aqui --------------- */
  document.querySelector('#nombre').innerText = datosPersona.nombre;
  document.querySelector('#edad').innerText = datosPersona.edad;
  document.querySelector('#ciudad').innerText = datosPersona.ciudad;
  document.querySelector('#javascript').innerText = datosPersona.interesPorJs;
}


/* ------------------------- NO MODIFICAR ESTE ARRAY ------------------------ */
const listado = [
  {
    imgUrl: "https://huguidugui.files.wordpress.com/2015/03/html1.png",
    lenguajes: "HTML y CSS",
    bimestre: "1er bimestre",
  },
  {
    imgUrl: "https://image.flaticon.com/icons/png/512/919/919828.png",
    lenguajes: "Javascript",
    bimestre: "2do bimestre",
  },
  {
    imgUrl: "https://image.flaticon.com/icons/png/512/919/919851.png",
    lenguajes: "React JS",
    bimestre: "3er bimestre",
  },
];

function recorrerListadoYRenderizarTarjetas() {
  /* ------------------ PUNTO 3: Escribe tu codigo desde aqui ------------------ */
  const fila = document.querySelector('#fila');

  if((document.querySelectorAll('.caja').length) != (listado.length)) {
    
    listado.forEach((materia) => {
      fila.innerHTML += `
        <div class="caja">
          <img src="${materia.imgUrl}" alt="${materia.lenguajes}">
          <p class="lenguajes">${materia.lenguajes}</p>
          <p class="bimestre">${materia.bimestre}</p>
        </div>
      `
    })
  }

}


function mostrarYOcultarDescripcionCompleta() {
  /* --------------------- PUNTO 4: Escribe tu codigo aqui --------------------- */
  const txtSobreMi = document.querySelector('.sobre-mi');
  txtSobreMi.classList.toggle('sobre-mi-completo');
}