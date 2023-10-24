package com.example.has.controllers;

import com.example.has.models.Productos;
import com.example.has.repository.ProductosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/productos")
public class ProductosController {

    @Autowired
    private ProductosRepository productosRepository;

    @PostMapping
    public Productos createProducto(@RequestBody Productos producto) {
        return productosRepository.save(producto);
    }

    @GetMapping("/{id}")
    public Productos readOne(@PathVariable(value = "id") Long id) {
        return productosRepository.findById(id).get();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Long id) {
        if (productosRepository.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        productosRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Productos> readAll() {
        return productosRepository.findAll();
    }

    @PutMapping("/{id}") // Actualizar un producto
    public Productos update(@RequestBody Productos userDetails, @PathVariable(value = "id") Long id) {
        Productos producto = productosRepository.findById(id).get();
        producto.setNombre_producto(userDetails.getNombre_producto());
        producto.setMarca(userDetails.getMarca());
        producto.setTipo_producto(userDetails.getTipo_producto());
        producto.setPrecio_unitario(userDetails.getPrecio_unitario());
        producto.setCantidad(userDetails.getCantidad());
        return productosRepository.save(producto);
    }
}
