package br.com.salao.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.salao.model.Servico;
import br.com.salao.service.ServicoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/servicos")
@RequiredArgsConstructor
public class ServicoController {

    private final ServicoService servicoService;

    @GetMapping
    public List<Servico> findAll() {
        return servicoService.findAll();
    }

    @PostMapping
    public Servico save(@RequestBody Servico servico) {
        return servicoService.save(servico);
    }
}