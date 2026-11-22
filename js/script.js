// UNIVERSO IA — código simplificado e dividido em 4 partes.
// $ seleciona um elemento da página pelo ID ou classe.
const $ = seletor => document.querySelector(seletor);

// PARTE 1 — PERGUNTAS DO QUIZ (array de objetos)
const quizQuestions = [
  {
    question: "O que a IA generativa faz?",
    hint: "Pense no que a IA pode criar.",
    answers: ["Ela apenas armazena arquivos", "Ela cria conteúdos a partir de padrões aprendidos", "Ela funciona sem dados", "Ela substitui toda decisão humana"],
    correct: 1,
    explanation: "Isso! Ela usa padrões aprendidos para criar textos, imagens e códigos."
  },
  {
    question: "Qual destas opções é um exemplo de uso da IA generativa?",
    hint: "Escolha uma atividade em que a tecnologia produz algo.",
    answers: ["Desligar o computador", "Aumentar a memória física", "Criar um resumo de um texto", "Trocar uma peça do teclado"],
    correct: 2,
    explanation: "Isso! A IA pode resumir textos, mas você deve conferir o resumo."
  },
  {
    question: "O que é um prompt?",
    hint: "É a instrução que você fornece à ferramenta.",
    answers: ["Uma instrução ou pergunta enviada à IA", "Um tipo de antivírus", "Uma peça do computador", "O nome de um banco de dados"],
    correct: 0,
    explanation: "Isso! Prompt é a pergunta ou instrução que damos à IA."
  },
  {
    question: "Por que devemos conferir respostas geradas por IA?",
    hint: "Pense nas limitações da tecnologia.",
    answers: ["Porque toda resposta é criptografada", "Porque a IA não entende perguntas", "Porque respostas são sempre antigas", "Porque ela pode gerar informações incorretas"],
    correct: 3,
    explanation: "Isso! A IA pode errar, mesmo quando parece ter certeza."
  },
  {
    question: "Qual atitude ajuda a proteger sua privacidade ao usar IA?",
    hint: "Pense no que não deve ser compartilhado.",
    answers: ["Enviar suas senhas", "Evitar compartilhar dados pessoais e confidenciais", "Enviar documentos bancários", "Compartilhar dados de outras pessoas"],
    correct: 1,
    explanation: "Isso mesmo. Não compartilhe senhas, documentos, dados bancários ou informações confidenciais."
  },
  {
    question: "Qual é a melhor forma de usar IA no aprendizado?",
    hint: "A ferramenta deve apoiar seu desenvolvimento.",
    answers: ["Copiar tudo sem ler", "Parar de estudar", "Usar como apoio e revisar o que ela produz", "Acreditar em qualquer resposta"],
    correct: 2,
    explanation: "Isso! Use a IA para estudar, mas confira e entenda as respostas."
  }
];

// Guarda a pergunta atual, os acertos e se já houve resposta.
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuizQuestion() {
  const pergunta = quizQuestions[quizIndex];
  quizAnswered = false;
  $("#quiz-content").classList.remove("hidden");
  $("#quiz-result").classList.add("hidden");
  $("#quiz-question").textContent = pergunta.question;
  $("#quiz-hint").textContent = pergunta.hint;
  $("#quiz-counter").textContent = `PERGUNTA ${quizIndex + 1} / ${quizQuestions.length}`;
  $("#quiz-progress").style.width = `${quizIndex / quizQuestions.length * 100}%`;
  $("#quiz-score-live").textContent = `PONTOS: ${quizScore}`;
  $("#quiz-feedback").textContent = "";
  $("#quiz-feedback").className = "quiz-feedback";
  $("#quiz-next").disabled = true;
  $("#quiz-next").textContent = quizIndex === quizQuestions.length - 1 ? "Ver resultado →" : "Próxima pergunta →";

  // Cria um botão para cada alternativa.
  $("#quiz-answers").innerHTML = "";
  pergunta.answers.forEach((resposta, indice) => {
    const botao = document.createElement("button");
    botao.className = "answer-option";
    botao.type = "button";
    botao.textContent = `${indice + 1}. ${resposta}`;
    botao.addEventListener("click", () => selectQuizAnswer(indice));
    $("#quiz-answers").appendChild(botao);
  });
}

