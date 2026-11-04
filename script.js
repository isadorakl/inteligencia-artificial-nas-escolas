const telaInicial = document.querySelector("#tela-inicial");
const jogo = document.querySelector("#jogo");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const progresso = document.querySelector("#progresso");
const nomeResultado = document.querySelector("#nome-resultado");

const nomes = [
  "Gabriel",
  "Mariana",
  "Rafaela",
  "Lucas",
  "Beatriz",
  "João",
  "Camila",
  "Pedro"
];

const perguntas = [
  {
    enunciado:
      "Em 2049, {nome} sai da escola e encontra uma inteligência artificial capaz de responder perguntas e criar imagens e áudios. Qual é o primeiro pensamento?",
    alternativas: [
      {
        texto: "Isso é assustador!",
        afirmacoes: [
          "No início, ficou com medo do que essa tecnologia poderia fazer.",
          "Achou assustador pensar na velocidade com que a tecnologia estava avançando."
        ]
      },
      {
        texto: "Isso é maravilhoso!",
        afirmacoes: [
          "Quis descobrir como usar a inteligência artificial no dia a dia.",
          "Pensou que a IA poderia ajudar em várias tarefas."
        ]
      }
    ]
  },
  {
    enunciado:
      "Na escola, {nome} descobre que a turma pode usar uma IA para ajudar em um projeto. O que decide fazer?",
    alternativas: [
      {
        texto: "Usar a IA como parceira de ideias.",
        afirmacoes: [
          "Usou a IA para organizar ideias, mas fez questão de dar sua própria contribuição.",
          "Percebeu que a tecnologia podia ajudar sem substituir a criatividade."
        ]
      },
      {
        texto: "Fazer o projeto sem a ajuda da IA.",
        afirmacoes: [
          "Preferiu confiar nas próprias pesquisas e no trabalho em equipe.",
          "Quis entender melhor o desafio antes de recorrer a uma ferramenta nova."
        ]
      }
    ]
  },
  {
    enunciado:
      "Um colega compartilha uma notícia impressionante, mas {nome} não sabe se ela é verdadeira. O que faz?",
    alternativas: [
      {
        texto: "Confere a informação em fontes confiáveis.",
        afirmacoes: [
          "Aprendeu a verificar as informações antes de compartilhá-las.",
          "Entendeu que imagens e textos convincentes também podem estar errados."
        ]
      },
      {
        texto: "Compartilha a notícia imediatamente.",
        afirmacoes: [
          "Depois, percebeu que era importante confirmar uma notícia antes de repassá-la.",
          "Descobriu que nem tudo o que parece real na internet é verdadeiro."
        ]
      }
    ]
  },
  {
    enunciado:
      "Mais tarde, {nome} recebe uma imagem criada por inteligência artificial que imita uma pessoa conhecida. Qual é sua atitude?",
    alternativas: [
      {
        texto: "Investiga quem criou a imagem e como ela foi feita.",
        afirmacoes: [
          "Passou a prestar mais atenção à origem das imagens que encontrava.",
          "Entendeu que era importante usar a tecnologia com responsabilidade e respeito."
        ]
      },
      {
        texto: "Acredita na imagem sem questionar.",
        afirmacoes: [
          "Com o tempo, percebeu que imagens também podem ser manipuladas.",
          "Aprendeu que vale a pena questionar o que vê antes de tirar conclusões."
        ]
      }
    ]
  },
  {
    enunciado:
      "Ao pensar no futuro, {nome} percebe que a inteligência artificial continuará evoluindo. O que espera desse futuro?",
    alternativas: [
      {
        texto: "Que a tecnologia ajude a resolver problemas importantes.",
        afirmacoes: [
          "Começou a imaginar maneiras de usar a tecnologia para ajudar pessoas.",
          "Acreditou que inovação e responsabilidade precisavam caminhar juntas."
        ]
      },
      {
        texto: "Que as pessoas aprendam a usar a tecnologia com cuidado.",
        afirmacoes: [
          "Percebeu que conhecer os limites da tecnologia era tão importante quanto conhecê-la.",
          "Passou a defender escolhas conscientes no uso da inteligência artificial."
        ]
      }
    ]
  }
];

let nome;
let perguntaAtual;
let historia;

function iniciarJogo() {
  nome = nomes[Math.floor(Math.random() * nomes.length)];
  perguntaAtual = 0;
  historia = [];

  telaInicial.hidden = true;
  caixaResultado.hidden = true;
  jogo.hidden = false;

  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];

  progresso.textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

  caixaPerguntas.textContent = pergunta.enunciado.replaceAll("{nome}", nome);
  caixaAlternativas.replaceChildren();

  pergunta.alternativas.forEach((alternativa) => {
    const botao = document.createElement("button");
    botao.textContent = alternativa.texto;
    botao.addEventListener("click", () => escolherAlternativa(alternativa));
    caixaAlternativas.appendChild(botao);
  });
}

function escolherAlternativa(alternativa) {
  const afirmacao =
    alternativa.afirmacoes[
      Math.floor(Math.random() * alternativa.afirmacoes.length)
    ];

  historia.push(afirmacao);
  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  jogo.hidden = true;
  caixaResultado.hidden = false;
  nomeResultado.textContent = nome;

  textoResultado.textContent =
    `Em 2049, ${nome} viveu uma jornada cheia de descobertas. ` +
    historia.join(" ") +
    " Ao final, percebeu que o futuro da inteligência artificial também depende das escolhas das pessoas.";
}

function reiniciarJogo() {
  caixaResultado.hidden = true;
  telaInicial.hidden = false;
}

document
  .querySelector("#botao-iniciar")
  .addEventListener("click", iniciarJogo);

document
  .querySelector("#botao-reiniciar")
  .addEventListener("click", reiniciarJogo);
