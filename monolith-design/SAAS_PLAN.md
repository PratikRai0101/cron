# SAAS_PLAN.md — Monolith Monetization Strategy

## Business Model

Monolith operates on a **freemium SaaS model** with three tiers: Free, Pro, and Team. Revenue is generated through cross-platform subscriptions managed by RevenueCat.

**Pricing Philosophy:**
- Free tier is genuinely useful (not a crippled demo)
- Pro tier unlocks power-user features (sync, analytics, widgets)
- Team tier unlocks collaboration (future)
- Price point is low enough to be impulse-purchase friendly

---

## Pricing Tiers

### Free Tier ($0)

**Target User:** Casual user, single device, no cross-platform needs

| Feature | Limit |
|---|---|
| Identities | 1 active |
| Task History | 30 days |
| Focus Sessions | Unlimited |
| Grid View | All identities shown together (no filtering) |
| Analytics | Current week only |
| Widgets | Small read-only widget only |
| Export | Not available |
| Cloud Sync | Not available (local-only) |
| Social | Can join crews, cannot create |
| Wrapped | Current calendar year only |

**Upgrade Triggers:**
- Attempting to add a 2nd identity
- Attempting to view history beyond 30 days
- Attempting to export data
- Attempting to create a crew
- Attempting to use medium/large widgets

### Pro Tier ($4.99/month or $39.99/year)

**Target User:** Power user, multi-device, data-driven, widget power user

| Feature | Detail |
|---|---|
| Identities | Unlimited |
| Task History | Unlimited |
| Focus Sessions | Unlimited |
| Grid View | Filter by identity, view identity-specific grids |
| Analytics | Full skill velocity, 8-week+ trends, personal records, identity mastery |
| Insight Engine | All 15+ insight types |
| Widgets | All sizes (small, medium, large) + interactive widgets (v2) |
| Export | CSV and JSON export |
| Cloud Sync | Real-time sync across all devices (iOS, Android, Desktop) |
| Social | Create and manage crews |
| Wrapped | Rolling 365-day reports + all historical years |
| Accent Colors | Choose from Lime, Cyan, Coral |
| Support | Priority email support |

**Annual Discount:** $39.99/year = ~33% savings vs. monthly. Incentivizes annual commitment.

### Team Tier (Future — $9.99/user/month)

**Target User:** Small teams, studios, remote teams

| Feature | Detail |
|---|---|
| Everything in Pro | Per-user basis |
| Team Dashboard | Aggregate focus hours, identity breakdowns |
| Team Challenges | Admin-created challenges with custom targets |
| Analytics | Team-wide skill velocity, productivity trends |
| Admin Controls | User management, data export for entire team |
| SSO | Google Workspace, SAML (enterprise) |
| Support | Dedicated support channel |

**Team Minimum:** 3 users. Maximum: 50 users (soft limit, contact sales for more).

---

## Revenue Projections

### Assumptions (Conservative)

| Metric | Value |
|---|---|
| Monthly Active Users (MAU) Year 1 | 10,000 |
| Free-to-Pro Conversion Rate | 3% |
| Annual vs. Monthly Split | 60% annual, 40% monthly |
| Churn Rate (Monthly) | 8% |
| Churn Rate (Annual) | 25% |

### Year 1 Revenue Calculation

```
Total Users: 10,000
Pro Users: 10,000 × 3% = 300

Monthly Subscribers: 300 × 40% = 120
  → 120 × $4.99 = $599/month
  → After churn: $599 × 0.92 = $551/month avg
  → Annual: $551 × 12 = $6,612

Annual Subscribers: 300 × 60% = 180
  → 180 × $39.99 = $7,198 upfront
  → After churn: $7,198 × 0.75 = $5,399 recognized

Year 1 Gross Revenue: ~$12,000
```

### Year 2 Projections

```
MAU Growth: 10,000 → 35,000 (+250%)
Conversion Rate: 3% → 4% (product maturation)
Pro Users: 35,000 × 4% = 1,400

Estimated Year 2 Revenue: ~$75,000 - $90,000
```

### Break-Even Analysis

| Cost Category | Monthly (MVP) | Monthly (Scale) |
|---|---|---|
| Supabase | $25 | $150 |
| RevenueCat (1% of revenue) | $10 | $750 |
| EAS Build / Expo | $0 | $100 |
| App Store / Play Store (15% after $1M) | 15% of rev | 15% of rev |
| Hosting / CDN | $20 | $50 |
| **Total Fixed Costs** | **~$55** | **~$1,050** |

**Break-even:** ~12 Pro subscribers (monthly) or ~2 annual subscribers.

---

## Feature Gates Implementation

### Client-Side Gates
Use `subscription_tier` from user profile:

```typescript
function canUseFeature(feature: Feature, tier: Tier): boolean {
  const gates: Record<Feature, Tier[]> = {
    'identity.unlimited': ['pro', 'team'],
    'history.unlimited': ['pro', 'team'],
    'grid.filter': ['pro', 'team'],
    'analytics.full': ['pro', 'team'],
    'widgets.interactive': ['pro', 'team'],
    'export.data': ['pro', 'team'],
    'sync.cloud': ['pro', 'team'],
    'crew.create': ['pro', 'team'],
    'wrapped.rolling': ['pro', 'team'],
    'theme.custom': ['pro', 'team'],
  };
  return gates[feature]?.includes(tier) ?? false;
}
```

