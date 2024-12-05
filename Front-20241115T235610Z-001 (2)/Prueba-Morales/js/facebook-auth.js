// Inicializar el SDK de Facebook
window.fbAsyncInit = function() {
    FB.init({
        appId      : 'TU_APP_ID', // Reemplazar con tu App ID de Facebook
        cookie     : true,
        xfbml      : true,
        version    : 'v18.0'
    });
};

// Función para verificar el estado del login
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // El usuario está logueado en Facebook y en tu app
            console.log('Usuario conectado');
            obtenerDatosUsuario();
        } else {
            // El usuario no está logueado
            console.log('Usuario no conectado');
        }
    });
}

// Función para obtener datos del usuario
function obtenerDatosUsuario() {
    FB.api('/me', {fields: 'name,email'}, function(response) {
        console.log('Datos del usuario:', response);
        
        // Crear usuario en nuestro sistema
        const usuario = {
            name: response.name,
            doc: Date.now() // Usando timestamp como documento temporal
        };

        // Guardar en nuestro backend
        usuariosService.crearUsuario(usuario)
            .then(usuarioCreado => {
                console.log('Usuario creado en el sistema:', usuarioCreado);
                
                // Guardar datos en localStorage
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userName', response.name);
                localStorage.setItem('userId', usuarioCreado.id);
                localStorage.setItem('loginType', 'facebook');

                // Redirigir al inicio
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Error al crear usuario:', error);
                alert('Error al crear usuario en el sistema');
            });
    });
}

// Función para cerrar sesión
function cerrarSesionFacebook() {
    FB.logout(function(response) {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('loginType');
        window.location.href = 'auth.html';
    });
}

// Agregar botón de cerrar sesión si el usuario inició sesión con Facebook
document.addEventListener('DOMContentLoaded', function() {
    const loginType = localStorage.getItem('loginType');
    if (loginType === 'facebook') {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.onclick = cerrarSesionFacebook;
        }
    }
}); 