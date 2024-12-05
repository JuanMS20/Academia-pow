package com.example.Backenddemo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backenddemo.model.Usuario;

public interface IUsuarioRepository extends MongoRepository<Usuario, String> {
    // Aquí puedes agregar métodos personalizados si los necesitas
}
