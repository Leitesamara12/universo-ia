# DOCUMENTAÇÃO — UNIVERSO IA

**Projeto Integrador — IA Generativa: Possibilidades, Benefícios e Riscos**  
**Autor(a):** Samara Leite  
**Data:** 25/11/2026

## 1. Ideia, objetivo e público-alvo

O **Universo IA** é um site educativo com visual futurista que apresenta o que é inteligência artificial generativa, exemplos de uso, benefícios e riscos. Foi pensado para pessoas iniciantes que querem conhecer a tecnologia com segurança. Em vez de oferecer apenas leitura, ele ensina por meio de dois jogos: um quiz e o Mito ou Verdade. Há ainda um chat educativo opcional com Gemini.

## 2. Funcionalidades

- **Explorar IA:** textos simples explicam IA generativa, geração de textos, imagens, códigos e áudios; produtividade, aprendizagem e criatividade; erros, vieses, privacidade e dependência.
- **Quiz:** seis perguntas de múltipla escolha, resposta comentada, contagem de acertos, resultado final e reinício.
- **Mito ou Verdade:** cinco afirmações, feedback explicativo, contagem de acertos e reinício.
- **Chat educativo:** envia uma pergunta para o Gemini quando o servidor está ativo e possui chave local. O chat é um recurso extra: o restante do projeto funciona sem ele.
- **Menu responsivo:** permite navegar no celular.

## 3. Organização dos arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura e conteúdo do site, seções, botões e formulário. |
| `css/style.css` | Aparência futurista, responsividade, cores e animações. |
| `js/script.js` | Perguntas, regras, funções, pontuação, eventos, DOM e chat. |
| `server.js` | Servidor Node.js opcional para conectar Gemini mantendo a chave fora do navegador. |
| `package.json` | Comando `npm start`. |
| `.env.example` | Exemplo sem chave real, para criar a configuração privada. |
| `.gitignore` | Evita que `.env` seja versionado acidentalmente. |
| `README.md` | Instruções de execução e configuração. |

## 4. Dados e estruturas

**Array de objetos:** `quizQuestions` reúne as seis perguntas. Cada objeto contém `question` (enunciado), `hint` (dica), `answers` (alternativas), `correct` (índice da alternativa correta) e `explanation` (explicação). `mythStatements` reúne cinco objetos com `text`, `answer` (booleano) e `explanation`.

**Variáveis de estado:** `quizIndex` e `mythIndex` indicam a posição atual; `quizScore` e `mythScore` contam acertos; `quizAnswered` e `mythAnswered` impedem respostas repetidas; `chatIsBusy` impede envios simultâneos. A aplicação não precisa de banco de dados nem de `localStorage`.

**Métodos de array:** `forEach()` percorre as alternativas para criar botões e percorre os botões do jogo Mito ou Verdade. No servidor, `map()` reúne partes da resposta da IA.

**Atalho `$`:** `const $ = seletor => document.querySelector(seletor)` é uma função simples para buscar um elemento sem repetir `document.querySelector` várias vezes. Exemplo: `$("#quiz-question")` procura o elemento com esse ID.

## 5. Funções principais

| Função | Entrada | O que faz |
|---|---|---|
| `renderQuizQuestion()` | Estado do quiz | Mostra pergunta, dica, alternativas e progresso, criando botões no DOM. |
| `selectQuizAnswer(selectedIndex)` | Número da opção escolhida | Confere com `correct`, soma ponto quando correto e mostra feedback. |
| `nextQuizStep()` | Estado do quiz | Avança ou exibe o resultado final. |
| `restartQuiz()` | Nenhuma | Zera índice e pontuação e reinicia. |
| `renderMyth()` | Estado do jogo | Mostra afirmação, progresso e libera os botões. |
| `answerMyth(userAnswer)` | `true` ou `false` | Compara com `answer`, atualiza acertos e mostra explicação. |
| `nextMyth()` | Estado do jogo | Avança ou mostra o resultado. |
| `restartMyth()` | Nenhuma | Reinicia o jogo. |
| `addChatMessage(text, sender)` | Texto e remetente | Cria uma bolha de mensagem e adiciona ao DOM. |
| `sendChatMessage(messageText)` | Texto digitado | Valida, faz a chamada à API local e mostra a resposta ou erro. |
| `loadEnv()` (servidor) | Arquivo local `.env` | Lê as variáveis privadas de configuração. |
| `chat(req, res)` (servidor) | Requisição HTTP | Valida a pergunta, consulta Gemini e devolve JSON. |

