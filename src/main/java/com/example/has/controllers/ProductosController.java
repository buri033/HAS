package com.example.has.controllers;

import com.example.has.models.Productos;
import com.example.has.repository.ProductosRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<Productos> readAll() {
        return productosRepository.findAll();
    }

    @GetMapping("/{id}")
    public Productos readOne(@PathVariable(value = "id") Long id) {
        return productosRepository.findById(id).get();
    }

    @PutMapping("/{id}")
    public Productos update(@RequestBody Productos productoDetails, @PathVariable(value = "id") Long id) {
        Productos producto = productosRepository.findById(id).get();
        producto.setNombre(productoDetails.getNombre());
        producto.setMarca(productoDetails.getMarca());
        producto.setTipo(productoDetails.getTipo());
        producto.setPrecio(productoDetails.getPrecio());
        producto.setCantidad(productoDetails.getCantidad());

        return productosRepository.save(producto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        productosRepository.deleteById(id);
    }
}