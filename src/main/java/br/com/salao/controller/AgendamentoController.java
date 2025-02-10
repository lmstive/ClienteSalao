package br.com.salao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.salao.model.Agendamento;
import br.com.salao.service.AgendamentoService;

@RestController
@RequestMapping("/api/agendamentos") // Adiciona o prefixo /api
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public List<Agendamento> findAll() {
        return agendamentoService.findAll();
    }

    @PostMapping
    public Agendamento save(@RequestBody Agendamento agendamento) {
        return agendamentoService.save(agendamento);
    }
}