## 6. Eventos e manipulação do DOM

- `querySelector()` localiza elementos existentes por ID ou classe, inclusive por meio do atalho `$`.
- `createElement()` cria botões de resposta e mensagens do chat.
- `textContent` muda perguntas, feedback e pontuação sem recarregar a página.
- `classList` adiciona/remove classes como `hidden`, `correct` e `wrong`.
- `addEventListener('click', ...)` responde aos botões de jogar, avançar, reiniciar e abrir menu.
- `addEventListener('submit', ...)` evita recarregamento do formulário e envia a pergunta ao chat.

**Exemplo de fluxo:** o usuário clica na alternativa → o evento chama `selectQuizAnswer()` → a função compara com a resposta correta → muda a pontuação e as classes dos botões → a tela mostra o feedback.

## 7. Regras, validações e tratamento de problemas

- `if` impede responder duas vezes à mesma pergunta.
- O botão **Próxima** fica bloqueado até que exista resposta.
- Acertos aumentam o placar; erros exibem explicação, sem ponto.
- O formulário do chat recusa texto vazio ou com mais de 1000 caracteres.
- `try/catch` informa falhas de comunicação com o Gemini em vez de travar a interface.
- O servidor entrega **somente** os três arquivos públicos e `index.html`, impedindo acesso ao `.env`.
- A chave da API fica localmente no `.env`, fora do ZIP de entrega.

## 8. Fluxo de uso

1. Acessar a página e ler o conteúdo introdutório.
2. Ver exemplos de uso, benefícios e riscos.
3. Responder às seis perguntas do quiz e conferir o resultado.
4. Participar do Mito ou Verdade e revisar as explicações.
5. Opcionalmente, enviar uma pergunta no chat.

## 9. Uso de IA durante o desenvolvimento

**Texto-base para adaptar ao seu trabalho real:** “Utilizei uma ferramenta de IA para apoiar o planejamento, sugerir a identidade visual, estruturar trechos de código e revisar a documentação. Revisei o conteúdo educativo e executei testes nas funcionalidades do quiz, Mito ou Verdade e chat. Mantive as regras e os dados em JavaScript puro e estudei o funcionamento de cada função para poder explicá-los e alterá-los durante a apresentação.”


## 10. Autoavaliação obrigatória — respostas-modelo para adaptar

**1. Por que usei essas estruturas?** Usei arrays de objetos porque cada pergunta tem vários campos relacionados. Usei condicionais para conferir respostas, funções para dividir responsabilidades e laços para criar várias opções sem repetir código.

**2. Sei explicar cada função?** `renderQuizQuestion` exibe a pergunta; `selectQuizAnswer` corrige a resposta; `nextQuizStep` avança; `restartQuiz` reinicia. As funções do Mito ou Verdade seguem a mesma lógica. O chat valida a mensagem e exibe o retorno.

**3. Como manipulo os dados?** Os dados estão nos arrays no `script.js`. O índice escolhe qual objeto será exibido. A pontuação é incrementada nos acertos, e o DOM é atualizado com `textContent` e `classList`. Para adicionar uma pergunta, incluo outro objeto no array.

**4. Qual problema encontrei e como corrigi?:** o servidor podia disponibilizar o arquivo privado `.env`. Alterei o servidor para liberar somente arquivos públicos, evitando que a chave fosse acessada pela URL. Testei esse bloqueio com requisições HTTP.

**5. O que consigo modificar sozinho?** Consigo alterar enunciados e alternativas nos arrays, definir outra resposta correta com `correct`, mudar textos e ajustar as cores no CSS. A IA foi apoio para revisar a implementação, mas preciso conferir o resultado no navegador.

