'use strict';

/*
 * Tema claro / escuro.
 * Carregado em todas as paginas. Le e grava a preferencia
 * no localStorage com a chave 'tema'.
 */

const CHAVE_TEMA = 'tema';

function temaSalvo() {
  // Le o tema do localStorage. Se nao tiver nada, usa 'claro'.
  const valor = localStorage.getItem(CHAVE_TEMA);
  return valor === 'escuro' ? 'escuro' : 'claro';
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
  const novo = temaSalvo() === 'escuro' ? 'claro' : 'escuro';
  salvarTema(novo);
}

function atualizarBotaoTema(tema) {
  const botao = document.getElementById('btn-tema');
  if (!botao) return;
  const label = botao.querySelector('.label-tema');
  if (label) {
    label.textContent = tema === 'escuro' ? 'Modo claro' : 'Modo escuro';
  }
  botao.setAttribute('aria-pressed', tema === 'escuro' ? 'true' : 'false');
}

function atualizarCardsTema(tema) {
  // Usado na pagina de configuracoes para marcar qual card esta ativo.
  const cards = document.querySelectorAll('.card-tema');
  cards.forEach(function (card) {
    const valor = card.dataset.tema;
    const status = card.querySelector('.theme-status');
    if (valor === tema) {
      card.classList.add('selected-theme');
      if (status) status.textContent = 'Ativo';
    } else {
      card.classList.remove('selected-theme');
      if (status) status.textContent = 'Selecionar';
    }
  });
}

function configurarTema() {
  const botao = document.getElementById('btn-tema');
  if (botao) {
    botao.addEventListener('click', trocarTema);
  }
  document.querySelectorAll('.card-tema').forEach(function (card) {
    card.addEventListener('click', function () {
      salvarTema(card.dataset.tema);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  aplicarTema(temaSalvo());
  configurarTema();
});
