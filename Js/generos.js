document.addEventListener("DOMContentLoaded", () => {
    const contenedorFiltros = document.querySelector(".contenedor-generos");
    const btnFiltros = document.querySelector(".btn-negro-amarillo-filtros");
    const generos = ["Comedia", "Drama", "Accion"];

    // 1. Crear la lista (pero mantenerla oculta al principio)
    const listaUL = document.createElement("ul");
    listaUL.id = "lista-generos";
    listaUL.style.display = "none"; // Oculta por defecto

    // 2. Llenar la lista con los géneros
    generos.forEach(genero => {
        const li = document.createElement("li");
        li.textContent = genero;

        // Al hacer clic en un género, filtramos la cartelera
        li.addEventListener("click", () => {
            console.log("Filtrando por:", genero);
            filtrarPorGenero(genero);
            listaUL.style.display = "none"; // Cerramos el menú al elegir
        });

        listaUL.appendChild(li);
    });

    // 3. Añadir la lista al contenedor del HTML
    contenedorFiltros.appendChild(listaUL);

    // 4. Evento para mostrar/ocultar al pulsar el botón "Filtros"
    btnFiltros.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que se cierre inmediatamente
        const estaVisible = listaUL.style.display === "block";
        listaUL.style.display = estaVisible ? "none" : "block";
    });

    // 5. Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", () => {
        listaUL.style.display = "none";
    });
});

async function filtrarPorGenero(generoElegido) {
    try {
        const response = await fetch("Json/datos.json");
        const datos = await response.json();
        const contenedor = document.querySelector("#cartelera");
        const template = document.getElementById("template-cartelera");

        contenedor.innerHTML = ''; // Limpiar

        datos.peliculas.forEach(pelicula => {
            // Comparamos el género del JSON con el elegido
            if (pelicula.genero === generoElegido) {
                const tarjet = template.content.cloneNode(true);
                tarjet.querySelector("a").href = `InfoFilm.html?id=${pelicula.id}`;
                tarjet.querySelector("img").src = pelicula.imagen;
                contenedor.appendChild(tarjet);
            }
        });
    } catch (error) {
        console.error("Error filtrando géneros:", error);
    }
}