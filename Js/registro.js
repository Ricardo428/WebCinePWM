document.addEventListener('DOMContentLoaded', function() {
    const formRegistro = document.querySelector('form');

    if (formRegistro) {
        formRegistro.addEventListener('submit', function(event) {
            event.preventDefault();

            // Capturamos los datos del formulario
            const nombre = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // 1. Recuperamos la lista de usuarios ya registrados (o creamos una vacía)
            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosNuevos')) || [];

            // 2. Verificamos que el correo no esté en uso
            const existeUsuario = usuariosRegistrados.find(user => user.email === email);

            if (existeUsuario) {
                alert('Este correo electrónico ya está registrado. Por favor, inicia sesión.');
                return; // Detenemos el proceso
            }

            // 3. Creamos el objeto del usuario
            const nuevoUsuario = {
                email: email,
                password: password,
                nombre: nombre
            };

            // 4. Lo guardamos en nuestra "base de datos" local
            usuariosRegistrados.push(nuevoUsuario);
            localStorage.setItem('usuariosNuevos', JSON.stringify(usuariosRegistrados));

            // 5. Autologueamos al usuario directamente para mejorar la experiencia
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('nombreUsuario', nombre);
            localStorage.setItem('emailUsuario', email);

            alert('¡Registro completado con éxito!');

            // Redirigimos al inicio
            window.location.href = 'index.html';
        });
    }
});