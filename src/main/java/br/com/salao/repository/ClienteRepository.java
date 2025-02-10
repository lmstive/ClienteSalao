package br.com.salao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.salao.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // Busca um cliente pelo nome exato
    Optional<Cliente> findByNome(String nome);

    // Busca clientes cujo nome contenha uma string (ignorando maiúsculas/minúsculas)
    List<Cliente> findByNomeContainingIgnoreCase(String nome);

    // Busca clientes pelo email
    Optional<Cliente> findByEmail(String email);

    // Busca clientes pelo telefone
    Optional<Cliente> findByTelefone(String telefone);

    // Busca clientes que tenham agendamentos (usando uma query personalizada)
    @Query("SELECT c FROM Cliente c WHERE SIZE(c.agendamentos) > 0")
    List<Cliente> findClientesComAgendamentos();
}