package com.example.demo.repository;

import com.example.demo.model.RegistroMedico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistroMedicoRepository extends JpaRepository<RegistroMedico, Long> {
    Optional<RegistroMedico> findByNumeroCrm(String numeroCrm);
}
