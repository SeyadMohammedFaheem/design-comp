/**
 * FORMA AI — Generative Engine for Layouts, UI Copy, and Usability Analysis
 */

export class AIEngine {
  constructor() {
    this.layoutArchetypes = ['bento', 'split', 'cards', 'feed'];
  }

  /**
   * Brainstorms a layout structure based on prompt and chosen archetype/viewport
   */
  async brainstormLayout(prompt, archetype = 'all', viewport = 'desktop') {
    // Artificial slight delay to simulate fast AI synthesis
    await new Promise(resolve => setTimeout(resolve, 250));

    const p = (prompt || '').toLowerCase();

    // Determine domain category
    let domain = 'general';
    if (p.includes('saas') || p.includes('analytic') || p.includes('metric') || p.includes('dashboard')) {
      domain = 'saas';
    } else if (p.includes('fintech') || p.includes('bank') || p.includes('wallet') || p.includes('transfer') || p.includes('balance')) {
      domain = 'fintech';
    } else if (p.includes('e-commerce') || p.includes('shop') || p.includes('product') || p.includes('store') || p.includes('checkout')) {
      domain = 'ecommerce';
    } else if (p.includes('onboard') || p.includes('kyc') || p.includes('wizard') || p.includes('setup')) {
      domain = 'onboarding';
    } else if (p.includes('doc') || p.includes('portal') || p.includes('api') || p.includes('developer')) {
      domain = 'docs';
    }

    return this.generateLayoutBlocks(domain, archetype, viewport, prompt);
  }

