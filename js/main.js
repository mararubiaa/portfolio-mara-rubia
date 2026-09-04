/* ==========================================================================
   MARA RÚBIA — main.js
   Comportamentos: navegação mobile, header dinâmico ao rolar,
   revelação suave de seções, e o componente de vídeo (Vimeo/YouTube/Behance).
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Header dinâmico ---------- */
  var header = document.querySelector('[data-site-header]');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');

  if (navToggle && mobileNav) {
    var closeMenu = function () {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    var openMenu = function () {
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Fechar menu');
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Revelação suave ao rolar ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Componente de vídeo ----------
     Estrutura esperada:
     <div class="video-embed" data-embed-type="vimeo|youtube|behance" data-embed-id="ID">
       <div class="video-embed__frame">
         <div class="video-embed__poster"> ... <button class="video-embed__play"> ... </div>
       </div>
     </div>

     Para publicar um vídeo real, basta preencher data-embed-id com:
       - Vimeo: o ID numérico do vídeo (ou "ID/HASH" para vídeos privados com hash)
       - YouTube: o ID do vídeo não listado
       - Behance: o ID do projeto
  --------------------------------------------------------------------------- */

  function buildEmbedUrl(type, id) {
    switch (type) {
      case 'vimeo':
        return 'https://player.vimeo.com/video/' + id + '?title=0&byline=0&portrait=0';
      case 'youtube':
        return 'https://www.youtube-nocookie.com/embed/' + id + '?rel=0';
      case 'behance':
        return 'https://www.behance.net/embed/project/' + id + '?ilo0=1';
      default:
        return null;
    }
  }

  document.querySelectorAll('.video-embed').forEach(function (embed) {
    var playBtn = embed.querySelector('.video-embed__play');
    if (!playBtn) return;

    playBtn.addEventListener('click', function () {
      var type = embed.getAttribute('data-embed-type');
      var id = embed.getAttribute('data-embed-id');
      var title = embed.getAttribute('data-embed-title') || 'Vídeo do projeto';
      var frame = embed.querySelector('.video-embed__frame');

      if (!id) {
        // Nenhum ID configurado ainda — apenas um retorno visual discreto.
        playBtn.style.transform = 'scale(0.92)';
        setTimeout(function () {
          playBtn.style.transform = '';
        }, 160);
        return;
      }

      var src = buildEmbedUrl(type, id);
      if (!src || !frame) return;

      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', src);
      iframe.setAttribute('title', title);
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute(
        'allow',
        'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'
      );
      iframe.setAttribute('allowfullscreen', '');

      frame.innerHTML = '';
      frame.appendChild(iframe);
    });
  });

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
     /* ---------- Biblioteca de vídeos (independente) ----------
     Para adicionar um vídeo, duplique um objeto do array abaixo.
     type: "vimeo" | "youtube" | "behance"
  --------------------------------------------------------------------------- */
  var libraryVideos = [
    { thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80", type: "vimeo",   id: "1216433791", duration: "0:0" },
    { thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", type: "vimeo",   id: "1216583316", duration: "0:0" },
    { thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", type: "vimeo", id: "1217156198", duration: "0:0" },
    { thumbnail: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80", type: "vimeo", id: "1217672305", duration: "0:0" },
    { thumbnail: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&q=80", type: "vimeo",   id: "1224102778", duration: "0:0" }
  ];

  var libraryGrid = document.querySelector('[data-library-grid]');

  if (libraryGrid) {
    var LIB_PAGE_SIZE = 3;
    var libShown = 0;
    var loadMoreBtn = document.querySelector('[data-library-load-more]');

    function libEmbedUrl(type, id) {
      if (type === 'vimeo') return 'https://player.vimeo.com/video/' + id + '?autoplay=1';
      if (type === 'youtube') return 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      if (type === 'behance') return 'https://www.behance.net/embed/project/' + id + '?ilo0=1';
      return null;
    }

    function openLibraryModal(video) {
      var modal = document.querySelector('[data-library-modal]');
      var player = document.querySelector('[data-library-modal-player]');
      var src = libEmbedUrl(video.type, video.id);
      if (!src || !modal || !player) return;
      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', src);
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      player.innerHTML = '';
      player.appendChild(iframe);
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeLibraryModal() {
      var modal = document.querySelector('[data-library-modal]');
      var player = document.querySelector('[data-library-modal-player]');
      if (player) player.innerHTML = '';
      if (modal) modal.hidden = true;
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-library-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeLibraryModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLibraryModal();
    });

    function renderLibraryPage() {
      var next = libraryVideos.slice(libShown, libShown + LIB_PAGE_SIZE);
      next.forEach(function (video) {
        var card = document.createElement('div');
        card.className = 'library-card';
        card.innerHTML =
          '<img class="library-card__thumb" src="' + video.thumbnail + '" alt="" loading="lazy" />' +
          '<span class="library-card__play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l14 8-14 8V4z"/></svg></span>' +
          '<span class="library-card__duration">' + video.duration + '</span>';
        card.addEventListener('click', function () { openLibraryModal(video); });
        libraryGrid.appendChild(card);
      });
      libShown += next.length;
      if (loadMoreBtn) loadMoreBtn.hidden = libShown >= libraryVideos.length;
    }

    if (loadMoreBtn) loadMoreBtn.addEventListener('click', renderLibraryPage);
    renderLibraryPage();
  }
})();
