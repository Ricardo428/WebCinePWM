async function cargarDatosResumen() {
    const idBuscado = localStorage.getItem("peliSeleccionada");
    const horaBuscada = localStorage.getItem("horaSeleccionada");

    if (!idBuscado) {
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch("Json/datos.json");
        const datos = await response.json();
        const pelicula = datos.peliculas.find(p => p.id == idBuscado);

        if (pelicula) {
            document.querySelector(".ticket-poster").src = pelicula.imagen;
        } else {
            console.error("Película no encontrada en el JSON");
        }

    } catch(err) {
        console.error("Error al cargar la información", err);
    }
}
document.addEventListener("TemplatesCargados", cargarDatosResumen);