function selectQuizAnswer(indice) {
  if (quizAnswered) return; // impede duas respostas
  quizAnswered = true;
  const pergunta = quizQuestions[quizIndex];
  const acertou = indice === pergunta.correct;
  if (acertou) quizScore++;

  document.querySelectorAll(".answer-option").forEach((botao, i) => {
    botao.disabled = true;
    if (i === pergunta.correct) botao.classList.add("correct");
    if (i === indice && !acertou) botao.classList.add("wrong");
  });
  const feedback = $("#quiz-feedback");
  feedback.textContent = `${acertou ? "✓ Resposta correta!" : "Não foi dessa vez."} ${pergunta.explanation}`;
  feedback.className = `quiz-feedback ${acertou ? "good" : "bad"}`;
  $("#quiz-score-live").textContent = `PONTOS: ${quizScore}`;
  $("#quiz-next").disabled = false;
}

function nextQuizStep() {
  if (!quizAnswered) return;
  quizIndex++;
  if (quizIndex < quizQuestions.length) return renderQuizQuestion();
  $("#quiz-content").classList.add("hidden");
  $("#quiz-result").classList.remove("hidden");
  $("#quiz-progress").style.width = "100%";
  $("#quiz-counter").textContent = "MISSÃO CONCLUÍDA";
  $("#quiz-final-score").textContent = `${quizScore}/${quizQuestions.length}`;
  if (quizScore === quizQuestions.length) {
    $("#quiz-result-title").textContent = "Explorador nível máximo!";
    $("#quiz-result-text").textContent = "Você acertou todas as perguntas. Continue usando a tecnologia com curiosidade e pensamento crítico.";
  } else if (quizScore >= 4) {
    $("#quiz-result-title").textContent = "Muito bem, explorador!";
    $("#quiz-result-text").textContent = "Você já conhece bastante sobre IA generativa. Revise os temas e continue aprendendo.";
  } else {
    $("#quiz-result-title").textContent = "Sua jornada começou!";
    $("#quiz-result-text").textContent = "Que tal explorar novamente os conteúdos da página e tentar mais uma vez?";
  }
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

$("#quiz-next").addEventListener("click", nextQuizStep);
$("#quiz-restart").addEventListener("click", restartQuiz);
renderQuizQuestion();

// PARTE 2 — MITO OU VERDADE (array de objetos)
const mythStatements = [
  { text: "A inteligência artificial sempre fornece respostas corretas.", answer: false, explanation: "É MITO. A IA pode errar, inventar informações ou apresentar respostas imprecisas." },
  { text: "A IA generativa pode criar imagens a partir de descrições em texto.", answer: true, explanation: "É VERDADE. Algumas ferramentas transformam descrições escritas em imagens." },
  { text: "É seguro enviar senhas e dados bancários para qualquer ferramenta de IA.", answer: false, explanation: "É MITO. Nunca compartilhe senhas, dados bancários ou informações confidenciais." },
  { text: "A IA pode reproduzir vieses presentes nos dados usados em seu treinamento.", answer: true, explanation: "É VERDADE. A IA pode repetir preconceitos que aparecem nos dados usados para treiná-la." },
  { text: "O conteúdo criado por IA não precisa ser revisado por uma pessoa.", answer: false, explanation: "É MITO. Uma pessoa deve conferir se o conteúdo está correto antes de usar." }
];

let mythIndex = 0;
let mythScore = 0;
let mythAnswered = false;

function renderMyth() {
  const frase = mythStatements[mythIndex];
  mythAnswered = false;
  $("#myth-play").classList.remove("hidden");
  $("#myth-result").classList.add("hidden");
  $("#myth-number").textContent = mythIndex + 1;
  $("#myth-statement").textContent = frase.text;
  $("#myth-score").textContent = `ACERTOS: ${mythScore}`;
  $("#myth-progress-label").textContent = `${mythIndex + 1} DE ${mythStatements.length}`;
  $("#myth-progress-fill").style.width = `${(mythIndex + 1) / mythStatements.length * 100}%`;
  $("#myth-feedback").textContent = "";
  $("#myth-feedback").className = "myth-feedback";
  $("#myth-next").disabled = true;
  document.querySelectorAll(".myth-option").forEach(botao => botao.disabled = false);
}

function answerMyth(resposta) {
  if (mythAnswered) return;
  mythAnswered = true;
  const frase = mythStatements[mythIndex];
  const acertou = resposta === frase.answer;
  if (acertou) mythScore++;
  $("#myth-score").textContent = `ACERTOS: ${mythScore}`;
  $("#myth-feedback").textContent = `${acertou ? "✓ Acertou!" : "✕ Não foi dessa vez."} ${frase.explanation}`;
  $("#myth-feedback").className = `myth-feedback ${acertou ? "good" : "bad"}`;
  document.querySelectorAll(".myth-option").forEach(botao => botao.disabled = true);
  $("#myth-next").disabled = false;
  $("#myth-next").textContent = mythIndex === mythStatements.length - 1 ? "Ver resultado →" : "Próxima afirmação →";
}

function nextMyth() {
  if (!mythAnswered) return;
  mythIndex++;
  if (mythIndex < mythStatements.length) return renderMyth();
  $("#myth-play").classList.add("hidden");
  $("#myth-result").classList.remove("hidden");
  $("#myth-result-text").textContent = `Você acertou ${mythScore} de ${mythStatements.length} afirmações. Continue questionando e verificando as informações!`;
}

function restartMyth() {
  mythIndex = 0;
  mythScore = 0;
  renderMyth();
}

document.querySelectorAll(".myth-option").forEach(botao => {
  botao.addEventListener("click", () => answerMyth(botao.dataset.answer === "true"));
});
$("#myth-next").addEventListener("click", nextMyth);
$("#myth-restart").addEventListener("click", restartMyth);
renderMyth();

// PARTE 3 — MENU NO CELULAR
$("#menu-toggle").addEventListener("click", () => {
  const aberto = $("#main-nav").classList.toggle("open");
  $("#menu-toggle").textContent = aberto ? "✕" : "☰";
  $("#menu-toggle").setAttribute("aria-expanded", String(aberto));
});
document.querySelectorAll("#main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    $("#main-nav").classList.remove("open");
    $("#menu-toggle").textContent = "☰";
    $("#menu-toggle").setAttribute("aria-expanded", "false");
  });
});

