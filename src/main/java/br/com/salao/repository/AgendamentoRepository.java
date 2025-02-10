package br.com.salao.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.salao.model.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    // Busca agendamentos por cliente
    List<Agendamento> findByClienteId(Long clienteId);

    // Busca agendamentos por serviço
    List<Agendamento> findByServicoId(Long servicoId);

    // Busca agendamentos por data e hora exata
    List<Agendamento> findByDataHora(LocalDateTime dataHora);

    // Busca agendamentos entre duas datas
    List<Agendamento> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);

    // Busca agendamentos de um cliente em um período específico
    List<Agendamento> findByClienteIdAndDataHoraBetween(Long clienteId, LocalDateTime inicio, LocalDateTime fim);

    // Busca agendamentos de um serviço em um período específico
    List<Agendamento> findByServicoIdAndDataHoraBetween(Long servicoId, LocalDateTime inicio, LocalDateTime fim);

    // Busca agendamentos que ainda não foram realizados (data no futuro)
    @Query("SELECT a FROM Agendamento a WHERE a.dataHora > CURRENT_TIMESTAMP")
    List<Agendamento> findAgendamentosFuturos();
}