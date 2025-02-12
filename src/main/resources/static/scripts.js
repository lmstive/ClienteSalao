document.addEventListener('DOMContentLoaded', function () {
    const clienteForm = document.getElementById('cadastroForm');
    const servicoForm = document.getElementById('servicoForm');
    const agendamentoForm = document.getElementById('agendamentoForm');
    const agendamentosList = document.getElementById('agendamentosList');

    const mensagemConfirmacao = document.createElement('div');
    mensagemConfirmacao.className = 'alert alert-success mt-3';
    mensagemConfirmacao.style.display = 'none';
    mensagemConfirmacao.textContent = 'Agendamento realizado com sucesso!';
    agendamentoForm.parentNode.appendChild(mensagemConfirmacao);

    function proximaEtapa(etapa) {
        document.getElementById('etapa1').style.display = (etapa === 1) ? 'block' : 'none';
        document.getElementById('etapa2').style.display = (etapa === 2) ? 'block' : 'none';
        document.getElementById('etapa3').style.display = (etapa === 3) ? 'block' : 'none';
    }

    function carregarAgendamentos() {
        fetch('/api/agendamentos')
            .then(response => response.json())
            .then(data => {
                agendamentosList.innerHTML = ''; 
                data.forEach(agendamento => {
                    const li = document.createElement('li');
                    li.textContent = `Cliente: ${agendamento.cliente.nome}, Serviço: ${agendamento.servico.nome}, Data: ${new Date(agendamento.dataHora).toLocaleString()}`;
                    agendamentosList.appendChild(li);
                });
            })
            .catch(error => console.error('Erro ao carregar agendamentos:', error));
    }

    function salvarCliente(cliente) {
        return fetch('/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        }).then(response => response.json());
    }

    function salvarServico(servico) {
        return fetch('/api/servicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servico)
        }).then(response => response.json());
    }

    agendamentoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cliente = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value
        };

        const servico = {
            nome: document.getElementById('servico').value
        };

        const dataHora = document.getElementById('dataHora').value;

        salvarCliente(cliente).then(clienteSalvo => {
            return salvarServico(servico).then(servicoSalvo => {
                const agendamento = {
                    clienteId: clienteSalvo.id, // Envia apenas o ID do cliente salvo
                    servicoId: servicoSalvo.id, // Envia apenas o ID do serviço salvo
                    dataHora: dataHora
                };

                return fetch('/api/agendamentos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(agendamento)
                });
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Agendamento criado:', data);
            carregarAgendamentos();
            clienteForm.reset();
            servicoForm.reset();
            agendamentoForm.reset();

            mensagemConfirmacao.style.display = 'block';
            setTimeout(() => {
                mensagemConfirmacao.style.display = 'none';
                proximaEtapa(1);
            }, 3000);
        })
        .catch(error => console.error('Erro ao criar agendamento:', error));
    });

    carregarAgendamentos();
    window.proximaEtapa = proximaEtapa;
});