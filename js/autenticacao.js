'use strict';

/*
 * Protege as paginas internas.
 * Se nao houver uma conta com login ativo, volta para a tela inicial.
 */

function verificarLogin() {
  var emailLogado = localStorage.getItem('usuarioLogado');
  var textoConta = localStorage.getItem('contaUsuario');
  var conta = null;

  if (textoConta) {
    try {
      conta = JSON.parse(textoConta);
    } catch (e) {
      conta = null;
    }
  }

  if (!conta || conta.email !== emailLogado) {
    window.location.href = '../index.html';
  }
}

verificarLogin();
