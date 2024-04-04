// Array de participantes
let participantes = [
  {
    nome: "Mayk Brito",
    email: "Mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: null
  },
  {
    nome: "Fulano de Tal",
    email: "fulano@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckin: new Date(2024, 2, 25, 23, 30)
  },
  {
    nome: "Ciclano da Silva",
    email: "ciclano@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 15, 45),
    dataCheckin: null
  },
  {
    nome: "Beltrano Oliveira",
    email: "beltrano@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 8, 0),
    dataCheckin: new Date(2024, 2, 26, 18, 45)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 14, 20),
    dataCheckin: new Date(2024, 2, 27, 20, 0)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 11, 10),
    dataCheckin: null
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 16, 40),
    dataCheckin: new Date(2024, 2, 29, 9, 15)
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 13, 5),
    dataCheckin: null
  },
  {
    nome: "Lucas Souza",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 9, 30),
    dataCheckin: new Date(2024, 3, 1, 14, 10)
  },
  {
    nome: "Carla Santos",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 17, 15),
    dataCheckin: new Date(2024, 3, 2, 22, 45)
  }
];

// Função para criar novo participante na lista
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin);

  // Condicional para botão de check-in
  if (participante.dataCheckin == null) {
    dataCheckin = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `;
  }

  // Retornar estrutura HTML para um participante
  return ` 
    <tr>
      <td>
        <strong>${participante.nome}</strong><br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckin}</td>
    </tr>`;
};

// Função para atualizar lista de participantes no HTML
const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output += criarNovoParticipante(participante);
  }
  document.querySelector('tbody').innerHTML = output;
};

// Inicializar lista de participantes no HTML
atualizarLista(participantes);

// Função para adicionar novo participante
const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosdoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosdoFormulario.get('nome'),
    email: dadosdoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null 
  };

  // Verificar se o participante já existe
  const participanteExiste = participantes.find(p => p.email === participante.email);

  if (participanteExiste) {
    alert('Email já cadastrado!');
    return;
  }

  // Adicionar novo participante e atualizar lista
  participantes.unshift(participante);
  atualizarLista(participantes);

  // Limpar formulário
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

// Função para fazer check-in de participante
const fazerCheckIn = (event) => {
  // Confirmar check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?';
  if (!confirm(mensagemConfirmacao)) {
    return;
  }

  // Encontrar participante na lista
  const participante = participantes.find(p => p.email === event.target.dataset.email);
  
  // Atualizar data de check-in
  participante.dataCheckin = new Date();

  // Atualizar lista de participantes
  atualizarLista(participantes);
};
