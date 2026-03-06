async function cartelera() {
    try {
        const reponse = await fetch("Json/datos.json");
        const datos = await reponse.json();

        if ('content' in document.createElement('template')) {
            const contenedor = document.querySelector("#cartelera")

            datos.peliculas.forEach(pelicula => {
                const tarjet = document
                    .getElementById("template-cartelera")
                    .content.cloneNode(true);

                tarjet.querySelector("a").href = `InfoFilm.html?id=${pelicula.id}`;
                tarjet.querySelector("img").src = pelicula.imagen;

                contenedor.appendChild(tarjet);
            });
        } else {
            console.error("No se encontro la cartelera")
        }

    } catch (Error) {
        console.error("Error in cartelera");
    }
}


document.addEventListener("DOMContentLoaded", cartelera);