// PARTE 4 — CHAT OPCIONAL COM IA
let chatIsBusy = false;

function addChatMessage(texto, quem) {
  const mensagem = document.createElement("div");
  mensagem.className = `message ${quem === "user" ? "user-message" : "assistant-message"}`;
  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = quem === "user" ? "●" : "✳";
  const bolha = document.createElement("div");
  bolha.className = "message-bubble";
  const paragrafo = document.createElement("p");
  paragrafo.textContent = texto; // textContent impede interpretar HTML digitado
  bolha.appendChild(paragrafo);
  mensagem.append(avatar, bolha);
  $("#chat-messages").appendChild(mensagem);
  $("#chat-messages").scrollTop = $("#chat-messages").scrollHeight;
  return mensagem;
}

async function sendChatMessage(texto) {
  const pergunta = texto.trim();
  if (!pergunta || pergunta.length > 1000 || chatIsBusy) return;
  chatIsBusy = true;
  $(".send-button").disabled = true;
  $("#chat-input").disabled = true;
  addChatMessage(pergunta, "user");
  $("#chat-input").value = "";
  const aguardando = addChatMessage("Consultando a IA...", "assistant");

  try {
    const resposta = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: pergunta })
    });
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.error || "Falha ao consultar a IA.");
    aguardando.querySelector("p").textContent = dados.reply;
  } catch (erro) {
    aguardando.querySelector("p").textContent = `Não foi possível responder: ${erro.message}. Confira se o servidor está ativo.`;
  } finally {
    chatIsBusy = false;
    $(".send-button").disabled = false;
    $("#chat-input").disabled = false;
    $("#chat-input").focus();
  }
}

$("#chat-form").addEventListener("submit", evento => {
  evento.preventDefault();
  const texto = $("#chat-input").value;
  if (!texto.trim() || texto.length > 1000) {
    $("#chat-input").setCustomValidity(texto.trim() ? "Máximo de 1000 caracteres." : "Digite uma pergunta.");
    $("#chat-input").reportValidity();
    $("#chat-input").setCustomValidity("");
    return;
  }
  sendChatMessage(texto);
});

document.querySelectorAll(".suggestion-chip").forEach(botao => {
  botao.addEventListener("click", () => sendChatMessage(botao.textContent));
});
