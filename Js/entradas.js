document.querySelector('form').addEventListener('submit', function(event) {
    // Seleccionamos todos los inputs de cantidad
    const inputs = document.querySelectorAll('.input-cantidad');
    let totalEntradas = 0;

    // Sumamos los valores de todos los inputs
    inputs.forEach(function(input) {
        totalEntradas += parseInt(input.value) || 0;
    });

    // Si el total es 0, detenemos el envío y avisamos al usuario
    if (totalEntradas === 0) {
        event.preventDefault(); // Esta línea es la que bloquea el salto de página
        alert('Por favor, selecciona al menos una entrada para poder continuar.');
    }
});

const inputs = document.querySelectorAll('.input-cantidad');
const celdaTotalAdulto = document.querySelector('#totalAdulto');

inputs[1].addEventListener('input', function(event) {
    const total = parseFloat(event.target.value) || 0;
    celdaTotalAdulto.textContent = (total*6.5).toFixed(2) + " €";
})

const celdaTotalNiño = document.querySelector('#totalNiño');
inputs[2].addEventListener('input', function(event) {
    const totalNiño = parseFloat(event.target.value) || 0;
    celdaTotalNiño.textContent = (totalNiño*5.0).toFixed(2) + " €";
})

const celdaTotalNormal = document.querySelector('#totalNormal');
inputs[0].addEventListener('input', function(event) {
    const totalNormal = parseFloat(event.target.value) || 0;
    celdaTotalNormal.textContent = (totalNormal*8.0).toFixed(2) + " €";
})