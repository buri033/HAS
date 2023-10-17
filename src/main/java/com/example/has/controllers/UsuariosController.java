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

    @PutMapping("/{id}") // Actualizar un usuario
    public ResponseEntity<?> update(@RequestBody Usuarios user, @PathVariable(value = "id") Long id) {
        Optional<Usuarios> oUser = userService.findById(id);
        if (oUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuarios existingUser = oUser.get();

        // Actualiza los campos del usuario con los nuevos valores
        existingUser.setNombre(user.getNombre());
        existingUser.setEmail(user.getEmail());
        existingUser.setTelefono(user.getTelefono());
        existingUser.setPassword(user.getPassword());

        // Guarda el usuario actualizado en la base de datos
        Usuarios updatedUser = userService.save(existingUser);

        return ResponseEntity.ok(updatedUser);
    }


}



