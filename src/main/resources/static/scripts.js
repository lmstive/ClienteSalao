document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('agendamentoForm');
    const agendamentosList = document.getElementById('agendamentosList');
    const mensagemConfirmacao = document.createElement('div'); // Criar a mensagem de confirmação
    mensagemConfirmacao.className = 'alert alert-success mt-3';
    mensagemConfirmacao.style.display = 'none';
    mensagemConfirmacao.textContent = 'Agendamento realizado com sucesso!';
    form.parentNode.appendChild(mensagemConfirmacao); // Adicionar ao DOM
  
    // Função para carregar agendamentos
    function carregarAgendamentos() {
        fetch('/api/agendamentos')
            .then(response => response.json())
            .then(data => {
                agendamentosList.innerHTML = ''; // Limpa a lista
                data.forEach(agendamento => {
                    const li = document.createElement('li');
                    li.textContent = `Cliente: ${agendamento.cliente.nome}, Serviço: ${agendamento.servico.nome}, Data: ${new Date(agendamento.dataHora).toLocaleString()}`;
                    agendamentosList.appendChild(li);
                });
            })
            .catch(error => console.error('Erro ao carregar agendamentos:', error));
    }
  
    // Enviar formulário de agendamento
    form.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const agendamento = {
            cliente: { nome: document.getElementById('nome').value },
            servico: { nome: document.getElementById('servico').value },
            dataHora: document.getElementById('dataHora').value
        };
  
        fetch('/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agendamento)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Agendamento criado:', data);
            carregarAgendamentos(); // Recarrega a lista de agendamentos
            form.reset(); // Limpa o formulário
  
            // Exibir mensagem de confirmação
            mensagemConfirmacao.style.display = 'block';
            setTimeout(() => {
                mensagemConfirmacao.style.display = 'none';
            }, 3000);
        })
        .catch(error => console.error('Erro ao criar agendamento:', error));
    });
  
    // Carrega os agendamentos ao carregar a página
    carregarAgendamentos();
  });
  