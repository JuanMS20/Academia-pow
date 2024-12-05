// Funciones de autenticación
async function iniciarSesion(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        // Primero intentamos buscar si el usuario existe
        const usuarios = await usuariosService.obtenerUsuarios();
        const usuario = usuarios.find(u => u.name === email && u.doc === parseInt(password));

        if (usuario) {
            // Usuario encontrado, guardamos los datos
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userName', usuario.name);
            localStorage.setItem('userId', usuario.id);

            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'index.html';
        } else {
            // Si no existe, lo creamos
            const nuevoUsuario = {
                name: email,
                doc: parseInt(password)
            };

            const response = await usuariosService.crearUsuario(nuevoUsuario);
            
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userName', email);
            localStorage.setItem('userId', response.id);

            alert('¡Usuario creado y sesión iniciada!');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión: ' + error.message);
    }
}

async function registrarUsuario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('regNombre').value;
    const email = document.getElementById('regEmail').value;
    const telefono = document.getElementById('regTelefono').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const usuario = {
            name: nombre,
            doc: parseInt(telefono)
        };

        const response = await usuariosService.crearUsuario(usuario);

        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', nombre);
        localStorage.setItem('userId', response.id);

        alert('¡Registro exitoso!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar: ' + error.message);
    }
}

// Cambiar entre formularios
function cambiarTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registroForm = document.getElementById('registroForm');
    const tabs = document.querySelectorAll('.auth-tab');

    if (tab === 'login') {
        loginForm.classList.add('active');
        registroForm.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registroForm.classList.add('active');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registroForm = document.getElementById('registroForm');

    if (loginForm) {
        loginForm.addEventListener('submit', iniciarSesion);
    }
    
    if (registroForm) {
        registroForm.addEventListener('submit', registrarUsuario);
    }
}); 