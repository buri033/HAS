package com.example.has.controllers;

import com.example.has.service.UsuariosService;
import com.example.has.models.Usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

public class AuthController {


    @Autowired
    private UsuariosService usuarioDao;


    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuarios usuario) {
        Usuarios usuariologueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        if (usuariologueado != null) {
            return "Autenticado exitosamente"; // Cambiar el mensaje según tus necesidades
        }
        return "Credenciales inválidas";
    }
}