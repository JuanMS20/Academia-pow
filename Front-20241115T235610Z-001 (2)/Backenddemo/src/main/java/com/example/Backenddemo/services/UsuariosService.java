package com.example.Backenddemo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backenddemo.model.Usuario;
import com.example.Backenddemo.repository.IUsuarioRepository;

@Service
public class UsuariosService {

    @Autowired
    private IUsuarioRepository usuarioRepository;

    // Operaciones CRUD

    // Listar todos los usuarios
    public List<Usuario> selectAllUsers() {
        return usuarioRepository.findAll();
    }

    // Encontrar solo un usuario
    public Optional<Usuario> selectById(String id) {
        return usuarioRepository.findById(id);
    }
    
    // Crear usuario
    public Usuario createUser(Usuario nuevoUsuario) {
        return usuarioRepository.save(nuevoUsuario);
    }
}
    

