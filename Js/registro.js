document.addEventListener('DOMContentLoaded', function() {
    const formRegistro = document.querySelector('form');

    if (formRegistro) {
        formRegistro.addEventListener('submit', function(event) {
            event.preventDefault();

            const nombre = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosNuevos')) || [];

            const existeUsuario = usuariosRegistrados.find(user => user.email === email);

            if (existeUsuario) {
                alert('Este correo electrónico ya está registrado. Por favor, inicia sesión.');
                return; // Detenemos el proceso
            }

            const nuevoUsuario = {
                email: email,
                password: password,
                nombre: nombre
            };

            usuariosRegistrados.push(nuevoUsuario);
            localStorage.setItem('usuariosNuevos', JSON.stringify(usuariosRegistrados));

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('nombreUsuario', nombre);
            localStorage.setItem('emailUsuario', emailUsuario);

            alert('¡Registro completado con éxito!');

            window.location.href = "eleccion_preferencias.html";
        });
    }
});