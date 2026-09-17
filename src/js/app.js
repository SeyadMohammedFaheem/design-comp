/**
 * FORMA — Minimal Light UI Prototype
 * Simple, streamlined, elegant prototype for Layouts, UI Copy, and Usability Feedback.
 */

// ==========================================================================
// 1. DATA PRESETS
// ==========================================================================

const LAYOUT_PRESETS = {
  saas: {
    title: 'SaaS Analytics Dashboard',
    html: `
      <div class="ui-nav">
        <strong>ApexAnalytics</strong>
        <div class="ui-nav-links">
          <span>Overview</span>
          <span>Funnels</span>
          <span>Cohorts</span>
          <span>Settings</span>
        </div>
        <span style="font-weight: 600; color: #2563eb;">Alex (Pro)</span>
      </div>

      <div class="ui-hero" style="padding: 14px 0; text-align: left; align-items: flex-start;">
        <h1 style="font-size: 18px;">Product Telemetry & Conversion Velocity</h1>
        <p style="font-size: 12px;">Real-time event stream tracking 1.2M active user sessions.</p>
      </div>

      <div class="ui-metrics-row">
        <div class="ui-stat">
          <span class="ui-stat-label">Monthly Recurring Revenue</span>
          <span class="ui-stat-num">$128,450</span>
          <span class="ui-stat-badge">+14.2% this month</span>
        </div>
        <div class="ui-stat">
          <span class="ui-stat-label">Active Retention (W4)</span>
          <span class="ui-stat-num">64.8%</span>
          <span class="ui-stat-badge">+3.1% vs baseline</span>
        </div>
        <div class="ui-stat">
          <span class="ui-stat-label">Checkout Conversion</span>
          <span class="ui-stat-num">4.2%</span>
          <span class="ui-stat-badge" style="color: #71717a;">Within target range</span>
        </div>
      </div>

      <div class="ui-chart-card">
        <div class="ui-chart-head">
          <span>Daily Active User Growth (30 Days)</span>
          <span style="color: #2563eb; font-size: 11px;">Live Stream</span>
        </div>
        <svg class="ui-chart-svg" viewBox="0 0 400 90" fill="none">
          <path d="M10 80 C 80 40, 150 70, 220 25 C 290 5, 340 30, 390 15" stroke="#18181b" stroke-width="2.5" fill="none"/>
          <circle cx="220" cy="25" r="4" fill="#18181b"/>
          <circle cx="390" cy="15" r="4" fill="#10b981"/>
        </svg>
      </div>

      <div class="ui-feed">
        <div class="ui-feed-title">Recent Audit Events</div>
        <div class="ui-feed-item">
          <span>Sarah K. exported weekly churn summary</span>
          <span style="font-family: monospace;">14m ago</span>
        </div>
        <div class="ui-feed-item">
          <span>Enterprise SSO policy updated by DevSec</span>
          <span style="font-family: monospace;">1h ago</span>
        </div>
      </div>
    `
  },
  ecommerce: {
    title: 'Minimalist E-Commerce Product Page',
    html: `
      <div class="ui-nav">
        <strong>Komorebi Objects</strong>
        <div class="ui-nav-links">
          <span>Apparel</span>
          <span>Objects</span>
          <span>Archive</span>
        </div>
        <span>Bag (2)</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center; padding: 10px 0;">
        <div style="background: #f4f4f5; height: 180px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #71717a; font-size: 13px;">
          Product Image Preview
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Kyoto Craft Series</span>
          <h1 style="font-size: 20px; font-weight: 700;">Cast Iron Kettle (0.9L)</h1>
          <div style="font-size: 16px; font-weight: 700;">$180.00</div>
          <p style="font-size: 12px; color: #71717a;">Handcrafted ironware with precision pour spout and heat-resistant walnut handle.</p>
          <div style="display: flex; gap: 8px; margin-top: 6px;">
            <button class="btn-primary" style="flex: 1;">Add to Cart</button>
            <button class="btn-secondary">Wishlist</button>
          </div>
        </div>
      </div>

      <div class="ui-feed">
        <div class="ui-feed-title">Customer Feedback (4.9 / 5.0)</div>
        <div class="ui-feed-item">
          <span>"Exceptional balance and understated matte finish." — Elena</span>
          <span>★★★★★</span>
        </div>
      </div>
    `
  },
  mobileBanking: {
    title: 'Mobile Banking Overview',
    html: `
      <div class="ui-hero" style="padding: 10px 0;">
        <span style="font-size: 11px; color: #71717a;">Total Balance</span>
        <div style="font-size: 30px; font-weight: 800; letter-spacing: -0.02em;">$24,850.20</div>
        <div class="ui-hero-actions">
          <button class="btn-primary" style="font-size: 11px; padding: 6px 14px;">Send Money</button>
          <button class="btn-secondary" style="font-size: 11px; padding: 6px 14px;">Add Cash</button>
        </div>
      </div>

      <div class="ui-metrics-row" style="grid-template-columns: 1fr 1fr;">
        <div class="ui-stat">
          <span class="ui-stat-label">Emergency Vault</span>
          <span class="ui-stat-num">$12,000</span>
          <span class="ui-stat-badge">4.8% APY</span>
        </div>
        <div class="ui-stat">
          <span class="ui-stat-label">Monthly Spend</span>
          <span class="ui-stat-num">$1,420</span>
          <span class="ui-stat-badge" style="color: #71717a;">$580 left</span>
        </div>
      </div>

      <div class="ui-feed">
        <div class="ui-feed-title">Recent Activity</div>
        <div class="ui-feed-item">
          <span>Coffee Roastery</span>
          <span style="font-weight: 600;">-$4.50</span>
        </div>
        <div class="ui-feed-item">
          <span>Direct Payout</span>
          <span style="font-weight: 600; color: #10b981;">+$2,800.00</span>
        </div>
      </div>
    `
  },
  onboarding: {
    title: 'User Onboarding Flow',
    html: `
      <div class="ui-nav">
        <strong>Forma Workspace</strong>
        <span>Step 2 of 3</span>
      </div>

      <div class="ui-hero">
        <h1>Connect Your Workspace</h1>
        <p>Choose an identity provider to activate single sign-on and automated team invitations.</p>
        <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 320px; margin-top: 10px;">
          <button class="btn-primary">Continue with Google Workspace</button>
          <button class="btn-secondary">Configure Custom SAML SSO</button>
        </div>
      </div>

      <div class="ui-metrics-row" style="margin-top: 10px;">
        <div class="ui-stat">
          <span class="ui-stat-label">SOC2 Certified</span>
          <span style="font-size: 12px; font-weight: 600;">Audited 2026</span>
        </div>
        <div class="ui-stat">
          <span class="ui-stat-label">Encryption</span>
          <span style="font-size: 12px; font-weight: 600;">AES-256 At Rest</span>
        </div>
      </div>
    `
  }
};

