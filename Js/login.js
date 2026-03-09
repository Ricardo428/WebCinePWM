document.addEventListener('DOMContentLoaded', function() {
    // Buscamos el formulario en la página
    const formLogin = document.querySelector('form');

    if (formLogin) {
        formLogin.addEventListener('submit', async function(event) {
            event.preventDefault();

            const emailIngresado = document.getElementById('email').value;
            const passwordIngresado = document.getElementById('password').value;

            try {

                const respuesta = await fetch('Json/users.json');
                const usuariosBase = await respuesta.json();


                const usuariosNuevos = JSON.parse(localStorage.getItem('usuariosNuevos')) || [];

                const todosLosUsuarios = usuariosBase.concat(usuariosNuevos);

                const usuarioValido = todosLosUsuarios.find(
                    user => user.email === emailIngresado && user.password === passwordIngresado
                );

                if (usuarioValido) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('nombreUsuario', usuarioValido.nombre);
                    localStorage.setItem('emailUsuario', usuarioValido.email);

                    window.location.href = 'index.html';
                } else {
                    alert('Email o contraseña incorrectos. Por favor, revisa tus datos.');
                }

            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                alert('Hubo un problema al conectar con la base de datos de usuarios.');
            }
        });
    }
});