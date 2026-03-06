document.addEventListener('DOMContentLoaded', function() {
    // Buscamos el formulario en la página
    const formLogin = document.querySelector('form');

    if (formLogin) {
        formLogin.addEventListener('submit', async function(event) {
            // Evitamos que la página se recargue al enviar
            event.preventDefault();

            // Obtenemos los valores introducidos
            const emailIngresado = document.getElementById('email').value;
            const passwordIngresado = document.getElementById('password').value;

            try {
                // 1. Obtenemos los usuarios base del archivo JSON
                const respuesta = await fetch('Json/users.json');
                const usuariosBase = await respuesta.json();

                // 2. Obtenemos los usuarios nuevos registrados localmente
                const usuariosNuevos = JSON.parse(localStorage.getItem('usuariosNuevos')) || [];

                // 3. Juntamos ambas listas para comprobar
                const todosLosUsuarios = usuariosBase.concat(usuariosNuevos);

                // 4. Buscamos si las credenciales coinciden
                const usuarioValido = todosLosUsuarios.find(
                    user => user.email === emailIngresado && user.password === passwordIngresado
                );

                if (usuarioValido) {
                    // Si es válido, guardamos la sesión y los datos útiles
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('nombreUsuario', usuarioValido.nombre);
                    localStorage.setItem('emailUsuario', usuarioValido.email);

                    // Redirigimos a la cartelera
                    window.location.href = 'index.html';
                } else {
                    // Si falla, avisamos al usuario
                    alert('Email o contraseña incorrectos. Por favor, revisa tus datos.');
                }

            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                alert('Hubo un problema al conectar con la base de datos de usuarios.');
            }
        });
    }
});