'use strict';

/*
 * Pagina de cadastro.
 * Valida nome, e-mail, senha (minimo 6) e confirmacao de senha.
 */

function configurarCadastro() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparErros(form);

    const nome = document.getElementById('nome');
    const email = document.getElementById('cad-email');
    const senha = document.getElementById('cad-senha');
    const confirmar = document.getElementById('confirmar');

    let ok = true;
    if (nome.value.trim().length < 3) {
      mostrarErro(nome, 'Informe seu nome completo.');
      ok = false;
    }
    if (!emailValido(email.value)) {
      mostrarErro(email, 'Informe um e-mail valido.');
      ok = false;
    }
    if (senha.value.length < 6) {
      mostrarErro(senha, 'A senha precisa ter pelo menos 6 caracteres.');
      ok = false;
    }
    if (senha.value !== confirmar.value) {
      mostrarErro(confirmar, 'As senhas nao coincidem.');
      ok = false;
    }
    if (!ok) return;

    alert('Cadastro realizado com sucesso, ' + nome.value.split(' ')[0] + '!');
    window.location.href = 'home.html';
  });
}

document.addEventListener('DOMContentLoaded', configurarCadastro);
