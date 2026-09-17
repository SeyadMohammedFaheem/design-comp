/**
 * FORMA AI — Layout Canvas & Wireframe Workspace Manager
 */

export class LayoutCanvas {
  constructor(aiEngine, onSelectBlockCallback) {
    this.aiEngine = aiEngine;
    this.onSelectBlock = onSelectBlockCallback;
    this.blocks = [];
    this.selectedBlockId = null;
    this.viewport = 'desktop';
    this.archetype = 'all';
    this.fidelity = 'hi-fi';
    this.showGrid = false;

    this.container = document.getElementById('canvas-content');
    this.viewportFrame = document.getElementById('canvas-viewport');
    this.treeListEl = document.getElementById('block-tree-list');
    this.blockCountBadge = document.getElementById('block-count-badge');
    this.urlText = document.getElementById('canvas-url-text');

    this.setupListeners();
  }

  setupListeners() {
    // Grid toggle
    const gridBtn = document.getElementById('btn-toggle-grid');
    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        this.showGrid = !this.showGrid;
        this.viewportFrame.classList.toggle('show-grid', this.showGrid);
      });
    }

    // Move Up / Down / Delete block buttons in inspector
    const moveUpBtn = document.getElementById('btn-move-up');
    const moveDownBtn = document.getElementById('btn-move-down');
    const removeBtn = document.getElementById('btn-remove-block');

    if (moveUpBtn) moveUpBtn.addEventListener('click', () => this.moveSelectedBlock(-1));
    if (moveDownBtn) moveDownBtn.addEventListener('click', () => this.moveSelectedBlock(1));
    if (removeBtn) removeBtn.addEventListener('click', () => this.deleteSelectedBlock());

    // Block title edit
    const editTitle = document.getElementById('edit-block-title');
    if (editTitle) {
      editTitle.addEventListener('input', (e) => {
        if (!this.selectedBlockId) return;
        const blk = this.blocks.find(b => b.id === this.selectedBlockId);
        if (blk) {
          blk.title = e.target.value;
          this.renderTree();
        }
      });
    }
  }

  setViewport(viewport) {
    this.viewport = viewport;
    this.viewportFrame.className = `canvas-viewport ${viewport}-view ${this.fidelity === 'wireframe' ? 'wireframe-mode' : ''} ${this.showGrid ? 'show-grid' : ''}`;
    
    if (viewport === 'mobile') {
      this.urlText.textContent = 'forma.app/mobile';
    } else if (viewport === 'tablet') {
      this.urlText.textContent = 'tablet.forma.design';
    } else {
      this.urlText.textContent = 'app.forma.design/prototype';
    }
  }

  setFidelity(fidelity) {
    this.fidelity = fidelity;
    this.viewportFrame.classList.toggle('wireframe-mode', fidelity === 'wireframe');
    this.renderCanvas();
  }

  setArchetype(archetype) {
    this.archetype = archetype;
    this.renderCanvas();
  }

  async loadPrompt(prompt) {
    const blocks = await this.aiEngine.brainstormLayout(prompt, this.archetype, this.viewport);
    this.blocks = blocks;
    this.selectedBlockId = blocks.length > 0 ? blocks[0].id : null;
    this.render();
  }

  addNewBlock() {
    const newId = 'blk-' + Date.now();
    const newBlock = {
      id: newId,
      title: 'Custom Feature Section',
      type: 'bento',
      visible: true,
      content: {
        items: [
          { title: 'New Interactive Component', desc: 'Custom configured block generated for your layout.', span: 2 },
          { title: 'Telemetry Metrics', desc: 'Real-time observation node.', span: 1 }
        ]
      }
    };
    this.blocks.push(newBlock);
    this.selectedBlockId = newId;
    this.render();
  }

  moveSelectedBlock(direction) {
    if (!this.selectedBlockId) return;
    const idx = this.blocks.findIndex(b => b.id === this.selectedBlockId);
    if (idx === -1) return;

    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= this.blocks.length) return;

    const item = this.blocks.splice(idx, 1)[0];
    this.blocks.splice(targetIdx, 0, item);
    this.render();
  }

  deleteSelectedBlock() {
    if (!this.selectedBlockId) return;
    this.blocks = this.blocks.filter(b => b.id !== this.selectedBlockId);
    this.selectedBlockId = this.blocks.length > 0 ? this.blocks[0].id : null;
    this.render();
  }

  selectBlock(blockId) {
    this.selectedBlockId = blockId;
    this.render();
    if (this.onSelectBlock) {
      const blk = this.blocks.find(b => b.id === blockId);
      this.onSelectBlock(blk);
    }
  }

  updateSelectedBlockCopy(newText) {
    if (!this.selectedBlockId) return;
    const blk = this.blocks.find(b => b.id === this.selectedBlockId);
    if (!blk) return;

    if (blk.content.headline) blk.content.headline = newText;
    else if (blk.content.title) blk.content.title = newText;
    else if (blk.content.subtitle) blk.content.subtitle = newText;
    else if (blk.content.items && blk.content.items[0]) blk.content.items[0].title = newText;

    this.render();
  }

  render() {
    this.renderCanvas();
    this.renderTree();
    this.updateInspectorForm();
  }

  renderCanvas() {
    this.container.innerHTML = '';

    const filtered = this.blocks.filter(b => {
      if (!b.visible) return false;
      if (this.archetype === 'all') return true;
      if (this.archetype === 'bento') return b.type === 'bento';
      if (this.archetype === 'split') return b.type === 'split-chart';
      if (this.archetype === 'cards') return b.type === 'metrics';
      if (this.archetype === 'feed') return b.type === 'feed';
      return true;
    });

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="mock-hero" style="padding: 40px 20px;">
          <p class="text-muted">No blocks match the current archetype filter (${this.archetype}).</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filter">Reset Filter to All</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filter');
      if (resetBtn) resetBtn.addEventListener('click', () => {
        document.querySelectorAll('#archetype-control .seg-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('#archetype-control [data-archetype="all"]')?.classList.add('active');
        this.setArchetype('all');
      });
      return;
    }

    filtered.forEach(b => {
      const blockEl = document.createElement('div');
      blockEl.className = `layout-block ${b.id === this.selectedBlockId ? 'selected' : ''}`;
      blockEl.setAttribute('data-id', b.id);

      const tag = document.createElement('span');
      tag.className = 'block-pill-tag';
      tag.textContent = b.title;
      blockEl.appendChild(tag);

      // Render block contents depending on type
      if (b.type === 'navbar') {
        blockEl.innerHTML += `
          <div class="mock-navbar">
            <strong style="font-size: 14px; font-weight: 700;">${b.content.brand}</strong>
            <div class="mock-nav-links">
              ${b.content.links.map(l => `<span>${l}</span>`).join('')}
            </div>
            <div class="user-chip" style="font-weight: 600; color: var(--accent-blue);">${b.content.user}</div>
          </div>
        `;
      } else if (b.type === 'hero') {
        blockEl.innerHTML += `
          <div class="mock-hero">
            <h1>${b.content.title}</h1>
            ${b.content.amount ? `<div style="font-size: 34px; font-weight: 800; letter-spacing: -0.02em; color: var(--text-primary);">${b.content.amount}</div>` : ''}
            <p>${b.content.subtitle}</p>
            <div class="mock-hero-actions">
              ${b.content.actions.map((act, i) => `
                <button class="btn ${i === 0 ? 'btn-primary' : 'btn-secondary'} btn-sm">${act}</button>
              `).join('')}
            </div>
          </div>
        `;
      } else if (b.type === 'metrics') {
        blockEl.innerHTML += `
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary);">${b.content.headline}</div>
            <div class="mock-metrics-grid">
              ${b.content.metrics.map(m => `
                <div class="mock-stat-card">
                  <span style="font-size: 11px; color: var(--text-muted); font-weight: 500;">${m.label}</span>
                  <div class="mock-stat-val">${m.value}</div>
                  <span style="font-size: 11px; font-weight: 600; color: ${m.trend === 'up' ? '#059669' : m.trend === 'down' ? '#e11d48' : '#64748b'};">${m.change}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (b.type === 'bento') {
        blockEl.innerHTML += `
          <div class="mock-bento-grid">
            ${b.content.items.map(item => `
              <div class="bento-card ${item.span === 2 ? 'col-span-2' : ''}">
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${item.title}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        `;
      } else if (b.type === 'split-chart') {
        blockEl.innerHTML += `
          <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; align-items: center;">
            <div>
              <span class="badge" style="font-size: 10px; font-weight: 700; background: #eff6ff; color: #2563eb; padding: 2px 6px; border-radius: 4px;">${b.content.tag || 'Interactive'}</span>
              <h2 style="font-size: 18px; font-weight: 700; margin-top: 6px;">${b.content.title}</h2>
              <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${b.content.subtitle}</p>
              ${b.content.price ? `<div style="font-size: 22px; font-weight: 800; margin-top: 8px;">${b.content.price}</div>` : ''}
            </div>
            <div style="background: #f8fafc; border: 1px solid var(--border-default); border-radius: 8px; padding: 16px; text-align: center;">
              <svg width="100%" height="80" viewBox="0 0 200 80" fill="none">
                <path d="M5 70 C 40 40, 80 65, 120 25 C 150 5, 180 30, 195 15" stroke="#2563eb" stroke-width="3" fill="none"/>
                <circle cx="120" cy="25" r="4" fill="#2563eb"/>
                <circle cx="195" cy="15" r="4" fill="#059669"/>
              </svg>
              <span style="font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);">Telemetry Visualizer Active</span>
            </div>
          </div>
        `;
      } else if (b.type === 'feed') {
        blockEl.innerHTML += `
          <div>
            <div style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">${b.content.title}</div>
            <table class="mock-table">
              <thead>
                <tr>
                  <th>Actor / Event</th>
                  <th>Action Detail</th>
                  <th>Time / Status</th>
                </tr>
              </thead>
              <tbody>
                ${b.content.events.map(ev => `
                  <tr>
                    <td><strong>${ev.user}</strong></td>
                    <td>${ev.action}</td>
                    <td style="font-family: var(--font-mono); font-size: 11px;">${ev.time}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      blockEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectBlock(b.id);
      });

      this.container.appendChild(blockEl);
    });

    this.blockCountBadge.textContent = `${this.blocks.length} blocks`;
  }

  renderTree() {
    this.treeListEl.innerHTML = '';
    this.blocks.forEach((b, idx) => {
      const item = document.createElement('div');
      item.className = `tree-item ${b.id === this.selectedBlockId ? 'active' : ''}`;
      item.innerHTML = `
        <span style="font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${idx + 1}. ${b.title}</span>
        <div class="tree-item-actions">
          <button class="icon-action-btn btn-toggle-vis" title="Toggle visibility">
            ${b.visible ? '👁️' : '🙈'}
          </button>
        </div>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.closest('.btn-toggle-vis')) {
          b.visible = !b.visible;
          this.render();
          return;
        }
        this.selectBlock(b.id);
      });

      this.treeListEl.appendChild(item);
    });
  }

  updateInspectorForm() {
    const sel = this.blocks.find(b => b.id === this.selectedBlockId);
    const titleInput = document.getElementById('edit-block-title');
    const typeSelect = document.getElementById('edit-block-archetype');

    if (sel && titleInput) {
      titleInput.value = sel.title;
      if (typeSelect) typeSelect.value = sel.type === 'split-chart' ? 'split' : sel.type === 'bento' ? 'bento' : sel.type === 'hero' ? 'full' : 'list';
    }
  }

  getSelectedBlock() {
    return this.blocks.find(b => b.id === this.selectedBlockId);
  }

  exportCleanHTML() {
    return `<!-- FORMA AI Generated Layout Wireframe -->
<div class="forma-layout-wrapper" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 1040px; margin: 0 auto; padding: 24px; display: flex; flex-direction: column; gap: 20px;">
${this.blocks.filter(b => b.visible).map(b => `  <!-- Section: ${b.title} (${b.type}) -->
  <section id="${b.id}" class="forma-section" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; background: #ffffff;">
    ${JSON.stringify(b.content, null, 2)}
  </section>`).join('\n\n')}
</div>`;
  }

  exportJSON() {
    return JSON.stringify({
      generator: 'Forma AI Layout Studio v1.0',
      timestamp: new Date().toISOString(),
      viewport: this.viewport,
      blocks: this.blocks
    }, null, 2);
  }
}
