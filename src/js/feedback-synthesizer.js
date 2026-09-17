/**
 * FORMA AI — Usability Testing Feedback Synthesizer
 */

export class FeedbackSynthesizer {
  constructor(aiEngine, onJumpToLayoutCallback, onJumpToCopyCallback, showToastCallback) {
    this.aiEngine = aiEngine;
    this.onJumpToLayout = onJumpToLayoutCallback;
    this.onJumpToCopy = onJumpToCopyCallback;
    this.showToast = showToastCallback;

    this.rawInput = document.getElementById('feedback-raw-input');
    this.charCountBadge = document.getElementById('feedback-char-count');
    this.statFriction = document.getElementById('stat-friction-score');
    this.statIssues = document.getElementById('stat-issue-count');
    this.sentimentPos = document.getElementById('sentiment-pos');
    this.sentimentNeu = document.getElementById('sentiment-neu');
    this.sentimentNeg = document.getElementById('sentiment-neg');
    this.themeList = document.getElementById('theme-tags-list');
    this.painPointsList = document.getElementById('pain-points-list');
    this.recList = document.getElementById('recommendations-list');

    this.sampleStudies = {
      checkout: `Participant 1 (P1): "I added the jacket to my cart, but when I reached checkout, I couldn't see shipping costs until after I entered my full address and email. That made me hesitate."
Participant 2 (P2): "The 'Proceed' button was confusing. Does 'Proceed' mean submit payment or review my order? I almost abandoned because I didn't want to get charged yet."
Participant 3 (P3): "On mobile Safari, the credit card keyboard popped up and completely hid the 'Complete Purchase' button. I had to tap outside three times to dismiss it."
Participant 4 (P4): "I was looking for the Apple Pay button right on the product page or cart. Having to type my 16-digit card felt slow and tedious."
Participant 5 (P5): "There are no security badges or return policy links visible on the checkout screen. How do I know returns are free if it doesn't fit?"
Participant 6 (P6): "The progress steps are missing. Am I on step 2 of 3 or step 4 of 10? I prefer seeing a clear indicator so I know how long this will take."
Participant 7 (P7): "Shipping was $14.99 and that was a complete surprise at the final screen. I abandoned the cart right there."
Participant 8 (P8): "Loved the clean photos, but the checkout form fields are too dense on a phone screen. Kept tapping the wrong input field."`,
      onboarding: `Participant 1: "During sign up, you asked me for my company size, phone number, and CRM before I even saw the dashboard. That felt like too much friction."
Participant 2: "The welcome screen just dropped me onto an empty page with no starter templates or hints on what to click first."
Participant 3: "The copy on the permission dialog was intimidating. 'Forma requires full access to your cloud repository.' Can you explain why you need that?"
Participant 4: "I love the minimal design! It feels fast and responsive. But please give me a 30-second interactive tour."
Participant 5: "Inviting team members had an error state saying 'Invalid domain' but didn't explain which domains are allowed."`,
      'mobile-nav': `Participant 1: "The bottom navigation bar has 5 icons with no text labels. I couldn't guess what the diamond icon was supposed to do."
Participant 2: "Search is hidden behind a sub-menu instead of being accessible directly from the top header."
Participant 3: "Gestures feel smooth, but swiping left from the edge kept triggering iOS back navigation instead of switching tabs."
Participant 4: "Font size on the secondary metadata is slightly too small to read outdoors in direct sunlight."`
    };

    this.setupListeners();
  }

  setupListeners() {
    // Sample study chips
    const studyChips = document.querySelectorAll('.sample-study-bar .chip-btn');
    studyChips.forEach(chip => {
      chip.addEventListener('click', () => {
        studyChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const studyKey = chip.dataset.study;
        this.loadSampleStudy(studyKey);
      });
    });

    // Word counter on input
    if (this.rawInput) {
      this.rawInput.addEventListener('input', () => {
        this.updateWordCount();
      });
    }

    // Synthesize button
    const synthBtn = document.getElementById('btn-synthesize-feedback');
    if (synthBtn) {
      synthBtn.addEventListener('click', () => this.synthesize());
    }

    // Initial load
    this.loadSampleStudy('checkout');
  }

  loadSampleStudy(studyKey) {
    if (this.rawInput && this.sampleStudies[studyKey]) {
      this.rawInput.value = this.sampleStudies[studyKey];
      this.updateWordCount();
      this.synthesize();
    }
  }

  updateWordCount() {
    if (!this.rawInput || !this.charCountBadge) return;
    const text = this.rawInput.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    this.charCountBadge.textContent = `${words} words`;
  }

