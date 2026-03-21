
async function cargarDatosResumen(imagen,nombre,fecha,hora) {
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
            document.querySelector(imagen).src = pelicula.imagen;
            document.querySelector(hora).textContent = `Hora: ${horaBuscada}`;
            document.querySelector(nombre).textContent = `${pelicula.titulo}`;
            document.querySelector(fecha).textContent = `Dia: ${new Date().toLocaleDateString()}`;

        } else {
            console.error("Película no encontrada en el JSON");
        }

    } catch(err) {
        console.error("Error al cargar la información", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const cantAdulto = parseFloat(sessionStorage.getItem('Adulto')) || 0;
    const cantNiño = parseFloat(sessionStorage.getItem('Niños')) || 0;
    const cantNormal = parseFloat(sessionStorage.getItem('Normal')) || 0;
    const total = sessionStorage.getItem('dinero') || "0.00";

    const tiposEntradas = [
        { nombre: 'Normal', cantidad: cantNormal, precio: 8.0 },
        { nombre: 'Adulto', cantidad: cantAdulto, precio: 6.5 },
        { nombre: 'Niño',   cantidad: cantNiño,   precio: 5.0 }
    ];

    const entradas = tiposEntradas.filter(entradas => entradas.cantidad > 0)

    entradas.forEach(entrada => {
        const subtotal = (entrada.cantidad * entrada.precio).toFixed(2);

        document.querySelector(".contenedor-filas").innerHTML += `
            <tr>
                <td>${entrada.nombre}</td>
                <td>${entrada.cantidad}</td>
                <td>${entrada.precio.toFixed(2)} €</td>
                <td><strong>${subtotal} €</strong></td>
            </tr>
        `;
    })
    document.querySelector("#total").textContent = `${total} € `;

})