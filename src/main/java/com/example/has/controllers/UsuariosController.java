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
    private UsuariosService userService;
    @Autowired
    private UsuariosRepository usuariosRepository;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Usuarios user) {
        // Verificar si los campos obligatorios no están en blanco
        if (user.getNombre() == null || user.getNombre().isEmpty() ||
                user.getEmail() == null || user.getEmail().isEmpty() ||
                    user.getTelefono() == null || user.getTelefono().isEmpty() ||
                        user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Los campos nombre, apellido y email son obligatorios.");
        }

        // Aquí puedes agregar más validaciones según tus necesidades

        // Guardar el usuario si pasa todas las validaciones
        Usuarios newUser = usuariosRepository.save(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> readOne(@PathVariable(value = "id") Long id) {
        Optional<Usuarios> oUser = userService.findById(id);

        if (oUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oUser);
    }


    //Update a user
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Usuarios userDetails, @PathVariable(value = "id") Long id) {
        Optional<Usuarios> user = userService.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        user.get().setNombre(userDetails.getNombre());
        user.get().setEmail(userDetails.getEmail());
        user.get().setTelefono(userDetails.getTelefono());
        user.get().setPassword(userDetails.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user.get()));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Long id) {
        if (userService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Usuarios> readAll() {
        return StreamSupport//<--hereda de Object y me trae los stream
                .stream(userService.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
}

