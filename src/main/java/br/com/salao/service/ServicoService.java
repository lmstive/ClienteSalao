package br.com.salao.service;

import br.com.salao.model.Servico;
import br.com.salao.repository.ServicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicoService {

    private final ServicoRepository servicoRepository;

    public List<Servico> findAll() {
        return servicoRepository.findAll();
    }

    public Servico save(Servico servico) {
        return servicoRepository.save(servico);
    }
}