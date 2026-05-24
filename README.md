# ☁️ CloudFinAI — Cloud Cost Optimization Agent

> An autonomous AI-powered FinOps agent that monitors your cloud infrastructure, detects waste, predicts spend, and applies optimizations — automatically.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange?logo=firebase)
![Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📌 What is CloudFinAI?

CloudFinAI is a full-stack **cloud cost intelligence platform** built with Next.js 15 and powered by **Google Gemini 2.5 Flash**. It acts as an autonomous DevOps/FinOps agent: continuously ingesting your infrastructure metrics, surfacing AI-driven optimization recommendations, and letting you apply them with a single click — or autonomously on Enterprise plans.

Whether you're running workloads on AWS, GCP, or Azure, CloudFinAI gives your team a real-time view of where money is being wasted and exactly what to do about it.

---

## ✨ Features

### 🔍 Continuous Infrastructure Monitoring
Connects to your cloud providers (AWS, GCP, Azure) and ingests resource utilization data. The dashboard refreshes automatically and presents spend trends, service breakdowns, and anomaly signals in real time.

### 🤖 AI Optimization Agent (Gemini-Powered)
Clicking **Run Analysis** sends your infrastructure summary to the Gemini 2.5 Flash API. The agent returns 3–5 prioritized recommendations, each with:
- **Title & description** of the issue
- **Severity** — High / Medium / Low
- **Expected savings** in USD
- **Category** — Compute, Storage, Network, Database, Other
- **Exact action required** (e.g. "Detach unused EBS volume `vol-0abc123`")

### ⚡ One-Click Auto-Apply
Safe, low-risk recommendations (detaching unused volumes, shutting down idle databases) can be applied directly from the dashboard via **Auto-Apply** — no CLI, no console.

### 📈 Spend Forecasting
Historical spend data is analyzed to project your end-of-month cloud bill. Budget alerts fire when the forecast exceeds your configured threshold.

### 🗂️ Agent Activity Log
Every autonomous action taken by the agent is recorded in a tamper-evident audit log with timestamps, affected resources, and before/after cost impact.

### 💬 AI Chat Assistant
A built-in conversational assistant (powered by Gemini) lets you ask natural language questions about your infrastructure — e.g., *"Which region is driving the most cost growth?"* or *"Summarize last month's savings."*

### 🔐 Firebase Authentication
Google OAuth sign-in via Firebase Auth. User sessions and settings are persisted in Firestore.

---

## 🖥️ Dashboard Pages

| Route | Description |
|---|---|
| `/` | Infrastructure Dashboard — metrics cards, spend timeline, services breakdown, recommendation feed, cumulative savings chart |
| `/activity` | Agent Activity Log — real-time audit trail of autonomous actions |
| `/resources` | Resource inventory browser |
| `/billing` | Billing overview and invoice history |
| `/pricing` | Plan comparison (Starter / Pro / Enterprise) |
| `/settings` | API key management, cloud provider connections, alert thresholds |
| `/support` | Help center and support ticket submission |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| AI Model | Google Gemini 2.5 Flash (`@google/genai`) |
| Auth & DB | Firebase Auth + Firestore |
| Charts | Recharts |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Markdown | react-markdown |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini)
- A Firebase project (Auth + Firestore enabled)

### 1. Clone the Repository

```bash
git clone https://github.com/prakhar009yt-hub/CloudFinAI.git
cd CloudFinAI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Configure Firebase

Update `firebase-applet-config.json` with your Firebase project credentials:

```json
{
  "apiKey": "...",
  "authDomain": "your-project.firebaseapp.com",
  "projectId": "your-project-id",
  "storageBucket": "your-project.appspot.com",
  "messagingSenderId": "...",
  "appId": "...",
  "firestoreDatabaseId": "(default)"
}
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 Integration Options

### Option 1: Iframe Embed

Embed the CloudFinAI dashboard directly into your internal developer portal or Backstage instance:

