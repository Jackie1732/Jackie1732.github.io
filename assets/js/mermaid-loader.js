import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.16.0/dist/mermaid.esm.min.mjs';

function whenReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
    return;
  }
  callback();
}

whenReady(async function () {
  var sourceBlocks = Array.from(document.querySelectorAll('.post-content pre > code.language-mermaid, .page-content pre > code.language-mermaid, .note-content pre > code.language-mermaid'));
  if (!sourceBlocks.length) return;

  var replacements = sourceBlocks.map(function (code) {
    var pre = code.parentElement;
    var diagram = document.createElement('div');
    diagram.className = 'mermaid';
    diagram.textContent = code.textContent;
    pre.replaceWith(diagram);
    return { pre: pre, diagram: diagram };
  });

  try {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'dark',
      flowchart: {
        htmlLabels: false,
        useMaxWidth: true
      }
    });
    await mermaid.run({ nodes: replacements.map(function (item) { return item.diagram; }) });
  } catch (error) {
    replacements.forEach(function (item) {
      if (item.diagram.isConnected) item.diagram.replaceWith(item.pre);
    });
    console.warn('Mermaid could not render this page; source diagrams were kept as code blocks.', error);
  }
});
