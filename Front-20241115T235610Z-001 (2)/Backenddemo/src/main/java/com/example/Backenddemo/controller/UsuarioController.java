package com.example.Backenddemo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Backenddemo.model.Usuario;
import com.example.Backenddemo.services.UsuariosService;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"}, 
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
             allowedHeaders = "*",
             allowCredentials = "true")
public class UsuarioController {

    @Autowired
    private UsuariosService usuariosService;

    // Listar todos los usuarios
    @GetMapping
    public List<Usuario> listarUsuarios() {
        System.out.println("Listando usuarios...");
        return usuariosService.selectAllUsers();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable String id) {
        System.out.println("Buscando usuario con ID: " + id);
        Optional<Usuario> usuario = usuariosService.selectById(id);
        return usuario.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario nuevoUsuario) {
        try {
            System.out.println("Creando nuevo usuario: " + nuevoUsuario.getName());
            Usuario usuario = usuariosService.createUser(nuevoUsuario);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            System.err.println("Error al crear usuario: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
