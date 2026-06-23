package com.example.demo.controller;

import com.example.demo.model.RegistroMedico;
import com.example.demo.service.RegistroMedicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin(origins = "http://localhost:4200")
public class RegistroMedicoController {

    private final RegistroMedicoService service;

    public RegistroMedicoController(RegistroMedicoService service) {
        this.service = service;
    }

    @GetMapping("/consulta/{crm}")
    public ResponseEntity<RegistroMedico> consultarCrm(@PathVariable String crm) {
        RegistroMedico registro = service.consultarPorCrm(crm);
        return ResponseEntity.ok(registro);
    }

    @GetMapping
    public ResponseEntity<List<RegistroMedico>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @PostMapping
    public org.springframework.http.ResponseEntity<RegistroMedico> criarNovo(@RequestBody RegistroMedico novoRegistro) {
        return org.springframework.http.ResponseEntity.status(201).body(service.salvar(novoRegistro));
    }

    @DeleteMapping("/{id}")
    public org.springframework.http.ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return org.springframework.http.ResponseEntity.noContent().build();
    }
}
