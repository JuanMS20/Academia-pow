// Estado del usuario
let userState = {
    nivel: 1,
    xpActual: 0,
    xpNecesaria: 1000,
    xpTotal: 0,
    logros: 0,
    diasSeguidos: 0,
    objetivosDiarios: {
        lecciones: { completado: 0, objetivo: 2 },
        tiempoEstudio: { completado: 0, objetivo: 60 },
        ejercicios: { completado: 0, objetivo: 5 }
    }
};

// Cargar datos del usuario
async function cargarDatosUsuario() {
    try {
        const progress = await gamificationAPI.getUserProgress();
        userState = { ...userState, ...progress };
        actualizarInterfaz();
    } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
    }
}

// Actualizar interfaz
function actualizarInterfaz() {
    actualizarProgreso();
    actualizarObjetivos();
    actualizarLogros();
}

// Actualizar progreso
async function actualizarProgreso() {
    // Actualizar barra de nivel
    const progressBar = document.querySelector('.nivel-progress .progress-bar');
    const porcentaje = (userState.xpActual / userState.xpNecesaria) * 100;
    progressBar.style.width = `${porcentaje}%`;

    // Actualizar texto de progreso
    document.querySelector('.nivel-actual p').textContent = 
        `${userState.xpActual}/${userState.xpNecesaria} XP para el siguiente nivel`;

    // Actualizar estadísticas
    document.querySelector('.stat:nth-child(1) span').textContent = `${userState.xpTotal} XP Total`;
    document.querySelector('.stat:nth-child(2) span').textContent = `${userState.logros} Logros`;
    document.querySelector('.stat:nth-child(3) span').textContent = `${userState.diasSeguidos} días seguidos`;

    // Sincronizar con el backend
    try {
        await gamificationAPI.updateProgress(userState);
    } catch (error) {
        console.error('Error al sincronizar progreso:', error);
    }
}

// Actualizar objetivos diarios
function actualizarObjetivos() {
    const objetivos = userState.objetivosDiarios;
    
    Object.entries(objetivos).forEach(([tipo, datos]) => {
        const card = document.querySelector(`.objetivo-card[data-tipo="${tipo}"]`);
        if (card) {
            const progressBar = card.querySelector('.progress-bar');
            const progress = (datos.completado / datos.objetivo) * 100;
            progressBar.style.width = `${progress}%`;
            
            card.querySelector('.progreso-texto').textContent = 
                `${datos.completado}/${datos.objetivo}`;
        }
    });
}

// Cargar y mostrar logros
async function actualizarLogros() {
    try {
        const logros = await gamificationAPI.getAchievements();
        const logrosContainer = document.querySelector('.logros-container');
        
        if (logrosContainer) {
            logrosContainer.innerHTML = logros.map(logro => `
                <div class="logro-card ${logro.desbloqueado ? 'desbloqueado' : ''}">
                    <div class="logro-icon">
                        <i class="fas ${logro.icono}"></i>
                    </div>
                    <div class="logro-info">
                        <h3>${logro.nombre}</h3>
                        <p>${logro.descripcion}</p>
                        <span class="xp-reward">+${logro.xp} XP</span>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error al cargar logros:', error);
    }
}

// Función para ganar XP
async function ganarXP(cantidad) {
    userState.xpTotal += cantidad;
    userState.xpActual += cantidad;
    
    if (userState.xpActual >= userState.xpNecesaria) {
        await subirNivel();
    }
    
    await actualizarProgreso();
}

// Función para subir de nivel
async function subirNivel() {
    userState.nivel++;
    userState.xpActual = userState.xpActual - userState.xpNecesaria;
    userState.xpNecesaria = Math.floor(userState.xpNecesaria * 1.5);
    
    alert(`¡Felicidades! Has alcanzado el nivel ${userState.nivel}`);
    
    // Actualizar display de nivel
    document.querySelector('.nivel-actual h2').textContent = `Nivel ${userState.nivel}`;
    
    // Sincronizar con el backend
    try {
        await gamificationAPI.updateProgress(userState);
    } catch (error) {
        console.error('Error al sincronizar nivel:', error);
    }
}

// Manejar recompensas
document.querySelectorAll('.reward-btn').forEach(btn => {
    btn.addEventListener('click', async function() {
        const costo = parseInt(this.dataset.costo);
        if (userState.xpTotal >= costo) {
            try {
                await gamificationAPI.unlockAchievement(this.dataset.achievementId);
                userState.xpTotal -= costo;
                await actualizarProgreso();
                alert('¡Recompensa canjeada con éxito!');
                this.disabled = true;
                this.textContent = '¡Desbloqueado!';
            } catch (error) {
                alert('Error al canjear la recompensa');
            }
        } else {
            alert('No tienes suficientes XP para esta recompensa');
        }
    });
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarDatosUsuario();
}); 