'use strict';

/*
 * Funcoes auxiliares de validacao usadas pelos formularios.
 * Este arquivo so define funcoes; quem chama elas sao
 * os scripts especificos de cada pagina (login, cadastro, etc).
 */

function emailValido(email) {
  // Confere se existe texto antes e depois do @ e do ultimo ponto.
  var texto = email.trim();
  var primeiroArroba = texto.indexOf('@');
  var ultimoArroba = texto.lastIndexOf('@');
  var ultimoPonto = texto.lastIndexOf('.');

  if (texto.indexOf(' ') !== -1) return false;
  if (primeiroArroba <= 0 || primeiroArroba !== ultimoArroba) return false;
  if (ultimoPonto <= primeiroArroba + 1) return false;
  if (ultimoPonto >= texto.length - 1) return false;
  return true;
}

function mostrarErro(input, mensagem) {
  // Adiciona uma mensagem de erro embaixo do campo e marca a borda em vermelho.
  var grupo = input.parentElement;
  if (!grupo) return;
  var erro = grupo.querySelector('.mensagem-erro');
  if (!erro) {
    erro = document.createElement('p');
    erro.className = 'mensagem-erro';
    grupo.appendChild(erro);
  }
  erro.textContent = mensagem;
  input.classList.add('input-erro');
}

function limparErros(form) {
  // Remove qualquer erro antigo antes de validar de novo.
  var mensagens = form.querySelectorAll('.mensagem-erro');
  var campos = form.querySelectorAll('.input-erro');
  var i;

  for (i = 0; i < mensagens.length; i++) {
    mensagens[i].remove();
  }
  for (i = 0; i < campos.length; i++) {
    campos[i].classList.remove('input-erro');
  }
}
