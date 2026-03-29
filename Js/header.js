function verificarSesionHeader() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const btnLogin = document.getElementById('btn-login');
    const btnLogout = document.getElementById('btn-logout');
    const navPerfil = document.getElementById('nav-perfil');


    if (btnLogin && btnLogout && navPerfil) {
        if (isLoggedIn === 'true') {

            btnLogin.classList.add('oculto');
            btnLogout.classList.remove('oculto');

            navPerfil.href = 'perfil.html';
        } else {

            btnLogin.classList.remove('oculto');
            btnLogout.classList.add('oculto');


            navPerfil.href = 'login.html';
        }
        return true;
    }
    return false;
}

function cerrarSesion() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('emailUsuario');
    localStorage.removeItem('preferenciasUsuario');
    window.location.href = 'index.html';
}


let intentos = 0;
const intervaloHeader = setInterval(() => {
    if (verificarSesionHeader() || intentos > 20) {
        clearInterval(intervaloHeader);
    }
    intentos++;
}, 50);