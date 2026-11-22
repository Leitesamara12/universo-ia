@echo off
setlocal
cd /d "%~dp0"
title Universo IA - Inicializador
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo NODE.JS NAO ENCONTRADO.
  echo Instale Node.js LTS em https://nodejs.org/
  echo Para abrir somente o site e os jogos, use ABRIR_SEM_CHAT.bat
  echo.
  pause
  exit /b 1
)
echo Iniciando o servidor local do Universo IA...
start "Universo IA - Servidor" cmd /k "cd /d ""%~dp0"" && node server.js"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000"
echo Se o navegador nao abrir, acesse http://localhost:3000
echo Mantenha a janela do servidor aberta enquanto usa o chat.
pause
