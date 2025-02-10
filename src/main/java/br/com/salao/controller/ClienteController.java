package br.com.salao.controller;

import br.com.salao.model.Cliente;
import br.com.salao.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes") // Endpoint base para clientes
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    // Endpoint para listar todos os clientes
    @GetMapping
    public List<Cliente> findAll() {
        return clienteService.findAll();
    }

    // Endpoint para salvar um novo cliente (ADICIONE ESSE MÉTODO)
    @PostMapping
    public Cliente save(@RequestBody Cliente cliente) {
        return clienteService.save(cliente);
    }

    // Outros métodos (opcional)
}