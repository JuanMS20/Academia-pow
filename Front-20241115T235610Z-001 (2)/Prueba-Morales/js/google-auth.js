// Inicialización de Google Sign-In
window.onload = function() {
    google.accounts.id.initialize({
        client_id: "476384221540-ignaeatjod8n5fnqt6vng1ajo91e928i.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
    });
    
    google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { 
            theme: "outline",
            size: "large",
            type: "standard",
            shape: "rectangular",
            text: "signin_with",
            logo_alignment: "left"
        }
    );
};

// Función que maneja la respuesta de Google
function handleCredentialResponse(response) {
    try {
        if (!response.credential) {
            console.error('No se recibieron credenciales');
            return;
        }

        // Decodificar el token JWT
        const responsePayload = decodeJwtResponse(response.credential);
        
        // Crear usuario en nuestro sistema
        const usuario = {
            name: responsePayload.name,
            doc: parseInt(responsePayload.sub.slice(-6)) // Usando los últimos 6 dígitos del ID como documento
        };

        // Guardar en nuestro backend
        usuariosService.crearUsuario(usuario)
            .then(usuarioCreado => {
                console.log('Usuario creado en el sistema:', usuarioCreado);
                
                // Guardar datos en localStorage
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userName', responsePayload.name);
                localStorage.setItem('userEmail', responsePayload.email);
                localStorage.setItem('userId', usuarioCreado.id);
                localStorage.setItem('loginType', 'google');
                localStorage.setItem('userPicture', responsePayload.picture);

                // Redirigir al inicio
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Error al crear usuario:', error);
                // Intentar iniciar sesión sin crear usuario
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userName', responsePayload.name);
                localStorage.setItem('userEmail', responsePayload.email);
                localStorage.setItem('loginType', 'google');
                localStorage.setItem('userPicture', responsePayload.picture);
                window.location.href = 'index.html';
            });
    } catch (error) {
        console.error('Error en el proceso de autenticación:', error);
        // Mostrar un mensaje más amigable al usuario
        alert('Hubo un problema al iniciar sesión. Por favor, intenta nuevamente.');
    }
}

// Función para decodificar el token JWT
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Función para cerrar sesión
function cerrarSesionGoogle() {
    google.accounts.id.disableAutoSelect();
    
    // Limpiar datos locales
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('loginType');
    localStorage.removeItem('userPicture');
    
    // Redirigir a la página de login
    window.location.href = 'auth.html';
}

// Modificar el botón de cerrar sesión si el usuario inició sesión con Google
document.addEventListener('DOMContentLoaded', function() {
    const loginType = localStorage.getItem('loginType');
    if (loginType === 'google') {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.onclick = cerrarSesionGoogle;
        }
    }
}); 