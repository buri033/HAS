package com.example.has.controllers;

import com.example.has.repository.UsuariosRepository;
import com.example.has.service.UsuariosService;
import com.example.has.models.Usuarios;

import com.example.has.service.UsuariosServicelmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
@RestController
public class AuthController {

    @Autowired
    private UsuariosServicelmpl usuariosServiceImpl;
    @Autowired
    UsuariosRepository usuariosRepository;

    @PostMapping("api/login")
    public ResponseEntity<String> login(@RequestBody Usuarios usuarios) {
        // Verificar si los campos obligatorios no están en blanco
        if (usuarios.getEmail() == null || usuarios.getEmail().isEmpty() ||
                usuarios.getPassword() == null || usuarios.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Los campos email y password son obligatorios.");
        }

        Usuarios usuariologueado = usuariosServiceImpl.obtenerUsuarioPorCredenciales(usuarios);
        if (usuariologueado != null) {
            // Autenticación exitosa
            return ResponseEntity.ok("ENCONTRADO");
        }

        // Autenticación fallida
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ERROR");
    }
}