# Universo IA — versão simplificada

Aplicação educativa em **HTML, CSS e JavaScript puro**, com quiz (6 questões), Mito ou Verdade (5 afirmações) e chat Gemini opcional. A identidade visual futurista foi mantida.

## Como abrir

**No Windows (mais fácil):** extraia o ZIP e use `ABRIR_SEM_CHAT.bat` para abrir o site e os jogos. Para usar o chat, configure `.env` e clique em `INICIAR_UNIVERSO_IA.bat` (Node.js necessário). Consulte `COMO_ABRIR_NO_WINDOWS.txt`.


**Sem chat:** abra `index.html` no navegador. O conteúdo e os dois jogos funcionam sem Node.js.

**Com chat:** instale Node.js 18+ (recomendado Node.js 20+), abra um terminal nesta pasta, rode `npm start` e acesse `http://localhost:3000`.

## Onde guardar a chave da API?

1. **Revogue a chave antiga** no Google AI Studio, já que ela esteve dentro de um ZIP compartilhado.
2. Crie uma nova chave em https://aistudio.google.com/apikey .
3. Faça uma **cópia** do arquivo `.env.example` nesta pasta e chame a cópia de `.env`.
4. No `.env`, substitua `COLE_SUA_CHAVE_AQUI` pela chave nova, sem aspas.
5. Execute `npm start` e abra `http://localhost:3000`.

Exemplo de configuração, **sem chave verdadeira**:
```env
GEMINI_API_KEY=COLE_SUA_CHAVE_AQUI
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```
O `.env` permanece **somente em seu computador**: não envie no ZIP, não faça upload para GitHub e não cole a chave no HTML ou JavaScript. A lista de arquivos públicos em `server.js` impede que o navegador baixe o `.env`. Mesmo assim, mantenha o servidor somente em ambiente de desenvolvimento ou implante com cuidados adicionais de segurança.

Se o modelo não estiver disponível na sua conta, altere `GEMINI_MODEL` para um modelo habilitado no AI Studio. O chat requer acesso à internet e cota válida; as outras partes funcionam offline.

## Pastas e arquivos

```text
universo-ia/
├── index.html
├── css/style.css
├── js/script.js
├── server.js
├── package.json
├── .env.example          # apenas exemplo, sem segredo
├── .gitignore
├── DOCUMENTACAO.md
└── README.md
```

## O que estudar para a apresentação

Leia `DOCUMENTACAO.md` e `GUIA_APRESENTACAO.md`. Saiba localizar `quizQuestions`, `mythStatements`, `renderQuizQuestion`, `selectQuizAnswer`, `answerMyth`, `addEventListener`, `createElement` e as validações. No quiz, você consegue demonstrar uma alteração rápida modificando uma pergunta e atualizando a página.