  /**
   * Generates component blocks array tailored to domain and archetype
   */
  generateLayoutBlocks(domain, archetype, viewport, rawPrompt) {
    if (domain === 'saas') {
      return [
        {
          id: 'blk-nav',
          title: 'Primary Navigation',
          type: 'navbar',
          visible: true,
          content: {
            brand: 'ApexAnalytics',
            links: ['Overview', 'Funnel Insights', 'Cohorts', 'Settings'],
            user: 'Alex Chen (Pro)'
          }
        },
        {
          id: 'blk-header',
          title: 'Executive Metrics Bar',
          type: 'metrics',
          visible: true,
          content: {
            headline: 'Q3 Product Performance & Velocity',
            metrics: [
              { label: 'Monthly Recurring Revenue', value: '$128,450', change: '+14.2%', trend: 'up' },
              { label: 'Active Retention (W4)', value: '64.8%', change: '+3.1%', trend: 'up' },
              { label: 'Checkout Conversion', value: '4.2%', change: '-0.4%', trend: 'down' }
            ]
          }
        },
        {
          id: 'blk-chart',
          title: 'Telemetry & Funnel Drop-off',
          type: 'split-chart',
          visible: true,
          content: {
            title: 'Real-time Event Stream & Conversion Flow',
            subtitle: 'Tracking 1.2M daily active user sessions across onboarding touchpoints',
            tag: 'Live Stream'
          }
        },
        {
          id: 'blk-bento',
          title: 'Feature Telemetry (Bento Grid)',
          type: 'bento',
          visible: true,
          content: {
            items: [
              { title: 'Cohort Retention Curve', desc: 'W8 retention stabilized at 58% among team accounts.', span: 2 },
              { title: 'Latency Index', desc: 'p99 API response at 42ms globally.', span: 1 },
              { title: 'Top Conversion Paths', desc: 'Direct invite links generate 3.4x higher activation.', span: 1 },
              { title: 'Churn Risk Detection', desc: 'AI flagged 12 enterprise accounts requiring proactive outreach.', span: 2 }
            ]
          }
        },
        {
          id: 'blk-feed',
          title: 'Audit & Activity Log',
          type: 'feed',
          visible: true,
          content: {
            title: 'Recent Product Audit Events',
            events: [
              { user: 'Sarah K.', action: 'Exported weekly churn summary to CSV', time: '14m ago' },
              { user: 'Liam P.', action: 'Upgraded workspace plan to Enterprise tier', time: '1h ago' },
              { user: 'DevBot', action: 'Deployed webhook listener v2.4.1 to production', time: '3h ago' }
            ]
          }
        }
      ];
    }

    if (domain === 'fintech') {
      return [
        {
          id: 'blk-nav',
          title: 'Fintech Top Header',
          type: 'navbar',
          visible: true,
          content: {
            brand: 'Onyx Pay',
            links: ['Accounts', 'Transfers', 'Virtual Cards', 'Invest'],
            user: '$48,290.00'
          }
        },
        {
          id: 'blk-hero',
          title: 'Card Balance & Quick Transfer',
          type: 'hero',
          visible: true,
          content: {
            title: 'Total Available Balance',
            amount: '$48,290.50',
            subtitle: 'FDIC Insured up to $250,000 through partner banks',
            actions: ['Send Funds', 'Request Money', 'Freeze Card']
          }
        },
        {
          id: 'blk-cards',
          title: 'Card & Vault Highlights',
          type: 'metrics',
          visible: true,
          content: {
            headline: 'Smart Vaults & Allocations',
            metrics: [
              { label: 'Emergency Reserve', value: '$15,000', change: '4.85% APY', trend: 'up' },
              { label: 'Q4 Tax Reserve', value: '$8,400', change: 'Auto-saved', trend: 'up' },
              { label: 'Monthly Spend Limit', value: '$3,200', change: '$840 remaining', trend: 'neutral' }
            ]
          }
        },
        {
          id: 'blk-feed',
          title: 'Recent Real-Time Transactions',
          type: 'feed',
          visible: true,
          content: {
            title: 'Settled Transactions',
            events: [
              { user: 'Figma Inc.', action: 'Annual Team Subscription', time: '-$144.00' },
              { user: 'Apple Pay', action: 'Coffee & Roastery NYC', time: '-$6.50' },
              { user: 'Direct Deposit', action: 'Stripe Merchant Payout', time: '+$4,250.00' }
            ]
          }
        }
      ];
    }

    if (domain === 'ecommerce') {
      return [
        {
          id: 'blk-nav',
          title: 'Storefront Navigation',
          type: 'navbar',
          visible: true,
          content: {
            brand: 'Komorebi Studio',
            links: ['Apparel', 'Objects', 'Archive', 'About'],
            user: 'Cart (2)'
          }
        },
        {
          id: 'blk-hero',
          title: 'Product Overview & Buy Box',
          type: 'split-chart',
          visible: true,
          content: {
            title: 'Nordic Cast Iron Kettle (0.9L)',
            subtitle: 'Handcrafted in Kyoto from recycled ironware. Minimalist heat-resistant walnut handle with precision pour spout.',
            price: '$180.00'
          }
        },
        {
          id: 'blk-bento',
          title: 'Material Specifications & Craft',
          type: 'bento',
          visible: true,
          content: {
            items: [
              { title: 'Precision Spout Flow', desc: 'Engineered for smooth 90° pour-over extraction.', span: 1 },
              { title: '100% Induction & Flame Safe', desc: 'Compatible with all stovetop varieties.', span: 1 },
              { title: 'Lifetime Craft Warranty', desc: 'Free maintenance and re-seasoning service.', span: 1 }
            ]
          }
        },
        {
          id: 'blk-feed',
          title: 'Verified Customer Reviews',
          type: 'feed',
          visible: true,
          content: {
            title: 'Customer Feedback (4.9 / 5.0)',
            events: [
              { user: 'Elena R.', action: 'Exceptional weight balance and understated finish.', time: '5 stars' },
              { user: 'Marcus T.', action: 'Pours with absolute stability. Beautiful piece.', time: '5 stars' }
            ]
          }
        }
      ];
    }

    if (domain === 'onboarding') {
      return [
        {
          id: 'blk-nav',
          title: 'Onboarding Progress Bar',
          type: 'navbar',
          visible: true,
          content: {
            brand: 'Forma Identity',
            links: ['1. Profile', '2. Verification (Active)', '3. Integration'],
            user: 'Step 2 of 3'
          }
        },
        {
          id: 'blk-hero',
          title: 'Identity Verification Step',
          type: 'hero',
          visible: true,
          content: {
            title: 'Verify your work domain',
            subtitle: 'We will verify your organization credentials to set up secure SSO and workspace encryption.',
            actions: ['Continue with Google Workspace', 'Enter SAML SSO URL']
          }
        },
        {
          id: 'blk-cards',
          title: 'Security Assurance Badges',
          type: 'metrics',
          visible: true,
          content: {
            headline: 'Zero Trust Security Standards',
            metrics: [
              { label: 'SOC2 Type II', value: 'Certified', change: 'Audited 2026', trend: 'up' },
              { label: 'Encryption', value: 'AES-256', change: 'At rest & transit', trend: 'up' },
              { label: 'Data Residency', value: 'US & EU', change: 'Compliant', trend: 'up' }
            ]
          }
        }
      ];
    }

    // Default / General Modern Dashboard
    return [
      {
        id: 'blk-nav',
        title: 'App Header & Navigation',
        type: 'navbar',
        visible: true,
        content: {
          brand: 'Forma System',
          links: ['Projects', 'Design Specs', 'Team', 'Settings'],
          user: 'Design Lead'
        }
      },
      {
        id: 'blk-hero',
        title: 'Project Overview Banner',
        type: 'hero',
        visible: true,
        content: {
          title: rawPrompt || 'Minimal Product Workspace',
          subtitle: 'Streamlined design layout optimized for clarity, responsive breakpoints, and zero visual friction.',
          actions: ['Create New Flow', 'Share Prototype']
        }
      },
      {
        id: 'blk-bento',
        title: 'Component Grid Layout',
        type: 'bento',
        visible: true,
        content: {
          items: [
            { title: 'Interactive State Management', desc: 'State machine bindings with zero latency.', span: 2 },
            { title: 'Design Tokens', desc: 'Synchronized with Figma tokens.', span: 1 },
            { title: 'Accessibility Compliance', desc: '100% WCAG AAA contrast ratio.', span: 1 },
            { title: 'Automated Test Matrix', desc: 'Continuous snapshot checks across 12 screen viewports.', span: 2 }
          ]
        }
      },
      {
        id: 'blk-cards',
        title: 'Key Operational Stats',
        type: 'metrics',
        visible: true,
        content: {
          headline: 'System Health',
          metrics: [
            { label: 'Components', value: '48 blocks', change: 'Active', trend: 'up' },
            { label: 'Lighthouse Score', value: '99 / 100', change: '+2 pts', trend: 'up' },
            { label: 'Readability Index', value: '94%', change: 'Very Easy', trend: 'up' }
          ]
        }
      }
    ];
  }

