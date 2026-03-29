export const iniciarBuscador = async () => {

    const input = document.getElementById("buscador");
    const lista = document.getElementById("lista-resultados");

    if (!input || !lista) return;

    try {
        const response = await fetch("Json/datos.json");
        if (!response.ok) throw new Error("Error al cargar la base de datos de películas");

        const datos = await response.json();

        input.addEventListener('keyup', () => {
            // Añadimos .trim() para evitar que espacios en blanco rompan la búsqueda
            const texto = input.value.trim().toLowerCase();
            lista.innerHTML = '';

            if (texto.length > 0) {

                const filtradas = datos.peliculas.filter(p =>
                    p.titulo.toLowerCase().includes(texto)
                );

                filtradas.forEach(p => {
                    const li = document.createElement('li');
                    li.textContent = p.titulo;

                    li.classList.add("item-resultado");

                    li.onclick = () => {
                        window.location.href = `InfoFilm.html?id=${p.id}`;
                    };

                    lista.appendChild(li);
                });
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const primeraOpcion = lista.querySelector('li');
                if (primeraOpcion) primeraOpcion.click();
            }
        });

    } catch (error) {
        console.error("Fallo al iniciar el buscador:", error);
    }
};