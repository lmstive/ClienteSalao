package br.com.salao.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter // Gera getters automaticamente
@Setter // Gera setters automaticamente
@NoArgsConstructor // Gera um construtor sem argumentos
@AllArgsConstructor // Gera um construtor com todos os argumentos
@EqualsAndHashCode(of = "id") // Gera equals e hashCode com base no campo "id"
@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String telefone;
    private String email;

    @OneToMany(mappedBy = "cliente")
    private List<Agendamento> agendamentos;
}