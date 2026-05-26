'use strict';

/*
 * Pagina do simulador de investimento.
 * Calcula juros compostos com aporte mensal.
 *
 * Formula usada (a cada mes):
 *   saldo = saldo * (1 + taxa) + aporte_mensal
 */

function valorParaNumero(texto) {
  // Pega uma string tipo "R$ 5.000,50" e devolve 5000.5
  const limpo = String(texto).replace(/[^\d,]/g, '').replace(',', '.');
  const numero = parseFloat(limpo);
  return isNaN(numero) ? 0 : numero;
}

function porcentagemParaNumero(texto) {
  // Pega "0,8%" e devolve 0.8
  const limpo = String(texto).replace(/[^\d,]/g, '').replace(',', '.');
  const numero = parseFloat(limpo);
  return isNaN(numero) ? 0 : numero;
}

function mesesParaNumero(texto) {
  // Pega "24 meses" e devolve 24
  const limpo = String(texto).replace(/\D/g, '');
  const numero = parseInt(limpo, 10);
  return isNaN(numero) ? 0 : numero;
}

function formatarReal(valor) {
  return 'R$ ' + valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function calcularSimulacao() {
  const inicial = valorParaNumero(document.getElementById('valor-inicial').value);
  const mensal = valorParaNumero(document.getElementById('aporte-mensal').value);
  const taxa = porcentagemParaNumero(document.getElementById('taxa').value) / 100;
  const meses = mesesParaNumero(document.getElementById('tempo').value);

  if (meses <= 0) {
    alert('Informe um tempo de investimento valido (em meses).');
    return;
  }

  // Juros compostos com aporte mensal: a cada mes o saldo rende
  // e depois soma o aporte do mes.
  let valorFinal = inicial;
  for (let i = 0; i < meses; i++) {
    valorFinal = valorFinal * (1 + taxa) + mensal;
  }

  const totalInvestido = inicial + (mensal * meses);
  const rendimento = valorFinal - totalInvestido;

  document.getElementById('resultado-final').textContent = formatarReal(valorFinal);
  document.getElementById('resultado-total').textContent = formatarReal(totalInvestido);
  document.getElementById('resultado-rendimento').textContent = formatarReal(rendimento);
  document.getElementById('descricao-final').textContent =
    'Resultado considerando os aportes mensais durante ' + meses + ' meses.';
}

function configurarSimulador() {
  const form = document.getElementById('form-simulador');
  if (!form) return;

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    calcularSimulacao();
  });

  // Roda uma vez no carregamento para nao deixar o resultado
  // mostrando valores velhos quando o usuario abre a pagina.
  calcularSimulacao();
}

document.addEventListener('DOMContentLoaded', configurarSimulador);
