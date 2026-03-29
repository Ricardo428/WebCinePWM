document.addEventListener('DOMContentLoaded', function() {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario Invitado';
    const emailUsuario = localStorage.getItem('emailUsuario') || 'Sin correo registrado';

    const nombreDisplay = document.getElementById('perfil-nombre-display');
    const emailDisplay = document.getElementById('perfil-email-display');

    if (nombreDisplay) {
        nombreDisplay.textContent = nombreUsuario;
    }

    if (emailDisplay) {
        emailDisplay.textContent = emailUsuario;
    }
});