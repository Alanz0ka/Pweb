'use strict';

/*
 * Pagina de login.
 * Valida e-mail e senha, guarda o e-mail se o usuario marcou
 * "Lembrar meu e-mail" e redireciona para a home.
 */

const CHAVE_EMAIL_LEMBRADO = 'emailLembrado';

function configurarLogin() {
  const form = document.getElementById('form-login');
  if (!form) return;

  const email = document.getElementById('email');
  const senha = document.getElementById('senha');
  const lembrar = document.getElementById('lembrar');

  // Se o usuario marcou "lembrar" antes, preenche o email automaticamente.
  const emailLembrado = localStorage.getItem(CHAVE_EMAIL_LEMBRADO);
  if (emailLembrado) {
    email.value = emailLembrado;
    if (lembrar) lembrar.checked = true;
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparErros(form);

    let ok = true;
    if (!emailValido(email.value)) {
      mostrarErro(email, 'Informe um e-mail valido.');
      ok = false;
    }
    if (senha.value.length < 6) {
      mostrarErro(senha, 'A senha precisa ter pelo menos 6 caracteres.');
      ok = false;
    }
    if (!ok) return;

    // Salva ou apaga o email lembrado conforme o checkbox.
    if (lembrar && lembrar.checked) {
      localStorage.setItem(CHAVE_EMAIL_LEMBRADO, email.value);
    } else {
      localStorage.removeItem(CHAVE_EMAIL_LEMBRADO);
    }

    alert('Login realizado com sucesso!');
    window.location.href = 'src/home.html';
  });
}

document.addEventListener('DOMContentLoaded', configurarLogin);
