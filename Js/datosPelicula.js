document.addEventListener("DOMContentLoaded", init);

async function init(){
    await cargarInfoPelicula();
    xLuIncludeFile();

}

async function cargarInfoPelicula() {

    const parametrosURL = new URLSearchParams(window.location.search);
    let idBuscado = parametrosURL.get("id");

    if (!idBuscado) {
        idBuscado = localStorage.getItem("peliSeleccionada");
    }

    if (!idBuscado) {
        window.location.href = "index.html";
        return;
    }

    try {
        const reponse = await fetch("Json/datos.json");
        const datos = await reponse.json();
        const pelicula = datos.peliculas.find(p => p.id == idBuscado);

        if (pelicula) {
            document.querySelector(".titulo-pelicula").textContent = pelicula.titulo;
            document.querySelector(".imagenes").src = pelicula.imagen;
            document.querySelector(".pelicula-sinopsis").textContent = pelicula.sinopsis;
            document.querySelector("#info-duracion").textContent = pelicula.duracion;
            document.querySelector("#info-reparto").textContent = pelicula.reparto;
            document.querySelector("#info-genero").textContent = pelicula.clasificacion;
            document.querySelector("#info-clasificacion").textContent = pelicula.genero;
            document.querySelector("#trailer").href = pelicula.trailer;
            const horarios = document.querySelector(".lista-horarios")
            if (pelicula.horarios && pelicula.horarios.length > 0) {
                pelicula.horarios.forEach(hora => {
                    horarios.innerHTML += `<li><a href="Sala.html" onclick="guardarEnMochila(${pelicula.id}, '${hora}')" class="btn-hora">${hora}</a></li>`;
                });
            } else {
                horarios.innerHTML = `<li>No hay sesiones disponibles</li>`;
            }


        } else {
            console.error("No se encontró la película con ese ID");
        }

    }catch(err) {
        console.error("Error al cargar la información");
    }

}

function guardarEnMochila(id, hora) {
    localStorage.setItem("peliSeleccionada", id);
    localStorage.setItem("horaSeleccionada", hora);
}