### Server-Side Gates (RLS)
Enforce limits at the database level:

```sql
-- Example: Free users can only have 1 active identity
CREATE OR REPLACE FUNCTION check_identity_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT subscription_tier FROM profiles WHERE id = NEW.user_id
  ) = 'free' AND (
    SELECT COUNT(*) FROM identities 
    WHERE user_id = NEW.user_id AND is_archived = false
  ) >= 1 THEN
    RAISE EXCEPTION 'Free users are limited to 1 identity';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### RevenueCat Integration

**Products:**
```json
{
  "com.monolith.pro.monthly": {
    "type": "subscription",
    "price": 4.99,
    "period": "P1M"
  },
  "com.monolith.pro.annual": {
    "type": "subscription",
    "price": 39.99,
    "period": "P1Y"
  }
}
```

**Entitlements:**
```json
{
  "pro": {
    "products": [
      "com.monolith.pro.monthly",
      "com.monolith.pro.annual"
    ]
  }
}
```

**Flow:**
1. App launches → RevenueCat checks cached purchaser info
2. If expired → Downgrade to Free tier in local state
3. User attempts Pro action → Show paywall
4. Purchase → RevenueCat validates → Update `profiles.subscription_tier` in Supabase
5. Webhook (RevenueCat → Supabase Edge Function) ensures tier consistency

---

## Paywall Strategy

### Paywall Design
- Full-screen modal (not a tiny banner)
- Dark background, accent CTAs
- Feature list with checkmarks
- Monthly/Annual toggle (default to Annual with savings badge)
- "Restore Purchases" button
- Close button (X) always available — no forced paywall

### Paywall Triggers
| Trigger | Frequency |
|---|---|
| Attempting Pro feature | Once per feature per week |
| History limit reached | Once per session |
| 30 days after signup | One-time gentle prompt |
| After hitting Free limits 3 times | Persistent but dismissible banner |

### Paywall Copy
- Headline: "Go Pro. Track everything."
- Subhead: "Unlimited identities, cross-device sync, advanced analytics, and interactive widgets."
- CTA: "Start Pro — $4.99/month" / "$39.99/year (Save 33%)"
- Disclaimer: "Cancel anytime. No commitment."

---

## Pricing Experiments

### Experiment 1: Annual Default
- Hypothesis: Defaulting to annual increases LTV
- Test: 50% of users see monthly default, 50% see annual default
- Metric: Conversion rate × LTV

### Experiment 2: Trial Period
- Hypothesis: 7-day free trial increases conversion
- Test: Offer 7-day trial to new users who attempt a Pro feature
- Metric: Trial-to-paid conversion

### Experiment 3: Tiered Pro
- Hypothesis: Some users want analytics but not widgets
- Test: Pro Lite ($2.99/mo) — unlimited identities + sync, no widgets
- Metric: Cannibalization vs. total revenue increase

---

## Unit Economics

| Metric | Target |
|---|---|
| Customer Acquisition Cost (CAC) | < $10 |
| Lifetime Value (LTV) | > $60 |
| LTV:CAC Ratio | > 6:1 |
| Payback Period | < 3 months |
| Monthly Churn | < 8% |
| Annual Churn | < 30% |
| Net Revenue Retention | > 100% |

### CAC Channels
1. **Organic / SEO**: Blog posts on deep work, focus techniques (low CAC, slow)
2. **App Store Optimization (ASO)**: Keywords: "focus tracker", "habit grid", "deep work timer" (free)
3. **Wrapped Virality**: Shareable cards drive organic installs (near-zero CAC)
4. **Developer Communities**: Hacker News, Indie Hackers, Reddit r/productivity (free)
5. **Paid Social**: Twitter/X, Instagram (target: <$10 CAC)

---

## Refund & Churn Management

### Refund Policy
- iOS / Android: Follow platform policies (generous refunds)
- Proactive: If user hasn't used Pro features in 14 days, offer refund proactively

### Churn Prevention
- **Win-back email (30 days after cancel)**: "We noticed you cancelled. What would bring you back?" + 50% off 3 months
- **Downgrade grace period**: Keep Pro features for 7 days after expiry (soft landing)
- **Export reminder**: "Export your data before your Pro features expire"

---

## Legal & Compliance

### Required Disclosures
- Subscription terms in paywall
- Auto-renewal terms (per Apple/Google requirements)
- Privacy policy: Minimal data collection, no third-party sharing
- Terms of service: User owns their data, can export anytime

### GDPR / CCPA
- Data export available to all users (not just Pro)
- Account deletion wipes all data within 30 days
- No tracking pixels or ad networks
- Analytics are anonymized and opt-out available

---

## Financial Projections Summary

| Year | MAU | Pro Users | Revenue | Costs | Net |
|---|---|---|---|---|---|
| 1 | 10,000 | 300 | $12,000 | $3,000 | $9,000 |
| 2 | 35,000 | 1,400 | $75,000 | $15,000 | $60,000 |
| 3 | 100,000 | 5,000 | $300,000 | $50,000 | $250,000 |

**Goal:** Profitable by Month 6. Full-time sustainable by Year 2.
