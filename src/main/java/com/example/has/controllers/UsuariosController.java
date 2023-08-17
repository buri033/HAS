package com.example.has.controllers;
import com.example.has.models.Usuarios;
import com.example.has.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/usuarios")
public class UsuariosController {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @GetMapping
    public List<Usuarios> getAllUsuarios(){
        return usuariosRepository.findAll();
    }

    @GetMapping("/{id}")
    public Usuarios getUsuarioById(@PathVariable Long id){
        return usuariosRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Usuarios createUsuario(@RequestBody Usuarios usuarios){
        return usuariosRepository.save(usuarios);
    }

    @PutMapping("/{id}")
    public Usuarios updateUsuario(@PathVariable Long id, @RequestBody Usuarios usuarios){
        Usuarios foundUsuario = usuariosRepository.findById(id).orElseThrow();
        foundUsuario.setNombre(usuarios.getNombre());
        foundUsuario.setEmail(usuarios.getEmail());
        foundUsuario.setTelefono(usuarios.getTelefono());
        foundUsuario.setPassword(usuarios.getPassword());
        return usuariosRepository.save(foundUsuario);
    }


}

