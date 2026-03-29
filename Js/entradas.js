
const inputs = document.querySelectorAll('.input-cantidad');
let totalAdulto = 0;
let totalNiños = 0;
let totalNormal = 0;

const celdaTotalAdulto = document.querySelector('#totalAdulto');
inputs[1].addEventListener('input', function(event) {
    totalAdulto = parseFloat(event.target.value) || 0;
    celdaTotalAdulto.textContent = (totalAdulto*6.5).toFixed(2) + " €";
})

const celdaTotalNiño = document.querySelector('#totalNiño');
inputs[2].addEventListener('input', function(event) {
    totalNiños = parseFloat(event.target.value) || 0;
    celdaTotalNiño.textContent = (totalNiños*5.0).toFixed(2) + " €";
})

const celdaTotalNormal = document.querySelector('#totalNormal');
inputs[0].addEventListener('input', function(event) {
    totalNormal = parseFloat(event.target.value) || 0;
    celdaTotalNormal.textContent = (totalNormal*8.0).toFixed(2) + " €";
})



document.querySelector('form').addEventListener('submit', function(event) {
    let dinero = (totalAdulto*6.5) +
        (totalNiños*5.0) +
        (totalNormal*8.0)

    sessionStorage.setItem("dinero",dinero.toFixed(2))
    sessionStorage.setItem("Adulto",totalAdulto)
    sessionStorage.setItem("Niños",totalNiños)
    sessionStorage.setItem("Normal",totalNormal)
    let totalEntradas = totalAdulto + totalNiños + totalNormal;

    if (totalEntradas === 0) {
        event.preventDefault();
        alert('Por favor, selecciona al menos una entrada para poder continuar.');
    }
});
