package com.example.has.controllers;

import com.example.has.models.Transacciones;
import com.example.has.repository.TransaccionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transacciones")
public class TransaccionesController {
    @Autowired
    private TransaccionesRepository transaccionesRepository;
    @PostMapping
    public Transacciones createTransaccion(@RequestBody Transacciones transaccion){
        return transaccionesRepository.save(transaccion);
    }
}
