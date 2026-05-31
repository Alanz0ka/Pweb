'use strict';

/*
 * Tema claro / escuro.
 * Carregado em todas as paginas. Le e grava a preferencia
 * no localStorage com a chave 'tema'.
 */

var CHAVE_TEMA = 'tema';

function temaSalvo() {
  // Le o tema do localStorage. Se nao tiver nada, usa 'claro'.
  var valor = localStorage.getItem(CHAVE_TEMA);
  if (valor === 'escuro') return 'escuro';
  return 'claro';
}

function aplicarTema(tema) {
  // Adiciona ou remove a classe no <html> para o CSS pegar.
  if (tema === 'escuro') {
    document.documentElement.classList.add('tema-escuro');
  } else {
    document.documentElement.classList.remove('tema-escuro');
  }
  atualizarBotaoTema(tema);
  atualizarCardsTema(tema);
}

function salvarTema(tema) {
  localStorage.setItem(CHAVE_TEMA, tema);
  aplicarTema(tema);
}

function trocarTema() {
  var novo = 'escuro';
  if (temaSalvo() === 'escuro') novo = 'claro';
  salvarTema(novo);
}

function atualizarBotaoTema(tema) {
  var botao = document.getElementById('btn-tema');
  if (!botao) return;
  var label = botao.querySelector('.label-tema');
  if (label) {
    if (tema === 'escuro') {
      label.textContent = 'Modo claro';
    } else {
      label.textContent = 'Modo escuro';
    }
  }
  if (tema === 'escuro') {
    botao.setAttribute('aria-pressed', 'true');
  } else {
    botao.setAttribute('aria-pressed', 'false');
  }
}

function atualizarCardsTema(tema) {
  // Usado na pagina de configuracoes para marcar qual card esta ativo.
  var cards = document.querySelectorAll('.card-tema');
  var i;

  for (i = 0; i < cards.length; i++) {
    var card = cards[i];
    var valor = card.getAttribute('data-tema');
    var status = card.querySelector('.theme-status');
    if (valor === tema) {
      card.classList.add('selected-theme');
      if (status) status.textContent = 'Ativo';
    } else {
      card.classList.remove('selected-theme');
      if (status) status.textContent = 'Selecionar';
    }
  }
}

function configurarTema() {
  var botao = document.getElementById('btn-tema');
  if (botao) {
    botao.addEventListener('click', trocarTema);
  }
  var cards = document.querySelectorAll('.card-tema');
  var i;
  for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
      salvarTema(this.getAttribute('data-tema'));
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  aplicarTema(temaSalvo());
  configurarTema();
});
