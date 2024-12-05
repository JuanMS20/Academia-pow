// Configuración de URLs
const config = {
    apiUrl: 'http://localhost:8080/api',
    endpoints: {
        usuarios: '/usuarios',
        auth: '/auth'
    }
};

// Funciones de utilidad para las llamadas API
const apiService = {
    async get(endpoint) {
        try {
            const response = await fetch(`${config.apiUrl}${endpoint}`);
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Error en la petición');
            }
            return response.json();
        } catch (error) {
            console.error('Error en GET:', error);
            throw new Error('Error de conexión con el servidor');
        }
    },

    async post(endpoint, data) {
        try {
            const response = await fetch(`${config.apiUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Error en la petición');
            }
            
            return response.json();
        } catch (error) {
            console.error('Error en POST:', error);
            throw new Error('Error de conexión con el servidor');
        }
    }
}; 