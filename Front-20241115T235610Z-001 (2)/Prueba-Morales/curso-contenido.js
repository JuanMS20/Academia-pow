class ContenidoCurso {
    constructor() {
        this.cursosData = {
            'quimica': {
                titulo: 'Química Básica',
                descripcion: 'Fundamentos esenciales de química para principiantes',
                modulos: [
                    {
                        titulo: 'Módulo 1: Introducción a la Química',
                        temas: [
                            'La materia y sus propiedades',
                            'Átomos y moléculas',
                            'Tabla periódica'
                        ]
                    },
                    {
                        titulo: 'Módulo 2: Enlaces Químicos',
                        temas: [
                            'Enlaces iónicos',
                            'Enlaces covalentes',
                            'Enlaces metálicos'
                        ]
                    },
                    {
                        titulo: 'Módulo 3: Reacciones Químicas',
                        temas: [
                            'Tipos de reacciones',
                            'Balanceo de ecuaciones',
                            'Estequiometría básica'
                        ]
                    }
                ],
                proximaClase: {
                    fecha: '2024-03-25 15:00',
                    tema: 'Introducción a la Química'
                }
            },
            'matematicas': {
                titulo: 'Matemáticas Básicas',
                descripcion: 'Refuerza tus bases matemáticas con ejercicios prácticos y teoría clara',
                modulos: [
                    {
                        titulo: 'Módulo 1: Aritmética',
                        temas: [
                            'Operaciones básicas',
                            'Fracciones y decimales',
                            'Porcentajes y proporciones'
                        ]
                    },
                    {
                        titulo: 'Módulo 2: Álgebra Básica',
                        temas: [
                            'Expresiones algebraicas',
                            'Ecuaciones lineales',
                            'Sistemas de ecuaciones'
                        ]
                    },
                    {
                        titulo: 'Módulo 3: Geometría',
                        temas: [
                            'Figuras geométricas',
                            'Perímetro y área',
                            'Teorema de Pitágoras'
                        ]
                    }
                ],
                proximaClase: {
                    fecha: '2024-03-26 16:00',
                    tema: 'Introducción a la Aritmética'
                }
            },
            'fisica': {
                titulo: 'Física para Principiantes',
                descripcion: 'Comprende los conceptos fundamentales de la física de manera práctica',
                modulos: [
                    {
                        titulo: 'Módulo 1: Mecánica Básica',
                        temas: [
                            'Cinemática',
                            'Leyes de Newton',
                            'Trabajo y energía'
                        ]
                    },
                    {
                        titulo: 'Módulo 2: Termodinámica',
                        temas: [
                            'Temperatura y calor',
                            'Leyes de la termodinámica',
                            'Procesos térmicos'
                        ]
                    },
                    {
                        titulo: 'Módulo 3: Ondas y Sonido',
                        temas: [
                            'Propiedades de las ondas',
                            'Ondas sonoras',
                            'Efecto Doppler'
                        ]
                    }
                ],
                proximaClase: {
                    fecha: '2024-03-27 17:00',
                    tema: 'Introducción a la Mecánica'
                }
            },
            'ingles': {
                titulo: 'Inglés Académico',
                descripcion: 'Mejora tu inglés para propósitos académicos y profesionales',
                modulos: [
                    {
                        titulo: 'Módulo 1: Gramática Avanzada',
                        temas: [
                            'Tiempos verbales',
                            'Estructuras complejas',
                            'Voz pasiva y activa'
                        ]
                    },
                    {
                        titulo: 'Módulo 2: Escritura Académica',
                        temas: [
                            'Ensayos académicos',
                            'Citación y referencias',
                            'Estructura de párrafos'
                        ]
                    },
                    {
                        titulo: 'Módulo 3: Presentaciones',
                        temas: [
                            'Habilidades de presentación',
                            'Vocabulario académico',
                            'Debates y discusiones'
                        ]
                    }
                ],
                proximaClase: {
                    fecha: '2024-03-28 14:00',
                    tema: 'Introducción a la Gramática Avanzada'
                }
            },
            'programacion': {
                titulo: 'Programación Básica con Python',
                descripcion: 'Introduce en el mundo de la programación con Python',
                modulos: [
                    {
                        titulo: 'Módulo 1: Fundamentos de Python',
                        temas: [
                            'Variables y tipos de datos',
                            'Estructuras de control',
                            'Funciones básicas'
                        ]
                    },
                    {
                        titulo: 'Módulo 2: Estructuras de Datos',
                        temas: [
                            'Listas y tuplas',
                            'Diccionarios',
                            'Conjuntos'
                        ]
                    },
                    {
                        titulo: 'Módulo 3: Programación Orientada a Objetos',
                        temas: [
                            'Clases y objetos',
                            'Herencia',
                            'Polimorfismo'
                        ]
                    }
                ],
                proximaClase: {
                    fecha: '2024-03-29 15:00',
                    tema: 'Introducción a Python'
                }
            },
            'tecnicas-estudio': {
                titulo: 'Técnicas Avanzadas de Estudio',
                descripcion: 'Aprende metodologías efectivas para mejorar tu capacidad de aprendizaje',
                modulos: [
                    {
                        titulo: 'Módulo 1: Fundamentos del Aprendizaje',
                        temas: [
                            'Estilos de aprendizaje',
                            'Memoria y retención',
                            'Gestión del tiempo'
                        ]
                    },
                    {
                        titulo: 'Módulo 2: Técnicas de Estudio',
                        temas: [
                            'Mapas mentales',
                            'Técnica Pomodoro',
                            'Toma de apuntes efectiva'
                        ]
                    },
                    {
                        titulo: 'Módulo 3: Preparación para Exámenes',
                        temas: [
                            'Planificación de estudio',
                            'Técnicas de memorización',
                            'Manejo del estrés'
                        ]
                    }
                ],
                proximaClase: {
                    fecha: '2024-03-30 16:00',
                    tema: 'Introducción a los Estilos de Aprendizaje'
                }
            }
        };

        this.init();
    }

    init() {
        const params = new URLSearchParams(window.location.search);
        const cursoId = params.get('curso');
        
        if (cursoId && this.cursosData[cursoId]) {
            this.cargarContenidoCurso(cursoId);
        } else {
            window.location.href = 'index.html';
        }
    }

    cargarContenidoCurso(cursoId) {
        const curso = this.cursosData[cursoId];
        
        // Actualizar título y descripción
        document.getElementById('cursoTitulo').textContent = curso.titulo;
        document.getElementById('cursoDescripcion').textContent = curso.descripcion;

        // Cargar módulos
        const modulosLista = document.getElementById('modulosLista');
        modulosLista.innerHTML = curso.modulos.map((modulo, index) => `
            <div class="modulo-item">
                <h3>${modulo.titulo}</h3>
                <ul>
                    ${modulo.temas.map(tema => `
                        <li>${tema}</li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        // Actualizar próxima clase
        const fecha = new Date(curso.proximaClase.fecha);
        document.getElementById('proximaClaseFecha').textContent = fecha.toLocaleString();
        document.getElementById('proximaClaseTema').textContent = curso.proximaClase.tema;
    }
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ContenidoCurso();
}); 