function verificarSesionHeader() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const btnLogin = document.getElementById('btn-login');
    const btnLogout = document.getElementById('btn-logout');
    const navPerfil = document.getElementById('nav-perfil');

    // Verificamos si los botones ya están cargados en la pantalla
    if (btnLogin && btnLogout && navPerfil) {
        if (isLoggedIn === 'true') {
            // Usuario logueado: Ocultamos login, mostramos salir
            btnLogin.classList.add('oculto');
            btnLogout.classList.remove('oculto');

            // Cambiamos el destino del botón Perfil hacia la cuenta del usuario
            navPerfil.href = 'perfil.html';
        } else {
            // Usuario NO logueado: Mostramos login, ocultamos salir
            btnLogin.classList.remove('oculto');
            btnLogout.classList.add('oculto');

            // Cambiamos el destino del botón Perfil hacia el formulario
            navPerfil.href = 'login.html';
        }
        return true; // Retornamos true porque ya hizo su trabajogit
    }
    return false; // Aún no ha cargado el HTML
}

function cerrarSesion() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('emailUsuario');
    localStorage.removeItem('preferenciasUsuario');
    window.location.href = 'index.html';
}

// Temporizador para esperar a que xLuIncludeFile inyecte el header
let intentos = 0;
const intervaloHeader = setInterval(() => {
    if (verificarSesionHeader() || intentos > 20) {
        clearInterval(intervaloHeader); // Detenemos la búsqueda cuando lo logra
    }
    intentos++;
}, 50);