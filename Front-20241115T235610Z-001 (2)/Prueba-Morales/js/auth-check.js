// Verificar si el usuario está autenticado
function verificarAutenticacion() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const currentPage = window.location.pathname;
    const authPage = currentPage.includes('auth.html');

    if (!isLoggedIn && !authPage) {
        // Si no está autenticado y no está en la página de auth, redirigir a auth.html
        window.location.href = 'auth.html';
    } else if (isLoggedIn && authPage) {
        // Si está autenticado y está en la página de auth, redirigir a index.html
        window.location.href = 'index.html';
    }
}

// Ejecutar la verificación cuando se carga la página
document.addEventListener('DOMContentLoaded', verificarAutenticacion); 