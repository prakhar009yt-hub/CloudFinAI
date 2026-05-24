# CloudFinAI: Cloud Cost Optimization Agent

CloudFinAI is an autonomous DevOps AI Agent designed to continuously monitor your cloud infrastructure, detect unnecessary costs, predict future spending, and recommend actionable optimizations like shutting down idle instances or resizing services.

## Features

- **Continuous Infrastructure Monitoring:** Connects to AWS, GCP, and Azure to monitor resource utilization in real-time.
- **Smart Recommendations:** Uses Gemini AI to analyze spending patterns and generate context-aware cost-saving actions with estimated savings.
- **Autonomous Execution:** Easily "Auto-Apply" safe recommendations (like detaching unused EBS volumes or shutting down idle databases) directly from the dashboard.
- **Spend Forecasting:** Analyzes historical data to predict your end-of-month cloud bill and alerts you if budget limits will be exceeded.

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

1. Obtain an API Key from the Settings panel.
2. Call the analysis endpoint with your infrastructure payload:

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
- 1-hour sync intervals
- Slack/Teams integration and alerts
- Standard email support

### 🥇 Enterprise (Custom Pricing)
- Unlimited monitored cloud spend
- Fully autonomous optimization execution based on custom rulesets
- Real-time sync and anomaly detection
- Dedicated account manager & CI/CD pipeline integrations
- 24/7 priority support

*Note: Pricing includes a performance fee of 1% of the actual savings realized via automated actions on the Enterprise tier.*

---
