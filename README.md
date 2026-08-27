<div align="center">

  # ☕ Raiz Café — Landing Page Institucional

  **Uma landing page institucional focada em alta performance, acessibilidade e arquitetura leve com tecnologias nativas.**

  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
  [![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen?style=for-the-badge)](https://github.com)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

  [💻 Ver Demo Online](https://seu-usuario.github.io/raiz-cafe/) · [🐞 Reportar Bug](https://github.com/seu-usuario/raiz-cafe/issues) · [✨ Solicitar Funcionalidade](https://github.com/seu-usuario/raiz-cafe/issues)

</div>

---

## 📋 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Destaques Técnicos & Funcionalidades](#-destaques-técnicos--funcionalidades)
- [Decisões de Arquitetura](#-decisões-de-arquitetura)
- [Stack Tecnológica](#-stack-tecnológica)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Acessibilidade & Performance](#-acessibilidade--performance)
- [Autor](#-autor)

---

## 📌 Sobre o Projeto

O **Raiz Café** é uma landing page desenvolvida para uma torrefação artesanal fictícia de cafés especiais brasileiros. 

O principal objetivo deste projeto foi demonstrar a construção de uma **interface rica, fluida e totalmente responsiva utilizando apenas tecnologias nativas (*Vanilla Web*)**, sem a necessidade de frameworks volumosos (como React ou Vue) ou bibliotecas pesadas de animação.

> 🎯 **Foco da aplicação:** Baixo consumo de recursos, tempo de carregamento mínimo (SEO-first), acessibilidade (a11y) e código limpo (*Clean Code*).

---

## ✨ Destaques Técnicos & Funcionalidades

| Funcionalidade | Descrição Técnica |
| :--- | :--- |
| **Navegação Dinâmica** | Destaque do link ativo no cabeçalho e transição de estado (*scrolled header*) controlados nativamente via JS e CSS. |
| **Filtro de Cardápio** | Manipulação do DOM para filtragem em tempo real de produtos (Todos, Quentes e Frios) com tratamento para cenários de busca vazia. |
| **Galeria & Lightbox** | Modal interativo para ampliação de imagens, com bloqueio de scroll de fundo e suporte a atalhos de teclado (`Esc`). |
| **Carrossel Autônomo** | Slider de depoimentos com cálculo de transformações CSS, navegação por *dots/arrows*, *autoplay* e pausa ao passar o ponteiro (*hover*). |
| **Indicadores Dinâmicos** | Medidor visual de torra atualizado programaticamente através de atributos customizados HTML (`data-level`). |
| **Validação Client-Side** | Formulários de contato e newsletter com sanitização, Regex para e-mail e mensagens de erro instantâneas no campo. |

---

## 💡 Decisões de Arquitetura

Para garantir uma experiência de navegação a 60fps sem sobrecarregar a *main thread* do navegador:

1. **Uso do `IntersectionObserver` em vez de Event Listeners de Scroll:**
   A detecção de elementos entrando na viewport (*reveal on scroll*) e a atualização do menu ativo utilizam a API nativa `IntersectionObserver`, evitando o problema de *scroll jank* provocado pelo disparo contínuo de eventos `window.onscroll`.

2. **Design Tokens em CSS Variables:**
   Toda a paleta de cores, tipografia, espaçamentos, elevações e raios de borda estão centralizados no `:root` do CSS, facilitando a manutenção, padronização visual e futura implementação de temas (ex: *Dark Mode*).

3. **Performance Visual Nativa:**
   Utilização do atributo `loading="lazy"` para o carregamento assíncrono de imagens e fallbacks para SVG inline.

---

## 🛠️ Stack Tecnológica

- **HTML5:** Estruturação semântica, atributo de internacionalização, marcação focada em SEO e acessibilidade (WAI-ARIA).
- **CSS3:** Flexbox, CSS Grid, Custom Properties (Variáveis), transições performáticas (`transform` e `opacity`) e Media Queries.
- **JavaScript (ES6+):** Manipulação eficiente do DOM, Modularidade estrutural, `IntersectionObserver` e validação por RegExp.
- **Fontes & Ícones:** Google Fonts (*Fraunces*, *Manrope*, *Space Mono*) e Font Awesome 6.

---

## 📂 Estrutura de Arquivos

```text
raiz-cafe/
├── 📄 index.html      # Estrutura e marcação semântica da aplicação
├── 🎨 style.css       # Design system, layout, componentes e responsividade
├── ⚡ script.js      # Lógica da aplicação, eventos e manipulação do DOM
└── 📜 LICENSE        # Licença de uso do software
```

## 👤 Autor

Desenvolvido por Matheus Batista.

LinkedIn: [https://www.linkedin.com/in/matheus-batista-857a47236/]

GitHub: @MBatista15
