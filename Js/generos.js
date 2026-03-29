document.addEventListener("DOMContentLoaded", () => {
    const contenedorFiltros = document.querySelector(".contenedor-generos");
    const btnFiltros = document.querySelector(".btn-negro-amarillo-filtros");
    const generos = ["Comedia", "Drama", "Accion"];

    const listaUL = document.createElement("ul");
    listaUL.id = "lista-generos";
    listaUL.style.display = "none"; // Oculta por defecto

    generos.forEach(genero => {
        const li = document.createElement("li");
        li.textContent = genero;

        li.addEventListener("click", () => {
            console.log("Filtrando por:", genero);
            filtrarPorGenero(genero);
            listaUL.style.display = "none"; // Cerramos el menú al elegir
        });

        listaUL.appendChild(li);
    });

    contenedorFiltros.appendChild(listaUL);

    btnFiltros.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que se cierre inmediatamente
        const estaVisible = listaUL.style.display === "block";
        listaUL.style.display = estaVisible ? "none" : "block";
    });

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

        contenedor.innerHTML = '';

        datos.peliculas.forEach(pelicula => {
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