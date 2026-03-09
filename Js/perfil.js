document.addEventListener('DOMContentLoaded', function() {
    // 1. Protección de ruta: Si no hay sesión iniciada, expulsamos al usuario al login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return; // Detenemos la ejecución
    }

    // 2. Recuperamos los datos del usuario desde la memoria del navegador
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario Invitado';
    const emailUsuario = localStorage.getItem('emailUsuario') || 'Sin correo registrado';

    // 3. Buscamos los elementos en el HTML
    const nombreDisplay = document.getElementById('perfil-nombre-display');
    const emailDisplay = document.getElementById('perfil-email-display');

    // 4. Inyectamos los datos reales en la pantalla
    if (nombreDisplay) {
        nombreDisplay.textContent = nombreUsuario;
    }

    if (emailDisplay) {
        emailDisplay.textContent = emailUsuario;
    }
});