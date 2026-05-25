# CloudFinAI: Cloud Cost Optimization Agent

CloudFinAI is an autonomous DevOps AI Agent designed to continuously monitor your cloud infrastructure, detect unnecessary costs, predict future spending, and recommend actionable optimizations like shutting down idle instances or resizing services.

## Core Features

- **Real-Time Resource Monitoring & Alerts:** Visual bar chart tracking real-time CPU, Memory, and Storage usage across active cloud services. Users can define custom alert thresholds for CPU/Memory, which trigger immediate toast notifications and visual pulsing 'red glows' on charts when exceeded.
- **Autonomous Anomaly Resolution:** Functional metric cards that monitor spend alerts and allow 1-click execution to resolve detected anomalies (e.g., terminating idle instances). 
- **Agent Activity Log:** An interactive, chronological history of automated optimizations, scaling events, and infrastructure changes performed by the AI agent.
- **Smart Recommendations:** Analyzes spending patterns and generates context-aware cost-saving actions alongside long-term cumulative savings projections.
- **Spend Forecasting:** Analyzes historical data to predict your end-of-month cloud bill relative to your budget limits.

## How to Use in Your Website

You can integrate the CloudFinAI agent directly into your own internal Developer Portals, Backstage instances, or Dashboards.

### Option 1: Embedded Dashboard (Iframe)
The simplest way to integrate the dashboard is via iframe. It supports dark mode automatically.

```html
<iframe 
  src="https://your-cloudfinai-domain.com/" 
  width="100%" 
  height="900px" 
  style="border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;">
</iframe>
```

### Option 2: REST API Integration
To build a custom UI or trigger the agent programmatically in your CI/CD pipelines, use our REST API.

```javascript
const response = await fetch('https://your-cloudfinai-domain.com/api/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    infrastructureData: { /* your infrastructure metric payload */ }
  })
});

const { recommendations } = await response.json();
console.log(recommendations);
```

## Pricing

CloudFinAI scales with your infrastructure. We offer flexible pricing tiers to match your team's needs.

### 🥉 Starter (Free)
- Up to $10,000 in monthly monitored cloud spend
- Basic cost visualizations and manual recommendations
- 24-hour sync intervals
- Community support

### 🥈 Pro ($249/month)
- Up to $100,000 in monthly monitored cloud spend
- 1-click Auto-Apply optimization actions
- Custom alert thresholds and chart polling
- 1-hour sync intervals
- Slack/Teams integration and alerts
- Standard email support

### 🥇 Enterprise (Custom Pricing)
- Unlimited monitored cloud spend
- Fully autonomous optimization execution based on custom rulesets
- Real-time sync, visual resource alerts, and anomaly detection
- Dedicated account manager & CI/CD pipeline integrations
- 24/7 priority support

---

**Powered by Google Gemini 2.5 Flash.**
