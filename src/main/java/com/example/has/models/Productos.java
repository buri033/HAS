package com.example.has.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "productos")
@ToString
@Getter
@Setter
@EqualsAndHashCode
public class Productos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_producto")
    private String nombre_producto;

    @Column(name = "marca")
    private String marca;

    @Column(name = "tipo_producto")
    private String tipo_producto;

    @Column(name = "precio_unitario")
    private Long precio_unitario;

    @Column(name = "cantidad")
    private Long cantidad;

}