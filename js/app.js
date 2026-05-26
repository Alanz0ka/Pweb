(function () {
  const STORAGE_KEY = 'investApp.theme';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      const labelEl = btn.querySelector('[data-theme-label]') || btn;
      labelEl.textContent = isDark ? 'Modo claro' : 'Modo escuro';
      btn.setAttribute('aria-pressed', String(isDark));
    });
    document.querySelectorAll('[data-theme-card]').forEach(function (card) {
      const cardTheme = card.dataset.themeCard;
      card.classList.toggle('selected-theme', cardTheme === theme);
      const status = card.querySelector('.theme-status');
      if (status) status.textContent = cardTheme === theme ? 'Ativo' : 'Selecionar';
    });
  }

  function setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    applyTheme(theme);
  }

  function toggleTheme() {
    setTheme(getStoredTheme() === 'dark' ? 'light' : 'dark');
  }

  function parseMoney(str) {
    const cleaned = String(str).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
    const n = Number(cleaned);
    return isFinite(n) ? n : 0;
  }
  function parsePercent(str) {
    const cleaned = String(str).replace(/[^\d,.-]/g, '').replace(',', '.');
    const n = Number(cleaned);
    return isFinite(n) ? n : 0;
  }
  function parseMonths(str) {
    const n = parseInt(String(str).replace(/\D/g, ''), 10);
    return isFinite(n) ? n : 0;
  }
  function formatMoney(value) {
    return 'R$ ' + value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function bindThemeControls() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });
    document.querySelectorAll('[data-theme-card]').forEach(function (card) {
      card.addEventListener('click', function () {
        setTheme(card.dataset.themeCard);
      });
    });
  }

  function bindNavButtons() {
    document.querySelectorAll('button[data-href]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.href = btn.dataset.href;
      });
    });
  }

  function bindLogout() {
    document.querySelectorAll('[data-logout]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (confirm('Deseja sair do sistema?')) {
          window.location.href = btn.dataset.logout;
        }
      });
    });
  }

  function bindSimulator() {
    const form = document.querySelector('[data-sim-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const inicial = parseMoney(form.querySelector('#valor-inicial').value);
      const mensal = parseMoney(form.querySelector('#aporte-mensal').value);
      const taxa = parsePercent(form.querySelector('#taxa').value) / 100;
      const meses = parseMonths(form.querySelector('#tempo').value);

      let valor = inicial;
      for (let i = 0; i < meses; i++) {
        valor = valor * (1 + taxa) + mensal;
      }
      const totalInvestido = inicial + mensal * meses;
      const rendimento = valor - totalInvestido;

      const finalEl = document.querySelector('[data-sim-final]');
      const totalEl = document.querySelector('[data-sim-total]');
      const rendEl = document.querySelector('[data-sim-rendimento]');
      const descEl = document.querySelector('[data-sim-final-desc]');
      if (finalEl) finalEl.textContent = formatMoney(valor);
      if (totalEl) totalEl.textContent = formatMoney(totalInvestido);
      if (rendEl) rendEl.textContent = formatMoney(rendimento);
      if (descEl) {
        descEl.textContent = 'Resultado considerando os aportes mensais durante ' + meses + ' meses.';
      }
    });
  }

  function bindMessageForms() {
    document.querySelectorAll('[data-form-message]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert(form.dataset.formMessage);
        const next = form.dataset.formNext;
        if (next) window.location.href = next;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getStoredTheme());
    bindThemeControls();
    bindNavButtons();
    bindLogout();
    bindSimulator();
    bindMessageForms();
  });
})();
