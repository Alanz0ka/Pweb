'use strict';

/*
 * Pagina de recuperar senha.
 * So valida o e-mail e exibe uma mensagem simulando o envio.
 */

function configurarRecuperar() {
  const form = document.getElementById('form-recuperar');
  if (!form) return;

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparErros(form);

    const email = document.getElementById('rec-email');
    if (!emailValido(email.value)) {
      mostrarErro(email, 'Informe um e-mail valido.');
      return;
    }

    alert('Enviamos um e-mail com as instrucoes para ' + email.value);
    window.location.href = '../index.html';
  });
}

document.addEventListener('DOMContentLoaded', configurarRecuperar);
