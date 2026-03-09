document.addEventListener('DOMContentLoaded', function() {
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
                    localStorage.setItem('emailUsuario', usuarioValido.email); // Esta es la que usaremos

                    alert('¡Bienvenido/a ' + usuarioValido.nombre + '!');
                    window.location.href = 'index.html'; // O a tu página principal
                } else {
                    alert('Email o contraseña incorrectos.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});