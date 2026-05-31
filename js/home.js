'use strict';

/*
 * Pagina inicial (home).
 * Mostra uma saudacao baseada na hora do dia e a data atual.
 * Se houver perfil salvo no localStorage, usa o primeiro nome.
 */

function saudacaoPorHora(hora) {
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

function configurarSaudacao() {
  var elemento = document.getElementById('saudacao');
  if (!elemento) return;

  // Tenta ler o nome do perfil salvo (mesma chave usada em perfil.js).
  var nome = 'Ana';
  var texto = localStorage.getItem('perfilUsuario');
  if (texto) {
    try {
      var perfil = JSON.parse(texto);
      if (perfil && perfil.nome && perfil.nome.trim()) {
        nome = perfil.nome.trim().split(' ')[0];
      }
    } catch (e) {
      // Se nao conseguir ler, fica com o nome padrao.
    }
  }

  var hora = new Date().getHours();
  elemento.textContent = saudacaoPorHora(hora) + ', ' + nome + '!';

  var dataElemento = document.getElementById('data-atual');
  if (dataElemento) {
    var opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    dataElemento.textContent = new Date().toLocaleDateString('pt-BR', opcoes);
  }
}

document.addEventListener('DOMContentLoaded', configurarSaudacao);
