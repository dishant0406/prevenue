# Prevenue – AI-Powered Booking Management Platform

<img src="https://static-asset.quickleap.io/Prevenue/prevenue-logo.webp" alt="Prevenue Platform">

## 🚀 About Prevenue

Prevenue is an **autonomous AI booking management platform** that revolutionizes how service-based businesses handle appointments and prevent no-shows. Our intelligent system handles the complete booking lifecycle while using advanced predictive analytics to reduce no-shows by up to 45%.

### Key Capabilities:
- **24/7 Autonomous Call & Inquiry Handling** - AI manages incoming calls and schedules appointments automatically
- **Predictive No-Show Prevention** - Machine learning predicts and prevents no-shows with 85-90% accuracy  
- **Complete Workflow Automation** - From booking to follow-ups, everything runs automatically
- **Revenue Protection** - Strategic overbooking and consequence management recover lost revenue
- **Seamless Integrations** - Works with Vagaro, Mindbody, SimplePractice, Square Appointments, and more

### Target Industries:
Healthcare practices, dental offices, veterinary clinics, salons, spas, and any service-based business struggling with no-shows and booking inefficiencies.

## 📊 Platform Performance

- **80+ Practices Served** across multiple industries
- **$20,000+ Revenue Recovered** from prevented no-shows
- **45% Average No-Show Reduction** within 2 weeks of implementation
- **99.9% Uptime** with enterprise-grade reliability
- **300% Average ROI** for our clients

## 💻 Tech Stack

- **Next.js 15** – React framework with App Router
- **TypeScript** – Type-safe development
- **TailwindCSS** – Utility-first styling with custom design system
- **Shadcn UI + Radix UI** – Premium component library
- **Framer Motion** – Smooth animations and transitions
- **React Hook Form + Zod** – Form handling and validation
- **Supabase** – Backend database and authentication
- **Maileroo** – Transactional email service
- **Number Flow** – Animated number displays

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- PNPM (recommended) or Yarn/NPM

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd prevenue
    ```

2. Install dependencies:
    ```bash
    pnpm install
    # or
    yarn install
    # or
    npm install
    ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_APP_NAME=Prevenue
   NEXT_PUBLIC_APP_URL="https://prevenue.in"
   NEXT_PUBLIC_APP_DESCRIPTION="AI-powered booking management with no-show prevention"
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Email Service (Maileroo)
   MAILEROO_API_KEY=your_maileroo_api_key
   MAILEROO_API_URL=your_maileroo_endpoint
   ```

4. Run the development server:
    ```bash
    pnpm run dev
    # or
    yarn dev
    # or
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) to view the platform

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages (home, about, pricing)
│   ├── api/              # API routes (contact, webhooks)
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── marketing/        # Marketing page components
│   ├── global/          # Shared components
│   └── ui/              # UI component library
├── constants/           # Application constants and content
├── hooks/              # Custom React hooks  
├── lib/                # Utilities and configurations
├── styles/             # Global styles
└── utils/              # Helper functions
```

## 🚀 Features

### Autonomous AI Management
- **Smart Call Handling**: Natural conversation AI handles inquiries 24/7
- **Intelligent Scheduling**: Automatically books appointments and manages conflicts
- **Follow-up Automation**: Post-appointment care, reviews, and rebooking

### No-Show Prevention
- **Predictive Analytics**: Machine learning identifies high-risk appointments
- **Dynamic Reminders**: Adaptive reminder system based on client behavior
- **Strategic Overbooking**: Intelligent waitlist management for revenue optimization

### Revenue Protection
- **Consequence Management**: Automated policies for repeat no-shows
- **Analytics Dashboard**: Real-time insights on booking patterns and revenue
- **Integration Support**: Works with existing practice management systems

## � Contact & Demo

**Interested in seeing Prevenue in action?**
- 📧 Email: hello@prevenue.in
- 📞 Schedule a Demo: [Contact Us](https://prevenue.in/contact)
- 💼 LinkedIn: [Prevenue Company](https://linkedin.com/company/prevenue_io)

## 📈 Business Impact

Prevenue typically helps practices:
- **Reduce no-shows by 45%** within 2 weeks of implementation
- **Recover $2,000-10,000+ monthly** in lost revenue
- **Save 15-20 hours weekly** on booking management tasks
- **Increase client satisfaction** through 24/7 availability
- **Achieve 300% ROI** within the first quarter

## 🏥 Integrations

Prevenue seamlessly integrates with:
- **Practice Management**: Vagaro, Mindbody, SimplePractice, Square Appointments, Acuity
- **Communication**: SMS, Email, WhatsApp Business, Slack
- **Analytics**: Custom API for existing systems
- **Workflows**: Maintains existing processes without disruption

## 🚀 Deployment

### Production Deployment on Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### Manual Deployment

```bash
# Build the project
pnpm run build

# Start production server
pnpm run start
```

## 📝 License

This project is proprietary software owned by Prevenue. All rights reserved.

## 🤝 Support

For technical support or business inquiries:
- **Email**: support@prevenue.in
- **Response Time**: Within 24 hours
- **Support Hours**: 24/7 for critical issues

---

**Built with ❤️ by the Prevenue team** - Revolutionizing appointment management with AI
