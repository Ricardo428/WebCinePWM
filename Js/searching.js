window.addEventListener('load', () => {

    const iniciarBuscador = async () => {

        const reponse = await fetch("Json/datos.json");
        const datos = await reponse.json();

        const input = document.getElementById("buscador");
        const lista = document.getElementById("lista-resultados");

        if (input && lista) {

            input.addEventListener('keyup', () => {
                const texto = input.value.toLowerCase();
                lista.innerHTML = '';

                if (texto.length > 0) {
                    // Filtramos por nombre
                    const filtradas = datos.peliculas.filter(p =>
                        p.titulo.toLowerCase().includes(texto)
                    );

                    filtradas.forEach(p => {
                        const li = document.createElement('li');
                        li.textContent = p.titulo;

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