document.addEventListener('DOMContentLoaded', function() {
    const formRegistro = document.querySelector('form');

    if (formRegistro) {
        formRegistro.addEventListener('submit', function(event) {
            event.preventDefault();

            // Usamos .trim() para limpiar espacios accidentales
            const nombre = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // 1. Obtener la lista actual
            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosNuevos')) || [];

            // 2. Comprobar si existe (insensible a mayúsculas/minúsculas para mayor seguridad)
            const existeUsuario = usuariosRegistrados.find(user => user.email.toLowerCase() === email.toLowerCase());

            if (existeUsuario) {
                alert('Este correo electrónico ya está registrado. Por favor, inicia sesión.');
                return;
            }

            // 3. Crear el nuevo objeto
            const nuevoUsuario = {
                email: email,
                password: password,
                nombre: nombre
            };

            // 4. Guardar
            usuariosRegistrados.push(nuevoUsuario);
            localStorage.setItem('usuariosNuevos', JSON.stringify(usuariosRegistrados));

            // 5. Datos de sesión (CORREGIDO: usamos 'email', no 'emailUsuario')
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('nombreUsuario', nombre);
            localStorage.setItem('emailUsuario', email);
            localStorage.setItem('usuarioLogueado', email); // Para que showPreferences lo encuentre

            alert('¡Registro completado con éxito!');

            window.location.href = "eleccion_preferencias.html";
        });
    }
});