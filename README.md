# Portfólio — Mara Rúbia

Site institucional em HTML, CSS e JavaScript puros (sem build, sem dependências),
pronto para publicar em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages,
cPanel etc.).

## Estrutura

```
portfolio-mara-rubia/
├── index.html                 → Página inicial (Hero, Sobre, Projetos, Vídeos, Ferramentas, Contato)
├── cases/
│   ├── lume-cosmetics.html     → Estudo de caso 01 — Beauty / Social Ads
│   ├── fitpulse-app.html       → Estudo de caso 02 — Lifestyle / App Marketing
│   ├── nova-tech.html          → Estudo de caso 03 — B2B / Institucional
│   └── aurora-fashion.html     → Estudo de caso 04 — E-commerce / Performance
├── css/
│   └── style.css               → Design system completo (tokens, componentes, responsivo)
├── js/
│   └── main.js                 → Menu mobile, header dinâmico, scroll reveal, player de vídeo
├── robots.txt
└── sitemap.xml
```

## Como publicar seus vídeos reais

Cada player de vídeo já está pronto tecnicamente. Para ativá-lo, edite os atributos
`data-embed-type` e `data-embed-id` do bloco `.video-embed` correspondente:

```html
<div class="video-embed" data-embed-type="vimeo" data-embed-id="123456789">
```

- **Vimeo**: use o ID numérico do vídeo (para vídeos privados com hash, use `ID/HASH`).
- **YouTube não listado**: use o ID do vídeo (o trecho após `v=` na URL).
- **Behance**: use o ID do projeto.

Assim que o `data-embed-id` é preenchido, o clique no botão de play troca o
placeholder por um iframe real — nenhuma outra alteração é necessária.

## Como trocar a foto de perfil

No `index.html`, dentro da seção "Sobre", substitua o bloco do monograma:

```html
<figure class="about__portrait">
  <img src="assets/mara-rubia.jpg" alt="Retrato de Mara Rúbia" />
</figure>
```

(crie uma pasta `assets/` e adicione a foto lá).

## Personalização rápida

- **Cores, tipografia e espaçamento**: tudo centralizado em `:root` no topo de `css/style.css`.
- **Textos dos projetos**: editáveis diretamente em cada arquivo `cases/*.html`.
- **Domínio para SEO**: atualize as URLs em `sitemap.xml` para o domínio real após a publicação.

## Requisitos técnicos atendidos

- 100% responsivo, mobile-first, sem frameworks externos.
- Tipografia via Google Fonts (Fraunces, Inter, JetBrains Mono) — carregada por CDN.
- Sem imagens externas: placeholders desenhados em CSS/SVG (leve, sem dependências).
- Animações discretas (revelação suave ao rolar, respeitando `prefers-reduced-motion`).
- Acessibilidade: skip-link, foco visível, `aria-label`/`aria-expanded` no menu, contraste
  adequado entre texto e fundo.
- SEO básico: `title`/`description` únicos por página, Open Graph, `robots.txt`, `sitemap.xml`,
  hierarquia semântica de headings.
