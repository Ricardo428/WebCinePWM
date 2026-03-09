async function cargarCartelera(soloEstrenos = false) {
    try {
        const response = await fetch("Json/datos.json");
        const datos = await response.json();
        const contenedor = document.querySelector("#cartelera");
        const template = document.getElementById("template-cartelera");

        if (!contenedor || !template) return;

        contenedor.innerHTML = '';
        const hoy = new Date();

        datos.peliculas.forEach(pelicula => {

            const fechaEstreno = new Date(pelicula.fecha.split('-').reverse().join('-'));
            const diferenciaMS = hoy - fechaEstreno;
            const diferenciaDias = diferenciaMS / (1000 * 60 * 60 * 24);

            let debeMostrar = !soloEstrenos || (Math.abs(diferenciaDias) <= 30);

            if (debeMostrar) {
                const tarjet = template.content.cloneNode(true);
                const enlace = tarjet.querySelector("a");
                const imagen = tarjet.querySelector("img");

                enlace.href = `InfoFilm.html?id=${pelicula.id}`;
                imagen.src = pelicula.imagen;
                imagen.alt = pelicula.titulo;

                if (Math.abs(diferenciaDias) <= 30) {
                    const badge = document.createElement("div");
                    badge.textContent = "ESTRENO";
                    badge.style.cssText = "position:absolute; background:red; color:white; padding:4px 8px; font-size:10px; top:5px; left:5px; border-radius:3px; font-weight:bold; z-index:10;";
                    enlace.style.position = "relative";
                    enlace.appendChild(badge);
                }
                contenedor.appendChild(tarjet);
            }
        });
    } catch (error) {
        console.error("Error en cargarCartelera:", error);
    }
}

async function filtrarPorGenero(generoElegido) {
    try {
        const response = await fetch("Json/datos.json");
        const datos = await response.json();
        const contenedor = document.querySelector("#cartelera");
        const template = document.getElementById("template-cartelera");

        if (!contenedor || !template) return;

        contenedor.innerHTML = '';
        const hoy = new Date();

        datos.peliculas.forEach(pelicula => {

            if (pelicula.genero.toLowerCase() === generoElegido.toLowerCase()) {
                const tarjet = template.content.cloneNode(true);
                const enlace = tarjet.querySelector("a");

                enlace.href = `InfoFilm.html?id=${pelicula.id}`;
                tarjet.querySelector("img").src = pelicula.imagen;

                const fechaEstreno = new Date(pelicula.fecha.split('-').reverse().join('-'));
                const diferenciaDias = Math.abs((hoy - fechaEstreno) / (1000 * 60 * 60 * 24));

                if (diferenciaDias <= 30) {
                    const badge = document.createElement("div");
                    badge.textContent = "ESTRENO";
                    badge.style.cssText = "position:absolute; background:red; color:white; padding:4px 8px; font-size:10px; top:5px; left:5px; border-radius:3px; font-weight:bold; z-index:10;";
                    enlace.style.position = "relative";
                    enlace.appendChild(badge);
                }

                contenedor.appendChild(tarjet);
            }
        });

        if (contenedor.innerHTML === '') {
            contenedor.innerHTML = `<p style="color:white; text-align:center; width:100%; margin-top:20px;">No hay películas de género ${generoElegido}.</p>`;
        }
    } catch (error) {
        console.error("Error en filtrarPorGenero:", error);
    }
}

/**
 * 3. CONFIGURACIÓN DE EVENTOS (DOM CONTENT LOADED)
 */
document.addEventListener("DOMContentLoaded", () => {

    const btnCartelera = document.getElementById("btn-cartelera");
    const btnProximamente = document.getElementById("btn-proximamente");
    const contenedorFiltros = document.querySelector(".contenedor-generos");
    const btnFiltros = document.querySelector(".btn-negro-amarillo-filtros");

    if (btnCartelera) btnCartelera.addEventListener("click", () => cargarCartelera(false));
    if (btnProximamente) btnProximamente.addEventListener("click", () => cargarCartelera(true));

    const generos = ["Comedia", "Drama", "Accion"];
    const listaUL = document.createElement("ul");
    listaUL.id = "lista-generos";
    listaUL.style.display = "none"; // Oculto inicialmente

    generos.forEach(genero => {
        const li = document.createElement("li");
        li.textContent = genero;
        li.addEventListener("click", () => {
            filtrarPorGenero(genero);
            listaUL.style.display = "none";
        });
        listaUL.appendChild(li);
    });

    if (contenedorFiltros) {
        contenedorFiltros.appendChild(listaUL);
    }

    if (btnFiltros) {
        btnFiltros.addEventListener("click", (e) => {
            e.stopPropagation();
            const visible = listaUL.style.display === "block";
            listaUL.style.display = visible ? "none" : "block";
        });
    }

    document.addEventListener("click", () => {
        listaUL.style.display = "none";
    });

    cargarCartelera(false);
});

document.addEventListener("TemplatesCargados", () => cargarCartelera(false));