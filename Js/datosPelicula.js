document.addEventListener("DOMContentLoaded", init);

async function init(){
    await cargarInfoPelicula();
    xLuIncludeFile();

}

async function cargarInfoPelicula() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idBuscado = parametrosURL.get("id");


    if (!idBuscado) {
        window.location.href = "index.html";
        return;
    }

    await fetch("Json/datos.json")
        .then((res) => {
            return res.json()
        })
        .then(data => {
            const pelicula = data.peliculas.find(p => p.id == idBuscado);

            if (pelicula) {
                document.querySelector(".titulo-pelicula").textContent = pelicula.titulo;
                document.querySelector(".pelicula-poster img").src = pelicula.imagen;
                document.querySelector(".pelicula-sinopsis").textContent = pelicula.sinopsis;
                document.querySelector("#info-duracion").textContent = pelicula.duracion;
                document.querySelector("#info-reparto").textContent = pelicula.reparto;
                document.querySelector("#info-genero").textContent = pelicula.clasificacion;
                document.querySelector("#info-clasificacion").textContent = pelicula.genero;
                document.querySelector("#trailer").href = pelicula.trailer;
                const horarios = document.querySelector(".lista-horarios")

                if (pelicula.horarios && pelicula.horarios.length > 0) {
                    pelicula.horarios.forEach((hora) => {
                        horarios.innerHTML += `<li><a href="Sala.html" class="btn-hora">${hora}</a></li>`;
                    })
                }else{
                    horarios.innerHTML += `<li><strong>No hay sesiones disponibles</strong></li>`;
                }


            } else {
                console.error("No se encontró la película con ese ID");
            }
        })
        .catch(error => {
            console.log(error);
        })
}