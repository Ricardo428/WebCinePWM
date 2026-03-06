window.addEventListener('load', () => {

    const iniciarBuscador = () => {
        const peliculas = [
            { nombre: "Torrente", id: 1 },
            { nombre: "Torrente 2", id: 2 },
            { nombre: "Torrente 3", id: 3 },
            { nombre: "Torrente 4", id: 4 },
            { nombre: "Torrente 5", id: 5 },
            { nombre: "Torrente Presidente", id: 6 }
        ];

        const input = document.getElementById("buscador");
        const lista = document.getElementById("lista-resultados");

        if (input && lista) {
            console.log("✅ Buscador conectado con datos.json");

            input.addEventListener('keyup', () => {
                const texto = input.value.toLowerCase();
                lista.innerHTML = '';

                if (texto.length > 0) {
                    // Filtramos por nombre
                    const filtradas = peliculas.filter(p =>
                        p.nombre.toLowerCase().includes(texto)
                    );

                    filtradas.forEach(p => {
                        const li = document.createElement('li');
                        li.textContent = p.nombre;

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

            clearInterval(reintentoBuscador);
        }
    };

    const reintentoBuscador = setInterval(iniciarBuscador, 100);
});