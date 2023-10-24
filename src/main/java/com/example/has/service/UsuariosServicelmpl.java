package com.example.has.service;

import com.example.has.models.Usuarios;
import com.example.has.repository.UsuariosRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuariosServicelmpl implements UsuariosService{

    @PersistenceContext
    EntityManager entityManager;


    @Autowired
    private UsuariosRepository userRepository;//inyección de dependencias

    @Transactional(readOnly = true)
    public Iterable<Usuarios> findAll() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Usuarios> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuarios> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public Usuarios save(Usuarios user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Usuarios update(Usuarios usuarios, Long id) {
        return null;
    }


    @Override
    public Usuarios obtenerUsuarioPorCredenciales(Usuarios usuario) {
        String hql = "FROM Usuarios WHERE email = :email" +
                " AND password = :password";
        List<Usuarios> lista = entityManager.createQuery(hql)
                .setParameter("email", usuario.getEmail())
                .setParameter("password", usuario.getPassword())
                .getResultList();
        if (lista.isEmpty()) {
            return null;
        } else {
            return lista.get(0);
        }
    }
    @Override
    public Usuarios obtenerUsuarioPorCredenciales2(Usuarios usuario) {
        String hql = "FROM Usuarios WHERE id = :id";
        List<Usuarios> lista = entityManager.createQuery(hql)
                .setParameter("id", usuario.getId())
                .getResultList();
        if (lista.isEmpty()) {
            return null;
        } else {
            return lista.get(0);
        }
    }


}