package com.example.demo.config;

import com.example.demo.model.RegistroMedico;
import com.example.demo.model.StatusRegistro;
import com.example.demo.model.UsuarioAdmin;
import com.example.demo.repository.RegistroMedicoRepository;
import com.example.demo.repository.UsuarioAdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataSeeder implements CommandLineRunner {

    private final RegistroMedicoRepository registroRepository;
    private final UsuarioAdminRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataSeeder(RegistroMedicoRepository registroRepository,
                      UsuarioAdminRepository usuarioRepository,
                      BCryptPasswordEncoder passwordEncoder) {
        this.registroRepository = registroRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Popula registros médicos
        if (registroRepository.count() == 0) {
            RegistroMedico medico1 = new RegistroMedico(
                    null,
                    "Dr. Roberto Carlos da Silva",
                    "123456",
                    "SP",
                    "Cardiologia",
                    StatusRegistro.ATIVO
            );

            RegistroMedico medico2 = new RegistroMedico(
                    null,
                    "Dra. Maria Eduarda Souza",
                    "654321",
                    "RJ",
                    "Pediatria",
                    StatusRegistro.INATIVO
            );

            RegistroMedico medico3 = new RegistroMedico(
                    null,
                    "Dr. Antonio Pereira Lima",
                    "987654",
                    "MG",
                    "Ortopedia",
                    StatusRegistro.CASSADO
            );

            registroRepository.save(medico1);
            registroRepository.save(medico2);
            registroRepository.save(medico3);
        }

        // Popula administrador padrão
        if (usuarioRepository.count() == 0) {
            UsuarioAdmin admin = new UsuarioAdmin(
                    null,
                    "admin",
                    passwordEncoder.encode("admin123")
            );
            usuarioRepository.save(admin);
        }
    }
}