  /**
   * Generates diverse UI copy variants based on component type, context, tone, and length
   */
  async generateUICopy({ type, context, tone, length }) {
    await new Promise(resolve => setTimeout(resolve, 200));

    const ctx = (context || '').trim();
    const variants = [];

    // Tone descriptors
    const toneMap = {
      direct: { name: 'Minimal & Direct', style: 'Crisp, actionable, low cognitive overhead' },
      playful: { name: 'Playful & Friendly', style: 'Warm, personable, delightful' },
      enterprise: { name: 'Enterprise & Trust', style: 'Authoritative, security-centric, compliance-ready' },
      empathetic: { name: 'Empathetic & Warm', style: 'Supportive, patient, friction-reducing' }
    };

    const currentTone = toneMap[tone] || toneMap.direct;

    if (type === 'cta') {
      if (tone === 'direct') {
        variants.push(
          { text: 'Start 14-Day Free Trial', rationale: 'Immediate clarity on offer duration with zero ambiguity.', score: 98, rec: true },
          { text: 'Access Dashboard Free', rationale: 'Focuses on the immediate benefit with zero cost barrier.', score: 94 },
          { text: 'Explore Platform Now', rationale: 'Action-oriented for low-intent evaluators.', score: 89 },
          { text: 'Get Instant Access', rationale: 'High urgency for high-intent visitors.', score: 91 }
        );
      } else if (tone === 'playful') {
        variants.push(
          { text: 'Take It for a Spin — Free!', rationale: 'Friendly, low pressure, creates a playful entry point.', score: 96, rec: true },
          { text: 'Let’s Build Something Cool', rationale: 'Inspires creative agency and camaraderie.', score: 92 },
          { text: 'Hop In (No Card Needed!)', rationale: 'Defuses financial skepticism with warmth.', score: 95 },
          { text: 'Ready When You Are', rationale: 'Non-aggressive invitation.', score: 88 }
        );
      } else if (tone === 'enterprise') {
        variants.push(
          { text: 'Initiate Enterprise Evaluation', rationale: 'Professional tone favored by procurement & enterprise leads.', score: 97, rec: true },
          { text: 'Deploy Secure Proof of Concept', rationale: 'Emphasizes IT compliance, zero risk testing.', score: 95 },
          { text: 'Request Single-Tenant Demo', rationale: 'Clear specification for high-value contracts.', score: 91 },
          { text: 'Start SOC2 Compliant Trial', rationale: 'Directly addresses enterprise security verification.', score: 93 }
        );
      } else {
        variants.push(
          { text: 'Take Your Time — Free for 14 Days', rationale: 'Removes pressure, assuring the user they are in control.', score: 97, rec: true },
          { text: 'We’re Ready Whenever You Are', rationale: 'Warm, supportive tone that respects user pace.', score: 92 },
          { text: 'Try Without Worry — No Card Required', rationale: 'Directly alleviates credit card anxiety.', score: 96 },
          { text: 'Explore At Your Own Rhythm', rationale: 'Gentle, friendly guidance.', score: 90 }
        );
      }
    } else if (type === 'hero') {
      if (tone === 'direct') {
        variants.push(
          { text: 'Turn raw telemetry into clear product decisions.', rationale: 'States precise transformation without marketing buzzwords.', score: 99, rec: true },
          { text: 'The analytics copilot designed for fast-moving teams.', rationale: 'Clear audience targeting and category definition.', score: 94 },
          { text: 'Understand user drop-off in seconds, not sprints.', rationale: 'Direct contrast between current pain and new speed.', score: 96 },
          { text: 'Measure what matters. Ship what works.', rationale: 'Rhyming cadence with high memorability.', score: 91 }
        );
      } else if (tone === 'playful') {
        variants.push(
          { text: 'Stop guessing why users bounce. Let’s ask the data.', rationale: 'Conversational hook that turns a frustrating chore into a mystery solved.', score: 97, rec: true },
          { text: 'Analytics so clean, your spreadsheet will get jealous.', rationale: 'Relatable humor for product managers drowned in Excel.', score: 94 },
          { text: 'Your product deserves better than blindfolded decisions.', rationale: 'Evocative imagery with friendly optimism.', score: 92 },
          { text: 'Look at you, making smarter UX decisions already.', rationale: 'Affirmative, warm, cheeky confidence.', score: 90 }
        );
      } else if (tone === 'enterprise') {
        variants.push(
          { text: 'Enterprise-grade user telemetry with zero data retention risk.', rationale: 'Speaks directly to CISO and data privacy criteria.', score: 98, rec: true },
          { text: 'Unified behavioral intelligence for mission-critical apps.', rationale: 'Elevated technical authority suited for Fortune 500 pitches.', score: 95 },
          { text: 'Accelerate digital transformation with verified UX benchmarks.', rationale: 'Standard boardroom vocabulary that aligns with executive KPIs.', score: 93 },
          { text: 'Deterministic funnel tracking at multi-million event scale.', rationale: 'Highlights engineering robustness and scale reliability.', score: 92 }
        );
      } else {
        variants.push(
          { text: 'Designing better user experiences doesn’t have to feel overwhelming.', rationale: 'Validates designer stress and promises gentle clarity.', score: 98, rec: true },
          { text: 'We help you listen to your users without the noise.', rationale: 'Poetic, reassuring focus on human empathy.', score: 95 },
          { text: 'Clear insights, kind guidance, and zero guesswork.', rationale: 'Balances professionalism with compassionate tone.', score: 93 },
          { text: 'A calm space to understand your community’s real needs.', rationale: 'Positions software as a thoughtful companion.', score: 91 }
        );
      }
    } else if (type === 'empty-state') {
      variants.push(
        { text: 'No active prototypes found. Let’s brainstorm your first layout.', rationale: 'Provides immediate next step with gentle encouragement.', score: 96, rec: true },
        { text: 'Your workspace is fresh and clean.', rationale: 'Re-frames emptiness as a positive blank slate.', score: 92 },
        { text: 'Nothing to display yet. Paste feedback or run a prompt above.', rationale: 'Action-oriented instructions for new users.', score: 94 },
        { text: 'Ready for your ideas. Tap + to begin.', rationale: 'Shortest possible instruction for mobile screens.', score: 90 }
      );
    } else if (type === 'error') {
      variants.push(
        { text: 'We couldn’t reach the server. Your draft is saved locally.', rationale: 'Guarantees data safety before explaining the network issue.', score: 99, rec: true },
        { text: 'Something interrupted this request. Please tap Retry.', rationale: 'Avoids blame, clear recovery path.', score: 94 },
        { text: 'Connection paused. Re-checking in 5 seconds...', rationale: 'Passive automatic resolution notice.', score: 91 },
        { text: 'Unable to sync changes. Check your Wi-Fi or export offline.', rationale: 'Provides dual actionable workarounds.', score: 95 }
      );
    } else {
      // Default / Value-prop / Modal
      variants.push(
        { text: 'Designed for speed. Engineered for clarity.', rationale: 'Symmetrical balance, high impact.', score: 97, rec: true },
        { text: 'Zero configuration required. Start brainstorming instantly.', rationale: 'Alleviates setup friction.', score: 95 },
        { text: 'Keep your team aligned across layout, copy, and user voice.', rationale: 'Holistic cross-functional pitch.', score: 93 },
        { text: 'Built with Swiss precision and minimal cognitive weight.', rationale: 'Matches design ethos.', score: 91 }
      );
    }

    return variants;
  }

