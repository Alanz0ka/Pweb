# Pweb - Carteira de Investimento

Projeto web da disciplina de Programacao Web. Um sistema simples para
acompanhar aportes e simular investimentos, feito so com HTML, CSS e
JavaScript puro (sem framework).

## 📋 Descricao

O sistema simula a area logada de uma carteira de investimento. Tem
telas de login, cadastro, recuperacao de senha, dashboard com graficos,
relatorios, perfil do usuario, simulador de juros compostos e
configuracoes com troca de tema claro/escuro.

Todos os dados sao mockados ou guardados no `localStorage` do navegador
(perfil, e-mail lembrado, tema). Nao tem backend.

## 🛠️ Tecnologias

- **HTML5** - Estrutura semantica das paginas
- **CSS3** - Estilizacao, variaveis CSS e tema escuro
- **JavaScript (ES6+)** - Validacoes, simulador e troca de tema

## 📁 Estrutura do Projeto

```
Pweb/
├── index.html              # Tela de login (entrada do sistema)
├── README.MD
├── LICENSE
├── img/
├── styles/
│   └── style.css           # Folha de estilos unica
├── js/                     # Um arquivo por responsabilidade
│   ├── tema.js             # Tema claro/escuro (todas as paginas)
│   ├── validacao.js        # Funcoes auxiliares de validacao
│   ├── login.js            # Tela de login
│   ├── cadastro.js         # Tela de cadastro
│   ├── recuperar.js        # Recuperar senha
│   ├── home.js             # Saudacao da home
│   ├── perfil.js           # Editar e salvar perfil
│   ├── simulador.js        # Calculo de juros compostos
│   └── sair.js             # Botao "Sair" da sidebar
└── src/                    # Paginas internas do sistema
    ├── home.html
    ├── dashboard.html
    ├── simulator.html
    ├── reports.html
    ├── profile.html
    ├── settings.html
    ├── register.html
    └── forgot-password.html
```

## 🚀 Como Usar

1. Clone o repositorio:
   ```bash
   git clone https://github.com/Alanz0ka/Pweb.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Pronto, nao tem nada para instalar!

> Dica: na tela de login pode entrar com qualquer e-mail valido e senha
> de pelo menos 6 caracteres.

## ✨ Funcionalidades

- **Login, cadastro e recuperacao de senha** com validacao (regex de
  e-mail, tamanho minimo de senha, confirmacao de senha).
- **Mensagens de erro inline** abaixo dos campos.
- **"Lembrar meu e-mail"** no login (persistido no `localStorage`).
- **Tema claro / escuro** com toggle na sidebar (e nas telas de auth)
  ou pelos cards na pagina de Configuracoes. A preferencia e salva e
  aplicada antes da renderizacao para evitar piscar a tela.
- **Saudacao dinamica** na home ("Bom dia / Boa tarde / Boa noite") com
  o primeiro nome do perfil salvo e a data atual em portugues.
- **Simulador de investimento** que calcula juros compostos com aporte
  mensal usando a formula `saldo = saldo * (1 + taxa) + aporte`.
- **Perfil** que salva e recarrega os dados do `localStorage`.
- **Dashboard** com grafico de barras e de pizza feitos so com CSS.
- **Layout responsivo** que vira coluna unica em telas menores que
  900px.

## 📝 Organizacao do JavaScript

Cada pagina importa apenas os scripts que precisa. A ordem dos
`<script defer>` e respeitada, entao quando `login.js` precisa de
`emailValido()` o `validacao.js` ja foi carregado antes.

| Pagina                | Scripts carregados                                  |
| --------------------- | --------------------------------------------------- |
| `index.html`          | `tema.js`, `validacao.js`, `login.js`               |
| `src/register.html`   | `tema.js`, `validacao.js`, `cadastro.js`            |
| `src/forgot-password` | `tema.js`, `validacao.js`, `recuperar.js`           |
| `src/home.html`       | `tema.js`, `sair.js`, `home.js`                     |
| `src/dashboard.html`  | `tema.js`, `sair.js`                                |
| `src/reports.html`    | `tema.js`, `sair.js`                                |
| `src/settings.html`   | `tema.js`, `sair.js`                                |
| `src/profile.html`    | `tema.js`, `validacao.js`, `sair.js`, `perfil.js`   |
| `src/simulator.html`  | `tema.js`, `sair.js`, `simulador.js`                |

## 📄 Licenca

Projeto de uso livre para fins de estudo.
