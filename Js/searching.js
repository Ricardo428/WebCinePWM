export const iniciarBuscador = async () => {
    // 1. Buscamos los elementos del DOM primero
    const input = document.getElementById("buscador");
    const lista = document.getElementById("lista-resultados");

    // 2. Si no existen (estamos en una página sin header), salimos silenciosamente
    if (!input || !lista) return;

    try {
        // 3. Hacemos la petición al JSON
        const response = await fetch("Json/datos.json");
        if (!response.ok) throw new Error("Error al cargar la base de datos de películas");

        const datos = await response.json();

        // 4. Lógica del evento keyup (cuando el usuario escribe)
        input.addEventListener('keyup', () => {
            // Añadimos .trim() para evitar que espacios en blanco rompan la búsqueda
            const texto = input.value.trim().toLowerCase();
            lista.innerHTML = '';

            if (texto.length > 0) {
                // Filtramos por título
                const filtradas = datos.peliculas.filter(p =>
                    p.titulo.toLowerCase().includes(texto)
                );

                // Creamos los elementos de la lista
                filtradas.forEach(p => {
                    const li = document.createElement('li');
                    li.textContent = p.titulo;

                    // Opcional: añadir una clase por si quieres darle estilos CSS luego
                    li.classList.add("item-resultado");

                    li.onclick = () => {
                        window.location.href = `InfoFilm.html?id=${p.id}`;
                    };

                    lista.appendChild(li);
                });
            }
        });

        // 5. Lógica del evento keydown (para la tecla Enter)
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