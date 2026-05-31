'use strict';

/*
 * Pagina de perfil.
 * Carrega os dados salvos no localStorage e salva qualquer alteracao.
 */

var CHAVE_PERFIL = 'perfilUsuario';
var CHAVE_CONTA_PERFIL = 'contaUsuario';
var CHAVE_SESSAO_PERFIL = 'usuarioLogado';

function carregarPerfil() {
  var texto = localStorage.getItem(CHAVE_PERFIL);
  if (!texto) return null;
  try {
    return JSON.parse(texto);
  } catch (e) {
    // Se o JSON estiver bagunçado por algum motivo, ignora.
    return null;
  }
}

function iniciaisDoNome(nome) {
  var partes = nome.trim().split(' ');
  var iniciais = '';
  var i;

  for (i = 0; i < partes.length; i++) {
    if (partes[i] !== '') {
      iniciais = iniciais + partes[i].charAt(0).toUpperCase();
    }
    if (iniciais.length === 2) break;
  }

  return iniciais;
}

function atualizarResumoPerfil(dados) {
  if (!dados) return;

  var avatar = document.getElementById('resumo-avatar');
  var nome = document.getElementById('resumo-nome');
  var perfil = document.getElementById('resumo-perfil');
  var email = document.getElementById('resumo-email');

  if (avatar && dados.nome) avatar.textContent = iniciaisDoNome(dados.nome);
  if (nome && dados.nome) nome.textContent = dados.nome;
  if (perfil && dados.perfil) perfil.textContent = 'Perfil ' + dados.perfil.toLowerCase();
  if (email && dados.email) email.textContent = 'E-mail: ' + dados.email;
}

function atualizarContaPerfil(dados) {
  var texto = localStorage.getItem(CHAVE_CONTA_PERFIL);
  if (!texto) return;

  try {
    var conta = JSON.parse(texto);
    conta.nome = dados.nome;
    conta.email = dados.email;
    localStorage.setItem(CHAVE_CONTA_PERFIL, JSON.stringify(conta));
    localStorage.setItem(CHAVE_SESSAO_PERFIL, dados.email);
  } catch (e) {
    return;
  }
}

function configurarPerfil() {
  var form = document.getElementById('form-perfil');
  if (!form) return;

  // Se ja tiver dados salvos, preenche os campos com eles.
  var salvos = carregarPerfil();
  if (salvos) {
    for (var campo in salvos) {
      var input = document.getElementById(campo);
      if (input) input.value = salvos[campo];
    }
    atualizarResumoPerfil(salvos);
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparErros(form);

    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var nomeLimpo = nome.value.trim();
    var emailLimpo = email.value.trim().toLowerCase();

    var ok = true;
    if (nomeLimpo.length < 3) {
      mostrarErro(nome, 'Informe seu nome.');
      ok = false;
    }
    if (!emailValido(emailLimpo)) {
      mostrarErro(email, 'Informe um e-mail valido.');
      ok = false;
    }
    if (!ok) return;

    var dados = {
      nome: nomeLimpo,
      email: emailLimpo,
      cidade: document.getElementById('cidade').value,
      renda: document.getElementById('renda').value,
      perfil: document.getElementById('perfil').value,
      objetivo: document.getElementById('objetivo').value
    };

    localStorage.setItem(CHAVE_PERFIL, JSON.stringify(dados));
    atualizarContaPerfil(dados);
    atualizarResumoPerfil(dados);
    alert('Alteracoes salvas com sucesso!');
  });

  var btnVoltar = document.getElementById('btn-voltar');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', function () {
      window.location.href = 'dashboard.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', configurarPerfil);
