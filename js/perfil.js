'use strict';

/*
 * Pagina de perfil.
 * Carrega os dados salvos no localStorage e salva qualquer alteracao.
 */

const CHAVE_PERFIL = 'perfilUsuario';

function carregarPerfil() {
  const texto = localStorage.getItem(CHAVE_PERFIL);
  if (!texto) return null;
  try {
    return JSON.parse(texto);
  } catch (e) {
    // Se o JSON estiver bagunçado por algum motivo, ignora.
    return null;
  }
}

function configurarPerfil() {
  const form = document.getElementById('form-perfil');
  if (!form) return;

  // Se ja tiver dados salvos, preenche os campos com eles.
  const salvos = carregarPerfil();
  if (salvos) {
    for (const campo in salvos) {
      const input = document.getElementById(campo);
      if (input) input.value = salvos[campo];
    }
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limparErros(form);

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');

    let ok = true;
    if (nome.value.trim().length < 3) {
      mostrarErro(nome, 'Informe seu nome.');
      ok = false;
    }
    if (!emailValido(email.value)) {
      mostrarErro(email, 'Informe um e-mail valido.');
      ok = false;
    }
    if (!ok) return;

    const dados = {
      nome: nome.value,
      email: email.value,
      cidade: document.getElementById('cidade').value,
      renda: document.getElementById('renda').value,
      perfil: document.getElementById('perfil').value,
      objetivo: document.getElementById('objetivo').value
    };

    localStorage.setItem(CHAVE_PERFIL, JSON.stringify(dados));
    alert('Alteracoes salvas com sucesso!');
  });

  const btnVoltar = document.getElementById('btn-voltar');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', function () {
      window.location.href = 'dashboard.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', configurarPerfil);