  async synthesize() {
    const rawText = this.rawInput ? this.rawInput.value : '';
    const result = await this.aiEngine.synthesizeUsabilityFeedback(rawText);
    this.renderResults(result);
  }

  renderResults(res) {
    // Stats
    if (this.statFriction) {
      this.statFriction.textContent = `${res.frictionScore} / 100`;
      this.statFriction.className = `stat-value ${res.frictionScore > 60 ? 'text-danger' : res.frictionScore > 40 ? 'text-warning' : 'text-success'}`;
    }

    if (this.statIssues) {
      this.statIssues.textContent = `${res.painPoints.length} Critical`;
    }

    // Sentiment Bars
    if (this.sentimentPos) {
      this.sentimentPos.style.width = `${res.sentiment.positive}%`;
      this.sentimentPos.setAttribute('title', `Positive: ${res.sentiment.positive}%`);
    }
    if (this.sentimentNeu) {
      this.sentimentNeu.style.width = `${res.sentiment.neutral}%`;
      this.sentimentNeu.setAttribute('title', `Neutral: ${res.sentiment.neutral}%`);
    }
    if (this.sentimentNeg) {
      this.sentimentNeg.style.width = `${res.sentiment.negative}%`;
      this.sentimentNeg.setAttribute('title', `Negative: ${res.sentiment.negative}%`);
    }

    // Legend
    const legPos = document.querySelector('.leg-pos');
    const legNeu = document.querySelector('.leg-neu');
    const legNeg = document.querySelector('.leg-neg');
    if (legPos) legPos.textContent = `${res.sentiment.positive}% Pos`;
    if (legNeu) legNeu.textContent = `${res.sentiment.neutral}% Neu`;
    if (legNeg) legNeg.textContent = `${res.sentiment.negative}% Neg`;

    // Themes
    if (this.themeList) {
      this.themeList.innerHTML = '';
      res.themes.forEach(t => {
        const tag = document.createElement('span');
        tag.className = 'theme-pill-tag';
        tag.innerHTML = `<span>${t.icon}</span> <span>${t.name}</span> <span class="theme-count">${t.count}</span>`;
        this.themeList.appendChild(tag);
      });
    }

    // Pain Points
    if (this.painPointsList) {
      this.painPointsList.innerHTML = '';
      res.painPoints.forEach(p => {
        const card = document.createElement('div');
        card.className = 'pain-point-card';
        card.innerHTML = `
          <div class="pain-header">
            <span class="pain-title">${p.title}</span>
            <span class="severity-pill ${p.severity}">${p.severity}</span>
          </div>
          <div class="pain-quote">${p.quote}</div>
          <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between;">
            <span>Frequency: <strong>${p.frequency}</strong></span>
            <span>Impact: <strong>${p.impact}</strong></span>
          </div>
        `;
        this.painPointsList.appendChild(card);
      });
    }

    // Actionable Recommendations with Direct Links
    if (this.recList) {
      this.recList.innerHTML = '';
      res.recommendations.forEach(r => {
        const recCard = document.createElement('div');
        recCard.className = 'rec-card';
        recCard.innerHTML = `
          <div class="rec-info">
            <span class="rec-title">✦ ${r.title}</span>
            <span class="rec-desc">${r.desc}</span>
          </div>
          <button class="btn btn-primary btn-sm btn-solve-rec" data-id="${r.id}">
            ${r.btnText}
          </button>
        `;

        recCard.querySelector('.btn-solve-rec')?.addEventListener('click', () => {
          if (r.actionType === 'layout') {
            this.onJumpToLayout(r.actionPrompt);
            this.showToast('Switched to Layout Brainstormer with recommended design prompt!');
          } else if (r.actionType === 'copy') {
            this.onJumpToCopy(r.actionTone);
            this.showToast('Switched to UI Copy Studio with contextual guidance!');
          }
        });

        this.recList.appendChild(recCard);
      });
    }
  }

  exportExecutiveBrief() {
    const rawText = this.rawInput ? this.rawInput.value : '';
    return `# Forma AI — Usability Testing Executive Synthesis
Generated: ${new Date().toLocaleDateString()}
Analysis Method: AI Theme Clustering & Sentiment Polarity

## Executive Summary
Usability study analyzing ${rawText.split(/\s+/).length} words of raw unmoderated participant sessions.

## Friction & Sentiment Score
- Friction Index: Moderate / High friction detected in conversion journey.
- Core Friction Drivers: CTA ambiguity, hidden fee disclosure, and viewport input clipping.

## Actionable Design Interventions
1. Implement split-screen order summary to provide continuous price transparency.
2. Refine CTA copy to clear, low-risk commitment phrasing.
3. Introduce 3-step breadcrumb progress header to set user expectations.
`;
  }
}
