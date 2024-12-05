// Funciones para manejar usuarios
const usuariosService = {
    // Obtener todos los usuarios
    async obtenerUsuarios() {
        try {
            return await apiService.get(config.endpoints.usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    },

    // Obtener un usuario por ID
    async obtenerUsuarioPorId(id) {
        try {
            return await apiService.get(`${config.endpoints.usuarios}/${id}`);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw error;
        }
    },

    // Crear un nuevo usuario
    async crearUsuario(usuario) {
        try {
            return await apiService.post(config.endpoints.usuarios, usuario);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }
}; 