// Verificar estado de la sesión al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
});

function verificarSesion() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}

function cerrarSesion() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    alert('Has cerrado sesión exitosamente');
    window.location.reload();
}