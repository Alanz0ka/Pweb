'use strict';

/*
 * Pagina de recuperar senha.
 * So valida o e-mail e exibe uma mensagem simulando o envio.
 */

var CHAVE_CONTA_RECUPERAR = 'contaUsuario';

function carregarContaRecuperar() {
  var texto = localStorage.getItem(CHAVE_CONTA_RECUPERAR);
  if (!texto) return null;

  try {
    return JSON.parse(texto);
  } catch (e) {
    return null;
  }
}

function configurarRecuperar() {
  var form = document.getElementById('form-recuperar');
  if (!form) return;

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparErros(form);

    var email = document.getElementById('rec-email');
    var emailLimpo = email.value.trim().toLowerCase();
    if (!emailValido(emailLimpo)) {
      mostrarErro(email, 'Informe um e-mail valido.');
      return;
    }

    var conta = carregarContaRecuperar();
    if (!conta || conta.email !== emailLimpo) {
      mostrarErro(email, 'Nao encontramos uma conta cadastrada com este e-mail.');
      return;
    }

    alert('Enviamos um e-mail com as instrucoes para ' + emailLimpo);
    window.location.href = '../index.html';
  });
}

document.addEventListener('DOMContentLoaded', configurarRecuperar);
