async function cargarPreferencias() {
    try {
        const emailBuscado = localStorage.getItem("emailUsuario");
        console.log("DEBUG: Buscando preferencias para:", emailBuscado);

        if (!emailBuscado) {
            console.warn("No hay nadie logueado en localStorage");
            return;
        }

        const respuesta = await fetch('Json/users.json');
        const usuariosJSON = await respuesta.json();
        const usuariosNuevos = JSON.parse(localStorage.getItem('usuariosNuevos')) || [];

        const todosLosUsuarios = [...usuariosJSON, ...usuariosNuevos];

        const usuario = todosLosUsuarios.find(u => u.email === emailBuscado);

        if (usuario) {
            console.log("DEBUG: Usuario encontrado con éxito:", usuario);

            const listaGeneros = document.getElementById("lista-generos");
            const listaActores = document.getElementById("lista-actores");

            if (!listaGeneros || !listaActores) {
                console.error("DEBUG: No se han encontrado los IDs lista-generos o lista-actores en el HTML");
                return;
            }

            listaGeneros.innerHTML = "";
            listaActores.innerHTML = "";

            if (usuario.generos && usuario.generos.length > 0) {
                usuario.generos.forEach(g => {
                    const li = document.createElement("li");
                    li.textContent = g;
                    li.className = "pildora-item";
                    listaGeneros.appendChild(li);
                });
            }

            if (usuario.actores && usuario.actores.length > 0) {
                usuario.actores.forEach(a => {
                    const li = document.createElement("li");
                    li.textContent = a;
                    li.className = "pildora-item";
                    listaActores.appendChild(li);
                });
            }
        } else {
            console.error("DEBUG: El email no coincide con ningún usuario del JSON o LocalStorage");
        }
    } catch (e) {
        console.error("Error crítico en cargarPreferencias:", e);
    }
}

document.addEventListener('DOMContentLoaded', cargarPreferencias);