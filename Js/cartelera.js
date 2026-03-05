async function cartelera() {
    fetch("Json/datos.json")
        .then((res) => {
            return res.json()
        })
        .then((datos) => {
            if ('content' in document.createElement('template')) {
                const contenedor = document.querySelector("#cartelera")

                datos.peliculas.forEach(pelicula => {
                    const tarjet = document
                        .getElementById("template-cartelera")
                        .content.cloneNode(true);

                    tarjet.querySelector("a").href = `InfoFilm.html?id=${pelicula.id}`;
                    tarjet.querySelector("img").src = pelicula.imagen;

                    contenedor.appendChild(tarjet);
                })
            } else {
                console.error("No se encontro la cartelera")
            }
        })
        .catch((error) => console.log(error))
}

document.addEventListener("DOMContentLoaded", cartelera);