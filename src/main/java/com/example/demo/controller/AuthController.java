package com.example.demo.controller;

import com.example.demo.model.UsuarioAdmin;
import com.example.demo.repository.UsuarioAdminRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UsuarioAdminRepository repository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UsuarioAdminRepository repository, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        UsuarioAdmin admin = repository.findByLogin(request.login())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha incorretos"));

        if (!passwordEncoder.matches(request.senha(), admin.getSenha())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha incorretos");
        }

        String token = jwtUtil.generateToken(admin.getLogin());
        return ResponseEntity.ok(new LoginResponse(token));
    }

    public record LoginRequest(String login, String senha) {}
    public record LoginResponse(String token) {}
}
