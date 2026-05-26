'use strict';

/*
 * Funcoes auxiliares de validacao usadas pelos formularios.
 * Este arquivo so define funcoes; quem chama elas sao
 * os scripts especificos de cada pagina (login, cadastro, etc).
 */

function emailValido(email) {
  // Regex bem simples: alguma coisa @ alguma coisa . alguma coisa
  const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return padrao.test(email);
}

function mostrarErro(input, mensagem) {
  // Adiciona uma mensagem de erro embaixo do campo e marca a borda em vermelho.
  const grupo = input.closest('.form-group');
  if (!grupo) return;
  let erro = grupo.querySelector('.mensagem-erro');
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
  form.querySelectorAll('.mensagem-erro').forEach(function (el) {
    el.remove();
  });
  form.querySelectorAll('.input-erro').forEach(function (el) {
    el.classList.remove('input-erro');
  });
}
