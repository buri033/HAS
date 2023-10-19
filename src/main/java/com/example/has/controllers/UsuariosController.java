package com.example.has.controllers;
import com.example.has.models.Usuarios;
import com.example.has.repository.UsuariosRepository;
import com.example.has.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/api/usuarios")
public class UsuariosController {
    @Autowired
    private UsuariosRepository usuariosRepository;

    @PostMapping
    public Usuarios createUser(@RequestBody Usuarios user) {
        return usuariosRepository.save(user);
    }

    @GetMapping("/{id}")
    public Usuarios readOne(@PathVariable(value = "id") Long id) {
        return usuariosRepository.findById(id).get();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Long id) {
        if (usuariosRepository.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        usuariosRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Usuarios> readAll() {
        return usuariosRepository.findAll();
    }

    @PutMapping("/{id}") // Actualizar un usuario
    public Usuarios update(@RequestBody Usuarios userDetails, @PathVariable(value = "id") Long id) {
        Usuarios user = usuariosRepository.findById(id).get();
        user.setNombre(userDetails.getNombre());
        user.setTelefono(userDetails.getTelefono());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        return usuariosRepository.save(user);
    }


}