const COPY_DATA = {
  cta: {
    direct: [
      { text: 'Start 14-Day Free Trial', sub: 'Clear, zero ambiguity, highest conversion' },
      { text: 'Access Dashboard Free', sub: 'Immediate access with zero upfront barrier' },
      { text: 'Explore the Platform', sub: 'Low commitment for initial evaluation' }
    ],
    friendly: [
      { text: 'Take It for a Spin — Free!', sub: 'Playful, welcoming invitation' },
      { text: 'Hop In (No Card Needed)', sub: 'Alleviates payment skepticism warmly' },
      { text: 'Let’s Build Something Great', sub: 'Inspires creative confidence' }
    ],
    formal: [
      { text: 'Initiate Enterprise Evaluation', sub: 'Suited for procurement and IT reviews' },
      { text: 'Deploy Secure Proof of Concept', sub: 'Emphasizes enterprise compliance' },
      { text: 'Request Dedicated Instance', sub: 'High-value account authorization' }
    ]
  },
  hero: {
    direct: [
      { text: 'Turn raw data into clear product decisions.', sub: 'Focuses on direct outcome without buzzwords' },
      { text: 'The analytics copilot for fast product teams.', sub: 'Clean category definition' },
      { text: 'Measure what matters. Ship what works.', sub: 'Punchy, memorable cadence' }
    ],
    friendly: [
      { text: 'Stop guessing why users drop off. Let’s ask the data.', sub: 'Conversational hook that sparks curiosity' },
      { text: 'Analytics so clean, your spreadsheets will get jealous.', sub: 'Warm product manager humor' },
      { text: 'Your team deserves better than blindfolded design.', sub: 'Relatable, encouraging tone' }
    ],
    formal: [
      { text: 'Unified telemetry for mission-critical web applications.', sub: 'High technical authority' },
      { text: 'Accelerate digital velocity with verified UX benchmarks.', sub: 'Boardroom-aligned executive focus' },
      { text: 'Deterministic user intelligence at multi-million scale.', sub: 'Signals engineering robustness' }
    ]
  },
  empty: {
    direct: [
      { text: 'No active prototypes. Tap Generate to begin.', sub: 'Shortest possible instruction' },
      { text: 'Workspace is clean and ready for your first layout.', sub: 'Reframes blank state positively' }
    ],
    friendly: [
      { text: 'A fresh blank canvas! What shall we build first?', sub: 'Warm, collaborative prompt' },
      { text: 'Nothing here yet. Pick a preset above to see magic.', sub: 'Friendly guide for newcomers' }
    ],
    formal: [
      { text: 'No configurations detected in current workspace.', sub: 'Neutral system state' },
      { text: 'Initialize repository by selecting a design template.', sub: 'Structured compliance instruction' }
    ]
  },
  error: {
    direct: [
      { text: 'Unable to reach server. Your work is saved locally.', sub: 'Reassures user of data safety' },
      { text: 'Network connection paused. Click to retry.', sub: 'Clear recovery action' }
    ],
    friendly: [
      { text: 'Whoops! We hit a brief bump. Tap retry to reconnect.', sub: 'Disarming, non-technical' },
      { text: 'Looks like the Wi-Fi blinked. Don’t worry, your work is safe!', sub: 'Human empathy and reassurance' }
    ],
    formal: [
      { text: 'Network handshake failed (HTTP 503). Retrying in 5s.', sub: 'Precise diagnostic notice' },
      { text: 'Session timed out. Please authenticate your credentials.', sub: 'Security protocol specification' }
    ]
  }
};

