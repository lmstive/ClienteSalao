package br.com.salao.controller;

import br.com.salao.model.Servico;
import br.com.salao.service.ServicoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicos") // Endpoint base para serviços
@RequiredArgsConstructor
public class ServicoController {

    private final ServicoService servicoService;

    // Endpoint para listar todos os serviços
    @GetMapping
    public List<Servico> findAll() {
        return servicoService.findAll();
    }

    // Endpoint para salvar um novo serviço (ADICIONE ESSE MÉTODO)
    @PostMapping
    public Servico save(@RequestBody Servico servico) {
        return servicoService.save(servico);
    }

    // Outros métodos (opcional)
}