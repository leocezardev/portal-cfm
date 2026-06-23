package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "registros_medicos")
public class RegistroMedico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String numeroCrm;

    @Column(nullable = false, length = 2)
    private String uf;

    private String especialidade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusRegistro status;

    public RegistroMedico() {
    }

    public RegistroMedico(Long id, String nome, String numeroCrm, String uf, String especialidade, StatusRegistro status) {
        this.id = id;
        this.nome = nome;
        this.numeroCrm = numeroCrm;
        this.uf = uf;
        this.especialidade = especialidade;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNumeroCrm() {
        return numeroCrm;
    }

    public void setNumeroCrm(String numeroCrm) {
        this.numeroCrm = numeroCrm;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public StatusRegistro getStatus() {
        return status;
    }

    public void setStatus(StatusRegistro status) {
        this.status = status;
    }
}