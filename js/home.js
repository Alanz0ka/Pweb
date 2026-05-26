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
  const elemento = document.getElementById('saudacao');
  if (!elemento) return;

  // Tenta ler o nome do perfil salvo (mesma chave usada em perfil.js).
  let nome = 'Ana';
  const texto = localStorage.getItem('perfilUsuario');
  if (texto) {
    try {
      const perfil = JSON.parse(texto);
      if (perfil && perfil.nome) {
        nome = perfil.nome.split(' ')[0];
      }
    } catch (e) {
      // Se nao conseguir ler, fica com o nome padrao.
    }
  }

  const hora = new Date().getHours();
  elemento.textContent = saudacaoPorHora(hora) + ', ' + nome + '!';

  const dataElemento = document.getElementById('data-atual');
  if (dataElemento) {
    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    dataElemento.textContent = new Date().toLocaleDateString('pt-BR', opcoes);
  }
}

document.addEventListener('DOMContentLoaded', configurarSaudacao);
