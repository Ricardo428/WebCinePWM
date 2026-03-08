

const imagenes = [
    "img/avatar_poster.jpg",
    "img/Torrente Presidente.jpg"
];
let index = 0;
let intervaloCarrusel;
export function iniciarCarrusel() {
    const imgElement = document.querySelector(".banner-img");

    if (!imgElement) return;

    window.avanzar = function() {
        index = (index + 1 + imagenes.length) % imagenes.length;
        actualizarImagen();
    };

    window.retroceder = function() {
        index = (index - 1 + imagenes.length) % imagenes.length;
        actualizarImagen();
    };

    function actualizarImagen() {
        if (imgElement) {
            imgElement.src = imagenes[index];
        }
    }

    actualizarImagen();
    clearInterval(intervaloCarrusel);
    intervaloCarrusel = setInterval(window.avanzar, 5000);
}
document.addEventListener("TemplatesCargados", iniciarCarrusel);