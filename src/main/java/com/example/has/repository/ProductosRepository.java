package com.example.has.repository;

import com.example.has.models.Productos;
import com.example.has.models.Transacciones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface ProductosRepository extends JpaRepository<Productos, Long> {
}
