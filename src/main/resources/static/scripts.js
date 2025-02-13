document.addEventListener('DOMContentLoaded', function () {
    // Elementos comuns
    const mensagemConfirmacao = document.getElementById('mensagemConfirmacao');
    
    // Função para navegação entre páginas
    function navegarPara(pagina) {
        window.location.href = pagina;
    }

    // Função para mostrar mensagem de confirmação
    function mostrarConfirmacao() {
        if(mensagemConfirmacao) {
            mensagemConfirmacao.style.display = 'block';
            setTimeout(() => {
                if(mensagemConfirmacao) mensagemConfirmacao.style.display = 'none';
            }, 3000);
        }
    }

    // Client.html - Cadastro do Cliente
    if(window.location.pathname.includes('cliente.html')) {
        const clienteForm = document.getElementById('cadastroForm');
        
        if(clienteForm) {
            // Preencher com dados salvos
            const savedData = JSON.parse(localStorage.getItem('agendamento') || '{}');
            document.getElementById('nome').value = savedData.nome || '';
            document.getElementById('telefone').value = savedData.telefone || '';
            document.getElementById('email').value = savedData.email || '';

            clienteForm.onsubmit = function(e) {
                e.preventDefault();
                const clienteData = {
                    nome: document.getElementById('nome').value,
                    telefone: document.getElementById('telefone').value,
                    email: document.getElementById('email').value
                };
                localStorage.setItem('agendamento', JSON.stringify(clienteData));
                navegarPara('servico.html');
            };
        }
    }

    // Servico.html - Escolha do Serviço
    if(window.location.pathname.includes('servico.html')) {
        const servicoForm = document.getElementById('servicoForm');
        
        if(servicoForm) {
            // Preencher com dados salvos
            const savedData = JSON.parse(localStorage.getItem('agendamento') || '{}');
            document.getElementById('servico').value = savedData.servico || 'manicure';

            servicoForm.onsubmit = function(e) {
                e.preventDefault();
                const servicoData = {
                    ...JSON.parse(localStorage.getItem('agendamento')),
                    servico: document.getElementById('servico').value
                };
                localStorage.setItem('agendamento', JSON.stringify(servicoData));
                navegarPara('agendamento.html');
            };
        }
    }

    // Agendamento.html - Finalização
    if(window.location.pathname.includes('agendamento.html')) {
        const agendamentoForm = document.getElementById('agendamentoForm');
        const agendamentosList = document.getElementById('agendamentosList');

        // Carregar dados salvos
        const savedData = JSON.parse(localStorage.getItem('agendamento') || '{}');
        document.getElementById('dataHora').value = savedData.dataHora || '';

        // Carregar agendamentos
        function carregarAgendamentos() {
            fetch('/api/agendamentos')
                .then(response => response.json())
                .then(data => {
                    if(agendamentosList) {
                        agendamentosList.innerHTML = '';
                        data.forEach(agendamento => {
                            const li = document.createElement('li');
                            li.textContent = `Cliente: ${agendamento.cliente.nome}, Serviço: ${agendamento.servico.nome}, Data: ${new Date(agendamento.dataHora).toLocaleString()}`;
                            agendamentosList.appendChild(li);
                        });
                    }
                })
                .catch(error => console.error('Erro ao carregar agendamentos:', error));
        }

        if(agendamentoForm) {
            agendamentoForm.onsubmit = function(e) {
                e.preventDefault();
                
                const agendamentoData = {
                    ...JSON.parse(localStorage.getItem('agendamento')),
                    dataHora: document.getElementById('dataHora').value
                };

                // Salvar cliente
                fetch('/api/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: agendamentoData.nome,
                        telefone: agendamentoData.telefone,
                        email: agendamentoData.email
                    })
                })
                .then(response => response.json())
                .then(cliente => {
                    // Salvar serviço
                    return fetch('/api/servicos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nome: agendamentoData.servico
                        })
                    })
                    .then(response => response.json())
                    .then(servico => {
                        // Salvar agendamento
                        return fetch('/api/agendamentos', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                clienteId: cliente.id,
                                servicoId: servico.id,
                                dataHora: agendamentoData.dataHora
                            })
                        });
                    });
                })
                .then(response => response.json())
                .then(() => {
                    localStorage.removeItem('agendamento');
                    carregarAgendamentos();
                    mostrarConfirmacao();
                    setTimeout(() => navegarPara('confirmacao.html'), 3000);
                })
                .catch(error => console.error('Erro:', error));
            };

            carregarAgendamentos();
        }
    }
});