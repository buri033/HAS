package com.example.has.controllers;

import com.example.has.repository.UsuariosRepository;
import com.example.has.models.Usuarios;
import com.example.has.service.UsuariosServicelmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController2 {

    @Autowired
    private UsuariosServicelmpl usuariosServiceImpl;
    @Autowired
    UsuariosRepository usuariosRepository;

    @PostMapping ("api/contra")
    public String verificarContra(@RequestBody Usuarios usuarios) {

        Usuarios contraencontrada = usuariosServiceImpl.obtenerUsuarioPorCredenciales2(usuarios);
        if (contraencontrada != null) {
            // Autenticación exitosa
            return "ENCONTRADO";
        }else {
            // Autenticación fallida
            return "ERROR";
        }
    }
}