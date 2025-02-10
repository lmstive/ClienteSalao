package br.com.salao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.salao.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

    // Busca serviços pelo nome exato
    Optional<Servico> findByNome(String nome);

    // Busca serviços cujo nome contenha uma string (ignorando maiúsculas/minúsculas)
    List<Servico> findByNomeContainingIgnoreCase(String nome);

    // Busca serviços com preço maior que um valor
    List<Servico> findByPrecoGreaterThan(Double preco);

    // Busca serviços com preço menor que um valor
    List<Servico> findByPrecoLessThan(Double preco);

    // Busca serviços com preço entre dois valores
    List<Servico> findByPrecoBetween(Double precoInicial, Double precoFinal);
}