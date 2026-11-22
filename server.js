
// Servidor do Universo IA
// Protege a chave do Gemini e responde às perguntas do chat.

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;

const PUBLIC_FILES = {
  "/": "index.html",
  "/index.html": "index.html",
  "/css/style.css": "css/style.css",
  "/js/script.js": "js/script.js"
};

// Carrega a chave e outras configurações do arquivo .env.
function loadEnv() {
  const file = path.join(ROOT, ".env");

  if (!fs.existsSync(file)) return;

  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const position = line.indexOf("=");

    if (position < 1 || line.trim().startsWith("#")) continue;

    const key = line.slice(0, position).trim();
    const value = line.slice(position + 1).trim();

    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

// Envia respostas em formato JSON.
function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });

  res.end(JSON.stringify(data));
}

// Recebe a pergunta do usuário e consulta o Gemini.
async function chat(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, {
      error: "Método não permitido."
    });
  }

  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "COLE_SUA_CHAVE_AQUI"
  ) {
    return sendJson(res, 503, {
      error: "Configure a chave no arquivo .env."
    });
  }

  try {
    let raw = "";

    for await (const chunk of req) {
      raw += chunk.toString();

      if (raw.length > 5000) {
        return sendJson(res, 413, {
          error: "Mensagem muito grande."
        });
      }
    }

    const { message } = JSON.parse(raw);

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 1000
    ) {
      return sendJson(res, 400, {
        error: "Digite uma pergunta de até 1000 caracteres."
      });
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    const api = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text:
                  "Você é o assistente educativo do Universo IA, " +
                  "um projeto escolar sobre inteligência artificial generativa. " +

                  "Responda sempre em português do Brasil, " +
                  "de maneira simples, amigável e objetiva. " +

                  "Use frases curtas e exemplos do dia a dia. " +
                  "Evite termos técnicos difíceis. " +
                  "Quando forem necessários, explique-os de forma fácil. " +

                  "Prefira respostas de 3 a 5 frases, " +
                  "mas dê mais detalhes quando o usuário pedir. " +

                  "Ajude a compreender o que é IA generativa, " +
                  "como ela é usada, seus benefícios, limitações e riscos. " +

                  "Responda à pergunta feita, sem repetir avisos desnecessários. " +

                  "Se não souber algo, diga isso claramente. " +
                  "Não invente fatos, fontes nem referências. " +

                  "Quando for relevante, oriente a conferir informações " +
                  "importantes e a não compartilhar dados pessoais sensíveis."
              }
            ]
          },

          contents: [
            {
              role: "user",
              parts: [
                {
                  text: message.trim()
                }
              ]
            }
          ]
        }),

        signal: AbortSignal.timeout(25000)
      }
    );

    const data = await api.json();

    if (!api.ok) {
      return sendJson(res, 502, {
        error: "Gemini indisponível ou configuração inválida. Confira modelo, chave e limites."
      });
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("")
      .trim();

    return sendJson(res, 200, {
      reply: reply || "A IA não retornou texto. Tente outra pergunta."
    });

  } catch (error) {
    console.error("Erro no chat:", error.message);

    return sendJson(res, 500, {
      error: "Não foi possível processar a pergunta."
    });
  }
}

// Inicia o servidor do Universo IA.
const server = http.createServer((req, res) => {
  const pathname = (req.url || "").split("?")[0];

  if (pathname === "/api/chat") {
    return chat(req, res);
  }

  // Permite acesso somente aos arquivos públicos.
  const file = PUBLIC_FILES[pathname];

  if (!file || req.method !== "GET") {
    res.writeHead(404);
    return res.end("Não encontrado.");
  }

  const type = file.endsWith(".html")
    ? "text/html"
    : file.endsWith(".css")
      ? "text/css"
      : "text/javascript";

  fs.readFile(path.join(ROOT, file), (error, content) => {
    if (error) {
      res.writeHead(404);
      return res.end("Não encontrado.");
    }

    res.writeHead(200, {
      "Content-Type": `${type}; charset=utf-8`,
      "X-Content-Type-Options": "nosniff"
    });

    res.end(content);
  });
});

server.listen(
  Number(process.env.PORT) || 3000,
  () => console.log(
    "Universo IA: http://localhost:" +
    (process.env.PORT || 3000)
  )
);
