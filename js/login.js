'use strict';

/*
 * Pagina de login.
 * Valida e-mail e senha, guarda o e-mail se o usuario marcou
 * "Lembrar meu e-mail" e redireciona para a home.
 */

var CHAVE_EMAIL_LEMBRADO = 'emailLembrado';
var CHAVE_CONTA_LOGIN = 'contaUsuario';
var CHAVE_PERFIL_LOGIN = 'perfilUsuario';
var CHAVE_SESSAO_LOGIN = 'usuarioLogado';

function carregarContaLogin() {
  var texto = localStorage.getItem(CHAVE_CONTA_LOGIN);
  if (!texto) return null;

  try {
    return JSON.parse(texto);
  } catch (e) {
    return null;
  }
}

function sincronizarPerfilLogin(conta) {
  var texto = localStorage.getItem(CHAVE_PERFIL_LOGIN);
  var perfil = null;

  if (texto) {
    try {
      perfil = JSON.parse(texto);
    } catch (e) {
      perfil = null;
    }
  }

  if (!perfil) {
    perfil = {
      nome: conta.nome,
      email: conta.email,
      cidade: '',
      renda: '',
      perfil: 'Moderado',
      objetivo: ''
    };
  }

  perfil.nome = conta.nome;
  perfil.email = conta.email;
  localStorage.setItem(CHAVE_PERFIL_LOGIN, JSON.stringify(perfil));
}

function configurarLogin() {
  var form = document.getElementById('form-login');
  if (!form) return;

  var email = document.getElementById('email');
  var senha = document.getElementById('senha');
  var lembrar = document.getElementById('lembrar');

  // Se o usuario marcou "lembrar" antes, preenche o email automaticamente.
  var emailLembrado = localStorage.getItem(CHAVE_EMAIL_LEMBRADO);
  if (emailLembrado) {
    email.value = emailLembrado;
    if (lembrar) lembrar.checked = true;
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparErros(form);

    var ok = true;
    var emailLimpo = email.value.trim().toLowerCase();
    if (!emailValido(emailLimpo)) {
      mostrarErro(email, 'Informe um e-mail valido.');
      ok = false;
    }
    if (senha.value.length < 6) {
      mostrarErro(senha, 'A senha precisa ter pelo menos 6 caracteres.');
      ok = false;
    }
    if (!ok) return;

    var conta = carregarContaLogin();
    if (!conta || conta.email !== emailLimpo || conta.senha !== senha.value) {
      mostrarErro(senha, 'E-mail ou senha incorretos. Cadastre uma conta antes de entrar.');
      return;
    }

    // Salva ou apaga o email lembrado conforme o checkbox.
    if (lembrar && lembrar.checked) {
      localStorage.setItem(CHAVE_EMAIL_LEMBRADO, emailLimpo);
    } else {
      localStorage.removeItem(CHAVE_EMAIL_LEMBRADO);
    }

    sincronizarPerfilLogin(conta);
    localStorage.setItem(CHAVE_SESSAO_LOGIN, conta.email);
    alert('Login realizado com sucesso!');
    window.location.href = 'src/home.html';
  });
}

document.addEventListener('DOMContentLoaded', configurarLogin);
