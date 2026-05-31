'use strict';

/*
 * Pagina do simulador de investimento.
 * Calcula juros compostos com aporte mensal.
 *
 * Formula usada (a cada mes):
 *   saldo = saldo * (1 + taxa) + aporte_mensal
 */

function textoParaNumero(texto) {
  // Pega textos como "R$ 5.000,50" ou "0,8%" e devolve um numero.
  var limpo = String(texto).trim();
  limpo = limpo.replace('R$', '');
  limpo = limpo.replace('%', '');
  limpo = limpo.split('.').join('');
  limpo = limpo.replace(',', '.');
  limpo = limpo.trim();

  if (limpo === '') return NaN;
  return Number(limpo);
}

function mesesParaNumero(texto) {
  // Pega "24 meses" e devolve 24
  var limpo = String(texto).toLowerCase().trim();
  limpo = limpo.replace('meses', '');
  limpo = limpo.replace('mes', '');
  limpo = limpo.trim();

  if (limpo === '') return NaN;
  return Number(limpo);
}

function formatarReal(valor) {
  return 'R$ ' + valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function calcularSimulacao() {
  var inicial = textoParaNumero(document.getElementById('valor-inicial').value);
  var mensal = textoParaNumero(document.getElementById('aporte-mensal').value);
  var taxaPercentual = textoParaNumero(document.getElementById('taxa').value);
  var meses = mesesParaNumero(document.getElementById('tempo').value);

  if (isNaN(inicial) || inicial < 0) {
    alert('Informe um valor inicial valido.');
    return;
  }
  if (isNaN(mensal) || mensal < 0) {
    alert('Informe um aporte mensal valido.');
    return;
  }
  if (isNaN(taxaPercentual) || taxaPercentual <= -100) {
    alert('Informe uma taxa mensal valida.');
    return;
  }
  if (isNaN(meses) || meses <= 0 || meses % 1 !== 0) {
    alert('Informe um tempo de investimento valido (em meses).');
    return;
  }

  var taxa = taxaPercentual / 100;

  // Juros compostos com aporte mensal: a cada mes o saldo rende
  // e depois soma o aporte do mes.
  var valorFinal = inicial;
  var i;
  for (i = 0; i < meses; i++) {
    valorFinal = valorFinal * (1 + taxa) + mensal;
  }

  var totalInvestido = inicial + (mensal * meses);
  var rendimento = valorFinal - totalInvestido;

  document.getElementById('resultado-final').textContent = formatarReal(valorFinal);
  document.getElementById('resultado-total').textContent = formatarReal(totalInvestido);
  document.getElementById('resultado-rendimento').textContent = formatarReal(rendimento);
  document.getElementById('descricao-final').textContent =
    'Resultado considerando os aportes mensais durante ' + meses + ' meses.';
}

function configurarSimulador() {
  var form = document.getElementById('form-simulador');
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
