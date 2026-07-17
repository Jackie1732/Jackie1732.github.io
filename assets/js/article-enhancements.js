(function () {
  'use strict';

  var contentRoots = ['.post-content', '.page-content', '.note-content'];

  function queryContent(selectors) {
    return document.querySelectorAll(contentRoots.flatMap(function (root) {
      return selectors.map(function (selector) { return root + ' ' + selector; });
    }).join(', '));
  }

  function whenReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }
    callback();
  }

  function enhanceTables() {
    queryContent(['table']).forEach(function (table) {
      if (table.closest('.table-scroll')) return;

      var wrapper = document.createElement('div');
      var caption = table.querySelector('caption');
      wrapper.className = 'table-scroll';
      wrapper.tabIndex = 0;
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', caption && caption.textContent.trim() ? caption.textContent.trim() : '可横向滚动的表格');
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function addHeadingAnchors() {
    queryContent(['h2[id]', 'h3[id]']).forEach(function (heading) {
      if (heading.querySelector('.heading-anchor')) return;

      var anchor = document.createElement('a');
      anchor.className = 'heading-anchor';
      anchor.href = '#' + encodeURIComponent(heading.id);
      anchor.setAttribute('aria-label', '链接到“' + heading.textContent.trim() + '”');
      anchor.setAttribute('title', '复制本节链接');
      anchor.textContent = '#';
      heading.appendChild(anchor);
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('Copy command was rejected.'));
      } catch (error) {
        reject(error);
      } finally {
        textarea.remove();
      }
    });
  }

  function addCodeTools() {
    queryContent(['pre']).forEach(function (pre) {
      var code = pre.querySelector('code');
      if (!code || code.classList.contains('language-mermaid') || pre.querySelector('.code-copy-button')) return;

      var languageClass = Array.from(code.classList).find(function (name) {
        return name.indexOf('language-') === 0;
      });
      if (!languageClass) {
        var languageContainer = pre.closest('[class*="language-"]');
        languageClass = languageContainer && Array.from(languageContainer.classList).find(function (name) {
          return name.indexOf('language-') === 0;
        });
      }
      var language = languageClass ? languageClass.replace('language-', '') : '';
      pre.classList.add('code-block');
      if (language) pre.dataset.language = language;

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-button';
      button.textContent = '复制';
      button.setAttribute('aria-label', '复制代码');
      button.addEventListener('click', function () {
        copyText(code.textContent).then(function () {
          button.textContent = '已复制';
          window.setTimeout(function () { button.textContent = '复制'; }, 1600);
        }).catch(function () {
          button.textContent = '复制失败';
          window.setTimeout(function () { button.textContent = '复制'; }, 1600);
        });
      });
      pre.appendChild(button);
    });
  }

  function enhanceCallouts() {
    var titles = {
      note: '说明',
      tip: '提示',
      important: '要点',
      warning: '注意',
      caution: '风险'
    };

    queryContent(['blockquote']).forEach(function (blockquote) {
      var firstParagraph = blockquote.querySelector(':scope > p:first-child');
      if (!firstParagraph || blockquote.classList.contains('callout')) return;

      var marker = firstParagraph.textContent.trim().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]$/i);
      if (!marker) return;

      var type = marker[1].toLowerCase();
      var title = document.createElement('p');
      title.className = 'callout-title';
      title.textContent = titles[type];
      blockquote.classList.add('callout', 'callout--' + type);
      firstParagraph.remove();
      blockquote.prepend(title);
    });
  }

  function activateCurrentTocItem() {
    var toc = document.querySelector('.note-toc');
    if (!toc) return;

    var entries = Array.from(toc.querySelectorAll('a[href^="#"]')).map(function (anchor) {
      var id = decodeURIComponent(anchor.getAttribute('href').slice(1));
      return { anchor: anchor, heading: document.getElementById(id) };
    }).filter(function (entry) { return entry.heading; });
    if (!entries.length) return;

    function update() {
      var active = entries[0];
      var threshold = window.scrollY + 116;
      entries.forEach(function (entry) {
        if (entry.heading.offsetTop <= threshold) active = entry;
      });
      entries.forEach(function (entry) {
        entry.anchor.classList.toggle('is-active', entry === active);
        if (entry === active) entry.anchor.setAttribute('aria-current', 'location');
        else entry.anchor.removeAttribute('aria-current');
      });
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  whenReady(function () {
    enhanceTables();
    addHeadingAnchors();
    addCodeTools();
    enhanceCallouts();
    activateCurrentTocItem();
  });
})();
