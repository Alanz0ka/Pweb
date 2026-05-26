'use strict';

/*
 * Botao "Sair" da sidebar.
 * Pede confirmacao antes de mandar o usuario de volta para o login.
 */

function configurarSair() {
  const botao = document.getElementById('btn-sair');
  if (!botao) return;
  botao.addEventListener('click', function () {
    if (confirm('Deseja sair do sistema?')) {
      window.location.href = '../index.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', configurarSair);
