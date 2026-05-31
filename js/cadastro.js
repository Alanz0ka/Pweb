'use strict';

/*
 * Pagina de cadastro.
 * Valida nome, e-mail, senha (minimo 6) e confirmacao de senha.
 */

var CHAVE_CONTA_CADASTRO = 'contaUsuario';
var CHAVE_PERFIL_CADASTRO = 'perfilUsuario';
var CHAVE_SESSAO_CADASTRO = 'usuarioLogado';

function configurarCadastro() {
  var form = document.getElementById('form-cadastro');
  if (!form) return;

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparErros(form);

    var nome = document.getElementById('nome');
    var email = document.getElementById('cad-email');
    var senha = document.getElementById('cad-senha');
    var confirmar = document.getElementById('confirmar');
    var nomeLimpo = nome.value.trim();
    var emailLimpo = email.value.trim().toLowerCase();

    var ok = true;
    if (nomeLimpo.length < 3) {
      mostrarErro(nome, 'Informe seu nome completo.');
      ok = false;
    }
    if (!emailValido(emailLimpo)) {
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

    var conta = {
      nome: nomeLimpo,
      email: emailLimpo,
      senha: senha.value
    };

    var perfil = {
      nome: nomeLimpo,
      email: emailLimpo,
      cidade: '',
      renda: '',
      perfil: 'Moderado',
      objetivo: ''
    };

    localStorage.setItem(CHAVE_CONTA_CADASTRO, JSON.stringify(conta));
    localStorage.setItem(CHAVE_PERFIL_CADASTRO, JSON.stringify(perfil));
    localStorage.setItem(CHAVE_SESSAO_CADASTRO, emailLimpo);
    alert('Cadastro realizado com sucesso, ' + nomeLimpo.split(' ')[0] + '!');
    window.location.href = 'home.html';
  });
}

document.addEventListener('DOMContentLoaded', configurarCadastro);
