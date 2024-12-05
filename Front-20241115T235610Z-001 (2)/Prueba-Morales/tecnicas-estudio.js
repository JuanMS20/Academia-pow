// Estado del usuario en el curso
let cursoState = {
    tecnicasDominadas: 5,
    totalTecnicas: 20,
    tiempoTotal: 24,
    eficiencia: 75,
    tecnicas: {
        mapasMentales: { nivel: 100, desbloqueada: true },
        pomodoro: { nivel: 75, desbloqueada: true },
        cornell: { nivel: 0, desbloqueada: false }
    },
    habitos: {
        estudioNocturno: {
            diasSeguidos: 3,
            diasSemana: ['L', 'M', 'M', '', '', '', '']
        },
        lecturaActiva: {
            tiempoActual: 45,
            tiempoObjetivo: 60
        }
    },
    desafios: {
        maratonEstudio: {
            progreso: 60,
            diasRestantes: 3,
            completado: false
        },
        maestroResumen: {
            progreso: 100,
            completado: true
        }
    },
    xp: 1500
};

// Actualizar progreso de técnicas
function actualizarTecnicas() {
    Object.entries(cursoState.tecnicas).forEach(([tecnica, datos]) => {
        const card = document.querySelector(`.tecnica-card[data-tecnica="${tecnica}"]`);
        if (card && datos.desbloqueada) {
            const progressBar = card.querySelector('.progress');
            if (progressBar) {
                progressBar.style.width = `${datos.nivel}%`;
            }
        }
    });
}

// Actualizar hábitos
function actualizarHabitos() {
    // Actualizar streak de estudio nocturno
    const diasStreak = document.querySelectorAll('.dias-streak .dia');
    cursoState.habitos.estudioNocturno.diasSemana.forEach((dia, index) => {
        if (dia) {
            diasStreak[index].classList.add('activo');
        }
    });

    // Actualizar lectura activa
    const lecturaProgress = document.querySelector('.tiempo-dedicado .progress');
    if (lecturaProgress) {
        const porcentaje = (cursoState.habitos.lecturaActiva.tiempoActual / 
                           cursoState.habitos.lecturaActiva.tiempoObjetivo) * 100;
        lecturaProgress.style.width = `${porcentaje}%`;
    }
}

// Manejar recompensas
document.querySelectorAll('.reward-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const costo = parseInt(this.textContent.match(/\d+/)[0]);
        if (cursoState.xp >= costo) {
            cursoState.xp -= costo;
            this.textContent = '¡Desbloqueado!';
            this.disabled = true;
            alert('¡Has desbloqueado una recompensa especial!');
        } else {
            alert('No tienes suficientes XP para esta recompensa');
        }
    });
});

// Actualizar desafíos
function actualizarDesafios() {
    Object.entries(cursoState.desafios).forEach(([desafio, datos]) => {
        const card = document.querySelector(`.desafio-card[data-desafio="${desafio}"]`);
        if (card) {
            const progressBar = card.querySelector('.progress');
            if (progressBar) {
                progressBar.style.width = `${datos.progreso}%`;
            }
            if (datos.completado) {
                card.classList.add('completado');
            }
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    actualizarTecnicas();
    actualizarHabitos();
    actualizarDesafios();
});

// Simular progreso (para demostración)
setInterval(() => {
    if (Math.random() > 0.7) {
        cursoState.habitos.lecturaActiva.tiempoActual = 
            Math.min(60, cursoState.habitos.lecturaActiva.tiempoActual + 5);
        actualizarHabitos();
    }
}, 5000); 