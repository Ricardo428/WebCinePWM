

const imagenes = [
    "img/avatar_poster.jpg",
    "img/Torrente Presidente.jpg"
]
let index = 0;
async function avanzar() {
    index = (index + 1 + imagenes.length) % imagenes.length;
    await carrusel();
}

async function retroceder() {
    index = (index - 1 + imagenes.length) % imagenes.length;
    await carrusel();
}

async function carrusel() {
    const imgElement = document.querySelector(".banner-img");
    if (imgElement) {
        imgElement.src = imagenes[index];
    }

}
setInterval(avanzar, 5000);

carrusel();