  /**
   * Synthesizes raw usability feedback into structured themes, sentiment, and design recommendations
   */
  async synthesizeUsabilityFeedback(rawText) {
    await new Promise(resolve => setTimeout(resolve, 300));

    const text = (rawText || '').toLowerCase();
    const wordCount = rawText ? rawText.trim().split(/\s+/).length : 0;

    let frictionScore = 55;
    let posPct = 30;
    let neuPct = 35;
    let negPct = 35;

    // Analyze negative triggers
    const negWords = ['confused', 'slow', 'stuck', 'hard', 'could not find', 'where is', 'error', 'frustrated', 'hidden', 'drop', 'abandoned', 'hate'];
    const posWords = ['love', 'clean', 'easy', 'fast', 'smooth', 'intuitive', 'helpful', 'great', 'favorite', 'simple'];

    let negCount = 0;
    let posCount = 0;

    negWords.forEach(w => {
      const regex = new RegExp(w, 'gi');
      const matches = text.match(regex);
      if (matches) negCount += matches.length;
    });

    posWords.forEach(w => {
      const regex = new RegExp(w, 'gi');
      const matches = text.match(regex);
      if (matches) posCount += matches.length;
    });

    if (negCount > posCount) {
      frictionScore = Math.min(88, 50 + negCount * 5);
      negPct = Math.min(65, 35 + negCount * 4);
      posPct = Math.max(15, 40 - negCount * 3);
      neuPct = 100 - (negPct + posPct);
    } else if (posCount > negCount) {
      frictionScore = Math.max(22, 50 - posCount * 4);
      posPct = Math.min(70, 35 + posCount * 4);
      negPct = Math.max(10, 35 - posCount * 3);
      neuPct = 100 - (negPct + posPct);
    }

    // Determine themes
    const themes = [
      { name: 'Navigation & Wayfinding', count: 8, icon: '🧭' },
      { name: 'CTA Clarity & Terminology', count: 6, icon: '🏷️' },
      { name: 'Checkout Trust & Pricing', count: 5, icon: '🔒' },
      { name: 'Mobile Form Density', count: 4, icon: '📱' },
      { name: 'Information Hierarchy', count: 3, icon: '📐' }
    ];

    // Pain points
    const painPoints = [
      {
        title: 'Hidden Security Badges & Unexpected Fees at Final Step',
        severity: 'critical',
        frequency: '8 out of 12 participants',
        quote: '“I wasn’t sure if this store was secure until I entered my card, and then taxes appeared unexpectedly.”',
        impact: 'High checkout abandonment at Step 3'
      },
      {
        title: 'Ambiguous Primary CTA Labeling ("Proceed" vs "Place Order")',
        severity: 'high',
        frequency: '6 out of 12 participants',
        quote: '“I clicked Proceed thinking it would calculate shipping, but it felt like I was committing already.”',
        impact: 'Hesitation latency increased by 14.8 seconds'
      },
      {
        title: 'Mobile Input Keyboard Obscuring Confirmation Button',
        severity: 'medium',
        frequency: '5 out of 12 participants',
        quote: '“On my iPhone, the keyboard stayed open and blocked the place order button at the bottom.”',
        impact: 'Form retry loop on iOS viewports'
      },
      {
        title: 'Missing Visual Progress Step Indicator',
        severity: 'low',
        frequency: '3 out of 12 participants',
        quote: '“I didn’t know how many steps were left before my purchase was finalized.”',
        impact: 'Perceived task duration feels longer'
      }
    ];

    // Actionable Recommendations
    const recommendations = [
      {
        id: 'rec-1',
        title: 'Redesign Checkout to Split-Screen Summary Layout',
        desc: 'Keep order summary, shipping cost, and trust badges permanently visible on the right panel.',
        actionType: 'layout',
        actionPrompt: 'Minimal e-commerce checkout with split-screen summary and sticky guarantee badges',
        btnText: 'Brainstorm Layout Fix'
      },
      {
        id: 'rec-2',
        title: 'Replace "Proceed" with Clear Reassuring Microcopy',
        desc: 'Change CTA to "Review Order & Shipping" to alleviate premature commitment anxiety.',
        actionType: 'copy',
        actionTone: 'direct',
        btnText: 'Generate Copy Options'
      },
      {
        id: 'rec-3',
        title: 'Add 3-Step Breadcrumb Progress Indicator at Top',
        desc: 'Show "1. Shipping → 2. Payment → 3. Confirmation" to eliminate uncertainty.',
        actionType: 'layout',
        actionPrompt: '3-step checkout progress header with active step highlight',
        btnText: 'Apply to Canvas'
      }
    ];

    return {
      wordCount,
      frictionScore,
      sentiment: { positive: posPct, neutral: neuPct, negative: negPct },
      themes,
      painPoints,
      recommendations
    };
  }
}
