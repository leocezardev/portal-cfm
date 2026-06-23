package com.example.demo.service;

import com.example.demo.model.RegistroMedico;
import com.example.demo.repository.RegistroMedicoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RegistroMedicoService {

    private final RegistroMedicoRepository repository;

    public RegistroMedicoService(RegistroMedicoRepository repository) {
        this.repository = repository;
    }

    public RegistroMedico consultarPorCrm(String crm) {
        return repository.findByNumeroCrm(crm)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro médico não encontrado para o CRM fornecido"));
    }

    public List<RegistroMedico> listarTodos() {
        return repository.findAll();
    }

    public RegistroMedico salvar(@NonNull RegistroMedico medico) {
        if (repository.findByNumeroCrm(medico.getNumeroCrm()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CRM já cadastrado no sistema");
        }
        return repository.save(medico);
    }

    public void deletar(@NonNull Long id) {
        repository.deleteById(id);
    }
}
