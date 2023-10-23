package com.example.has.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "transacciones")
@ToString
@Getter
@Setter
@EqualsAndHashCode
public class Transacciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transaccion")
    private Long id_transaccion;

    @Column(name = "id_usuario")
    private Long id_usuario;


    @Column(name = "transaccion")
    private String transaccion;

    @Column(name = "monto")
    private Long monto;

}

