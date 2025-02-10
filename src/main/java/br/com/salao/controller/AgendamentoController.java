package br.com.salao.controller;

import br.com.salao.model.Agendamento;
import br.com.salao.service.AgendamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    // Endpoint para listar todos os agendamentos
    @GetMapping
    public List<Agendamento> findAll() {
        return agendamentoService.findAll();
    }

    // Endpoint para salvar um novo agendamento (USE IDs DO CLIENTE E SERVIÇO)
    @PostMapping
    public Agendamento save(@RequestBody Agendamento agendamento) {
        return agendamentoService.save(agendamento);
    }
}