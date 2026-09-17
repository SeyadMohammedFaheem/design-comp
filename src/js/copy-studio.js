/**
 * FORMA AI — Context-Aware UI Microcopy Studio
 */

export class CopyStudio {
  constructor(aiEngine, onApplyToLayoutCallback, showToastCallback) {
    this.aiEngine = aiEngine;
    this.onApplyToLayout = onApplyToLayoutCallback;
    this.showToast = showToastCallback;

    this.currentType = 'cta';
    this.currentTone = 'direct';
    this.currentLength = 'standard';
    this.activeVariants = [];
    this.selectedVariant = null;

    this.gridContainer = document.getElementById('copy-variants-grid');
    this.previewContainer = document.getElementById('context-preview-body');
    this.contextInput = document.getElementById('copy-context-input');
    this.toneBadge = document.getElementById('tone-badge-label');
    this.resultsTitle = document.getElementById('results-count-title');

    this.setupListeners();
  }

  setupListeners() {
    // Component type pills
    const compPills = document.querySelectorAll('#copy-component-grid .comp-pill');
    compPills.forEach(pill => {
      pill.addEventListener('click', () => {
        compPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentType = pill.dataset.type;
        this.updateContextPlaceholder();
        this.generate();
      });
    });

    // Tone chips
    const toneChips = document.querySelectorAll('#tone-selector .tone-chip');
    toneChips.forEach(chip => {
      chip.addEventListener('click', () => {
        toneChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentTone = chip.dataset.tone;
        if (this.toneBadge) {
          const strongText = chip.querySelector('strong')?.textContent || '';
          this.toneBadge.textContent = strongText;
        }
        this.generate();
      });
    });

    // Length control
    const lengthBtns = document.querySelectorAll('#copy-length-control .seg-btn');
    lengthBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        lengthBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentLength = btn.dataset.length;
        this.generate();
      });
    });

    // Generate button
    const generateBtn = document.getElementById('btn-generate-copy');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => this.generate());
    }

    // Export all button
    const copyAllBtn = document.getElementById('btn-copy-all');
    if (copyAllBtn) {
      copyAllBtn.addEventListener('click', () => {
        if (!this.activeVariants.length) return;
        const text = this.activeVariants.map((v, i) => `Variant ${i + 1} (${v.score}% match): "${v.text}"\nRationale: ${v.rationale}`).join('\n\n');
        navigator.clipboard.writeText(text);
        this.showToast('All copy variants copied to clipboard!');
      });
    }
  }

  updateContextPlaceholder() {
    const placeholders = {
      cta: 'Free 14-day trial signup for an AI analytics dashboard, reassuring the user there is no credit card required.',
      hero: 'Headline and subtitle for an enterprise UX telemetry platform that unifies qualitative feedback with session replays.',
      'empty-state': 'Empty state for a designer whose layout project canvas has no components yet.',
      error: 'Inline error state when a user enters an invalid corporate email domain during team invitation.',
      'value-prop': 'Feature highlight card explaining zero-retention privacy architecture for enterprise compliance.',
      modal: 'Confirmation dialog before permanently discarding uncommitted layout variants.'
    };
    if (this.contextInput && placeholders[this.currentType]) {
      this.contextInput.value = placeholders[this.currentType];
    }
  }

  async generate() {
    const context = this.contextInput ? this.contextInput.value : '';
    const variants = await this.aiEngine.generateUICopy({
      type: this.currentType,
      context,
      tone: this.currentTone,
      length: this.currentLength
    });

    this.activeVariants = variants;
    this.selectedVariant = variants[0] || null;
    this.render();
  }

  render() {
    this.gridContainer.innerHTML = '';
    this.resultsTitle.textContent = `${this.activeVariants.length} Copy Variants for ${this.getComponentLabel()}`;

    this.activeVariants.forEach((v, idx) => {
      const card = document.createElement('div');
      card.className = `copy-card ${v === this.selectedVariant ? 'highlighted' : ''}`;

      const charCount = v.text.length;
      const readingGrade = charCount < 30 ? 'Grade 4 (Very Direct)' : charCount < 70 ? 'Grade 6 (Standard)' : 'Grade 8 (Detailed)';

      card.innerHTML = `
        <div class="copy-card-top">
          <span class="copy-badge-label ${v.rec ? 'recommended' : ''}">${v.rec ? '★ AI Recommended' : `Option ${idx + 1}`}</span>
          <span class="copy-char-badge">${charCount} chars · ${readingGrade}</span>
        </div>
        <div class="copy-text-main">“${v.text}”</div>
        <div class="copy-rationale">${v.rationale}</div>
        <div class="copy-metrics-row">
          <span class="metric-pill">🎯 <strong>${v.score}%</strong> Clarity Index</span>
          <span class="metric-pill">⚡ <strong>0.3s</strong> Cognitive Load</span>
        </div>
        <div class="copy-actions-row">
          <button class="btn btn-secondary btn-xs btn-copy-one">Copy Text</button>
          <button class="btn btn-outline btn-xs btn-apply-canvas">Apply to Canvas</button>
        </div>
      `;

      // Copy text event
      card.querySelector('.btn-copy-one')?.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(v.text);
        this.showToast(`Copied: "${v.text}"`);
      });

      // Apply to canvas event
      card.querySelector('.btn-apply-canvas')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onApplyToLayout) {
          this.onApplyToLayout(v.text);
          this.showToast(`Applied "${v.text}" to layout block!`);
        }
      });

      // Select variant for mockup preview
      card.addEventListener('click', () => {
        this.selectedVariant = v;
        document.querySelectorAll('.copy-card').forEach(c => c.classList.remove('highlighted'));
        card.classList.add('highlighted');
        this.renderPreview();
      });

      this.gridContainer.appendChild(card);
    });

    this.renderPreview();
  }

  renderPreview() {
    if (!this.previewContainer || !this.selectedVariant) return;

    const text = this.selectedVariant.text;

    if (this.currentType === 'cta') {
      this.previewContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <button class="btn btn-primary" style="font-size: 14px; padding: 10px 24px; font-weight: 600;">
            ${text}
          </button>
          <span style="font-size: 11px; color: var(--text-muted);">No credit card required · Cancel anytime</span>
        </div>
      `;
    } else if (this.currentType === 'hero') {
      this.previewContainer.innerHTML = `
        <div style="text-align: center; max-width: 520px; display: flex; flex-direction: column; gap: 10px;">
          <span class="badge" style="background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 99px; align-self: center;">Next-Gen Telemetry</span>
          <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: var(--text-primary); line-height: 1.25;">
            ${text}
          </h2>
          <p style="font-size: 13px; color: var(--text-secondary);">
            Empower your entire product team with autonomous usability insight clustering and instant wireframe iterations.
          </p>
          <div style="display: flex; justify-content: center; gap: 8px; margin-top: 4px;">
            <button class="btn btn-primary btn-sm">Start Free Trial</button>
            <button class="btn btn-secondary btn-sm">Watch 2m Demo</button>
          </div>
        </div>
      `;
    } else if (this.currentType === 'empty-state') {
      this.previewContainer.innerHTML = `
        <div style="text-align: center; max-width: 400px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 20px;">
            📂
          </div>
          <strong style="font-size: 14px; color: var(--text-primary);">${text}</strong>
          <p style="font-size: 12px; color: var(--text-muted);">Start brainstorming with one click to see wireframe recommendations.</p>
          <button class="btn btn-primary btn-sm" style="margin-top: 4px;">+ Create New Wireframe</button>
        </div>
      `;
    } else if (this.currentType === 'error') {
      this.previewContainer.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px; background: #fff1f2; border: 1px solid #fecdd3; padding: 14px 18px; border-radius: 8px; max-width: 480px;">
          <span style="font-size: 16px;">⚠️</span>
          <div style="display: flex; flex-direction: column; gap: 3px;">
            <strong style="font-size: 13px; color: #9f1239;">Sync Interrupted</strong>
            <span style="font-size: 12px; color: #be123c;">${text}</span>
          </div>
          <button class="btn btn-secondary btn-xs" style="margin-left: auto;">Retry</button>
        </div>
      `;
    } else {
      this.previewContainer.innerHTML = `
        <div style="padding: 16px; border: 1px solid var(--border-default); border-radius: 8px; background: #ffffff; max-width: 360px;">
          <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${text}</div>
          <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">High-impact value proposition component designed for maximum retention.</p>
        </div>
      `;
    }
  }

  getComponentLabel() {
    const labels = {
      cta: 'Button & Call to Action',
      hero: 'Hero Headline',
      'empty-state': 'Empty State',
      error: 'Error & Toast Alerts',
      'value-prop': 'Feature Value Prop',
      modal: 'Modal Dialog'
    };
    return labels[this.currentType] || 'Microcopy';
  }
}