const FEEDBACK_SAMPLES = {
  checkout: `Participant 1: "I added the item to my bag, but when I reached checkout, I couldn't see shipping costs until after I typed my full address. That made me hesitate."
Participant 2: "The 'Proceed' button was ambiguous. Does 'Proceed' mean submit payment or review my order? I almost abandoned."
Participant 3: "On mobile Safari, the keyboard popped up and completely hid the 'Complete Purchase' button."
Participant 4: "I wanted to use Apple Pay. Having to type a 16-digit card felt slow."
Participant 5: "There are no security badges or return guarantees visible on the final step."`,

  onboard: `Participant 1: "During sign up, you asked me for my company size and phone number before I even saw the app. Felt like too much friction."
Participant 2: "The welcome screen just dropped me onto an empty page with no starter templates."
Participant 3: "The copy on the cloud permission dialog felt intimidating and unclear."
Participant 4: "I love the clean design, but please provide a 30-second interactive tour."`
};

// ==========================================================================
// 2. APP LOGIC
// ==========================================================================

class FormaPrototype {
  constructor() {
    this.initTabs();
    this.initLayoutModule();
    this.initCopyModule();
    this.initUsabilityModule();
  }

  showToast(text) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  initTabs() {
    const tabs = document.querySelectorAll('.nav-tabs .tab-btn');
    const views = document.querySelectorAll('.view');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        views.forEach(v => v.classList.remove('active'));

        tab.classList.add('active');
        const targetView = document.getElementById(`view-${tab.dataset.view}`);
        if (targetView) targetView.classList.add('active');
      });
    });
  }

  // Layout Brainstormer
  initLayoutModule() {
    const frame = document.getElementById('canvas-frame');
    const preview = document.getElementById('layout-preview');
    const promptInput = document.getElementById('layout-prompt');
    const generateBtn = document.getElementById('btn-run-layout');
    const deviceBtns = document.querySelectorAll('.device-btn');
    const presetTags = document.querySelectorAll('.quick-tags .tag');

    const renderPreset = (key) => {
      const data = LAYOUT_PRESETS[key] || LAYOUT_PRESETS.saas;
      if (preview) preview.innerHTML = data.html;
    };

    // Initial render
    renderPreset('saas');

    // Device switcher
    deviceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        deviceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (btn.dataset.device === 'mobile') {
          frame.className = 'canvas-frame mobile';
          renderPreset('mobileBanking');
        } else {
          frame.className = 'canvas-frame desktop';
          renderPreset('saas');
        }
      });
    });

    // Preset tag clicks
    presetTags.forEach((tag, idx) => {
      tag.addEventListener('click', () => {
        presetTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const prompt = tag.dataset.prompt;
        if (promptInput) promptInput.value = prompt;

        const keys = ['saas', 'ecommerce', 'mobileBanking', 'onboarding'];
        renderPreset(keys[idx % keys.length]);
        this.showToast(`Switched layout: ${tag.textContent}`);
      });
    });

    // Generate button
    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        const text = promptInput.value.toLowerCase();
        if (text.includes('e-commerce') || text.includes('shop') || text.includes('product')) {
          renderPreset('ecommerce');
        } else if (text.includes('bank') || text.includes('mobile') || text.includes('card')) {
          renderPreset('mobileBanking');
        } else if (text.includes('onboard') || text.includes('wizard')) {
          renderPreset('onboarding');
        } else {
          renderPreset('saas');
        }
        this.showToast('Brainstormed layout updated!');
      });
    }
  }

  // UI Copy Generator
  initCopyModule() {
    const targetPills = document.querySelectorAll('#view-copy [data-target]');
    const tonePills = document.querySelectorAll('#view-copy [data-tone]');
    const contextInput = document.getElementById('copy-context');
    const generateBtn = document.getElementById('btn-run-copy');
    const container = document.getElementById('copy-cards-container');
    const liveBox = document.getElementById('copy-live-preview');

    let currentTarget = 'cta';
    let currentTone = 'direct';

    const renderCopyCards = () => {
      const targetData = COPY_DATA[currentTarget] || COPY_DATA.cta;
      const variants = targetData[currentTone] || targetData.direct;

      if (!container) return;
      container.innerHTML = '';

      variants.forEach((v, idx) => {
        const item = document.createElement('div');
        item.className = `copy-item ${idx === 0 ? 'active-preview' : ''}`;
        item.innerHTML = `
          <div class="copy-info">
            <span class="copy-text">“${v.text}”</span>
            <span class="copy-sub">${v.sub}</span>
          </div>
          <div class="copy-actions">
            <button class="btn-secondary btn-use">Preview</button>
            <button class="btn-secondary btn-copy">Copy</button>
          </div>
        `;

        // Preview button
        item.querySelector('.btn-use')?.addEventListener('click', () => {
          document.querySelectorAll('.copy-item').forEach(i => i.classList.remove('active-preview'));
          item.classList.add('active-preview');
          this.updateLiveMockup(currentTarget, v.text);
        });

        // Copy button
        item.querySelector('.btn-copy')?.addEventListener('click', () => {
          navigator.clipboard.writeText(v.text);
          this.showToast(`Copied: "${v.text}"`);
        });

        container.appendChild(item);
      });

      // Update live preview with first item
      if (variants[0]) {
        this.updateLiveMockup(currentTarget, variants[0].text);
      }
    };

    targetPills.forEach(p => {
      p.addEventListener('click', () => {
        targetPills.forEach(pill => pill.classList.remove('active'));
        p.classList.add('active');
        currentTarget = p.dataset.target;

        if (currentTarget === 'cta') {
          contextInput.value = '14-day free trial signup for a modern SaaS tool. Reassure the user that no credit card is required.';
        } else if (currentTarget === 'hero') {
          contextInput.value = 'Hero headline for an intuitive product analytics dashboard that reduces user drop-off.';
        } else if (currentTarget === 'empty') {
          contextInput.value = 'Clean empty state for a design workspace when no files are open.';
        } else {
          contextInput.value = 'Inline warning alert when offline or unable to reach sync server.';
        }

        renderCopyCards();
      });
    });

    tonePills.forEach(p => {
      p.addEventListener('click', () => {
        tonePills.forEach(pill => pill.classList.remove('active'));
        p.classList.add('active');
        currentTone = p.dataset.tone;
        renderCopyCards();
      });
    });

    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        renderCopyCards();
        this.showToast('Generated fresh UI copy options!');
      });
    }

    renderCopyCards();
  }

  updateLiveMockup(type, text) {
    const liveBox = document.getElementById('copy-live-preview');
    if (!liveBox) return;

    if (type === 'cta') {
      liveBox.innerHTML = `
        <button class="btn-primary" style="padding: 10px 24px; font-size: 14px;">${text}</button>
        <span class="preview-sub">No credit card required · Instant access</span>
      `;
    } else if (type === 'hero') {
      liveBox.innerHTML = `
        <h2 style="font-size: 22px; font-weight: 700; text-align: center; max-width: 480px; letter-spacing: -0.02em;">${text}</h2>
        <span class="preview-sub">Empowering modern product teams with instant clarity.</span>
      `;
    } else if (type === 'empty') {
      liveBox.innerHTML = `
        <div style="font-size: 24px;">📂</div>
        <strong style="font-size: 14px;">${text}</strong>
        <span class="preview-sub">Start with a template or import existing work.</span>
      `;
    } else {
      liveBox.innerHTML = `
        <div style="background: #fef2f2; border: 1px solid #fecdd3; padding: 12px 16px; border-radius: 6px; display: flex; align-items: center; gap: 8px;">
          <span>⚠️</span>
          <span style="font-size: 13px; color: #b91c1c; font-weight: 600;">${text}</span>
        </div>
      `;
    }
  }

  // Usability Feedback Synthesizer
  initUsabilityModule() {
    const input = document.getElementById('feedback-input');
    const sampleChips = document.querySelectorAll('.sample-chips .tag');
    const runBtn = document.getElementById('btn-run-feedback');
    const issuesBox = document.getElementById('issues-container');
    const recsBox = document.getElementById('recs-container');
    const mFriction = document.getElementById('m-friction');
    const mSentiment = document.getElementById('m-sentiment');
    const mIssues = document.getElementById('m-issues');

    const renderFeedbackReport = (sampleKey) => {
      if (sampleKey === 'checkout') {
        if (input) input.value = FEEDBACK_SAMPLES.checkout;
        if (mFriction) mFriction.textContent = '68 / 100';
        if (mSentiment) mSentiment.textContent = '60% Negative';
        if (mIssues) mIssues.textContent = '3 Critical';

        if (issuesBox) {
          issuesBox.innerHTML = `
            <div class="issue-card">
              <span class="issue-title">Hidden Shipping Costs Until Final Step</span>
              <span class="issue-quote">"I couldn't see shipping until I entered my full address... made me hesitate."</span>
            </div>
            <div class="issue-card">
              <span class="issue-title">Ambiguous CTA ("Proceed" vs "Place Order")</span>
              <span class="issue-quote">"Does 'Proceed' mean submit payment or review my order? I almost abandoned."</span>
            </div>
            <div class="issue-card">
              <span class="issue-title">Mobile Keyboard Obscuring Confirmation Button</span>
              <span class="issue-quote">"The credit card keyboard popped up and completely hid the purchase button."</span>
            </div>
          `;
        }

        if (recsBox) {
          recsBox.innerHTML = `
            <div class="rec-item">
              <div>
                <div class="rec-item-title">1. Split-Screen Order Summary</div>
                <div class="rec-item-desc">Display real-time itemized shipping & taxes on right side of screen.</div>
              </div>
            </div>
            <div class="rec-item">
              <div>
                <div class="rec-item-title">2. Rename CTA to "Review Order & Shipping"</div>
                <div class="rec-item-desc">Removes premature financial commitment anxiety.</div>
              </div>
            </div>
            <div class="rec-item">
              <div>
                <div class="rec-item-title">3. Add Apple Pay / Google Pay One-Tap Button</div>
                <div class="rec-item-desc">Bypasses multi-field mobile checkout form completely.</div>
              </div>
            </div>
          `;
        }
      } else {
        if (input) input.value = FEEDBACK_SAMPLES.onboard;
        if (mFriction) mFriction.textContent = '42 / 100';
        if (mSentiment) mSentiment.textContent = '50% Neutral';
        if (mIssues) mIssues.textContent = '2 Moderate';

        if (issuesBox) {
          issuesBox.innerHTML = `
            <div class="issue-card">
              <span class="issue-title">Premature Form Friction Before Value Discovery</span>
              <span class="issue-quote">"Asked me for company size and phone number before I even saw the app."</span>
            </div>
            <div class="issue-card">
              <span class="issue-title">Intimidating Cloud Permission Copy</span>
              <span class="issue-quote">"The copy on the permission dialog felt intimidating and unclear."</span>
            </div>
          `;
        }

        if (recsBox) {
          recsBox.innerHTML = `
            <div class="rec-item">
              <div>
                <div class="rec-item-title">1. Move Optional Fields Post-Activation</div>
                <div class="rec-item-desc">Let user experience core workspace before asking for CRM details.</div>
              </div>
            </div>
            <div class="rec-item">
              <div>
                <div class="rec-item-title">2. Soften Permission Language</div>
                <div class="rec-item-desc">Clarify read-only repository scope to defuse security concerns.</div>
              </div>
            </div>
          `;
        }
      }
    };

    sampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        sampleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderFeedbackReport(chip.dataset.sample);
        this.showToast(`Loaded ${chip.textContent}`);
      });
    });

    if (runBtn) {
      runBtn.addEventListener('click', () => {
        renderFeedbackReport('checkout');
        this.showToast('Usability feedback synthesized!');
      });
    }

    renderFeedbackReport('checkout');
  }
}

// Start application
window.addEventListener('DOMContentLoaded', () => {
  new FormaPrototype();
});