```html
<iframe 
  src="https://your-cloudfinai-domain.com/" 
  width="100%" 
  height="900px" 
  style="border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;">
</iframe>
```

Dark mode is applied automatically.

### Option 2: REST API

Trigger the AI analysis agent programmatically from your CI/CD pipelines or custom dashboards.

**Endpoint:** `POST /api/analyze`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Request Body:**
```json
{
  "infrastructureData": {
    "totalMonthlyCost": 12400,
    "services": [
      { "name": "EC2", "cost": 7200, "utilizationPercent": 34 },
      { "name": "RDS", "cost": 3100, "utilizationPercent": 12 },
      { "name": "S3",  "cost": 2100, "utilizationPercent": 91 }
    ]
  }
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "id": "rec_001",
      "title": "Downsize over-provisioned EC2 instances",
      "description": "14 EC2 instances averaging 34% CPU utilization. Rightsizing to the next smaller instance type would retain headroom while reducing cost.",
      "severity": "High",
      "expectedSavings": 2160,
      "category": "Compute",
      "actionRequired": "Resize instances i-0abc123, i-0def456 from m5.xlarge → m5.large during next maintenance window."
    }
  ]
}
```

---

## 💰 Pricing Plans

| | Starter | Pro | Enterprise |
|---|---|---|---|
| **Price** | Free | $249 / month | Custom |
| **Monitored Spend** | Up to $10k / mo | Up to $100k / mo | Unlimited |
| **Sync Interval** | 24 hours | 1 hour | Real-time |
| **Auto-Apply Actions** | ❌ | ✅ | ✅ Fully autonomous |
| **Alerts** | ❌ | Slack / Teams | Custom webhooks |
| **Anomaly Detection** | ❌ | ❌ | ✅ |
| **CI/CD Integration** | ❌ | ❌ | ✅ |
| **Support** | Community | Email | Dedicated 24/7 |

> Enterprise includes a 1% performance fee on savings realized via automated actions.

---

## 📁 Project Structure

```
CloudFinAI/
├── app/
│   ├── page.tsx                  # Main dashboard
│   ├── layout.tsx                # Root layout with auth & toast providers
│   ├── globals.css
│   ├── api/
│   │   └── analyze/route.ts      # POST /api/analyze — Gemini AI endpoint
│   ├── activity/page.tsx         # Agent audit log
│   ├── billing/page.tsx
│   ├── pricing/page.tsx
│   ├── resources/page.tsx
│   ├── settings/page.tsx
│   └── support/page.tsx
├── components/
│   ├── AuthProvider.tsx           # Firebase Auth context
│   ├── ToastProvider.tsx          # Global toast notifications
│   └── dashboard/
│       ├── AppShell.tsx           # Sidebar + header layout shell
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── MetricsCards.tsx       # KPI summary cards
│       ├── SpendTimelineChart.tsx # Recharts spend over time
│       ├── ServicesBreakdownChart.tsx
│       ├── RecommendationFeed.tsx # AI recommendations list
│       ├── CumulativeSavingsChart.tsx
│       └── ChatAssistant.tsx      # Conversational AI widget
├── lib/
│   ├── firebase.ts               # Firebase app, auth, Firestore init
│   └── mock-data.ts              # Sample infrastructure payload for demos
├── firebase-applet-config.json
├── metadata.json
├── next.config.ts
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgements

- [Google Gemini](https://deepmind.google/technologies/gemini/) for the AI backbone
- [Firebase](https://firebase.google.com/) for auth and real-time data
- [Recharts](https://recharts.org/) for the visualization layer
- [Lucide](https://lucide.dev/) for the icon system
- [Motion](https://motion.dev/) for fluid animations

---

<p align="center">
  Built with ❤️ and ☁️ &nbsp;|&nbsp; <strong>Powered by Google Gemini 2.5 Flash</strong>
</p>
