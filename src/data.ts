import { ModelInfo, PricingModel, FAQItem, FeatureItem, SwitchReason, StepItem, BuilderSegment, StackTier } from "./types";

// Legacy model data — kept for existing ModelRouting component
export const MODELS_DATA: ModelInfo[] = [];

export const STACK_TIERS: StackTier[] = [
  {
    id: "frontier",
    title: "Frontier",
    subtitle: "Top-tier reasoning",
    description: "Best-in-class models for complex reasoning, coding, and creative work. When quality is non-negotiable.",
    models: ["GPT 5.6", "Claude Fable", "Gemini 3.5 Pro"],
    color: "#FF6B00",
    icon: "sparkles"
  },
  {
    id: "opensource",
    title: "Open Source",
    subtitle: "Community-powered",
    description: "Production-grade open-source models. Full control, no vendor lock-in, community-driven improvement.",
    models: ["GLM 5.2", "DeepSeek V4", "Qwen 3.7"],
    color: "#3B82F6",
    icon: "zap"
  },
  {
    id: "economical",
    title: "Economical",
    subtitle: "Cost-optimized",
    description: "Lightweight models for chatbots, classification, and high-volume tasks. Maximum throughput per rupee.",
    models: ["Kimi", "Qwen 3.2", "ChatGPT OSS"],
    color: "#10B981",
    icon: "piggy-bank"
  },
  {
    id: "voicevideo",
    title: "Voice / Video",
    subtitle: "Multimodal",
    description: "Generate and understand images, video, and speech. Plug into multimodal workflows through the same API.",
    models: ["Veo", "Kling", "Seedance", "Whisper"],
    color: "#8B5CF6",
    icon: "gauge"
  },
  {
    id: "sovereign",
    title: "Sovereign",
    subtitle: "Hosted in India",
    description: "Models built for India, deployed on Indian infrastructure. Indian language support, data residency, and compliance.",
    models: ["Sarvam", "Shakti Deepseek"],
    color: "#F59E0B",
    icon: "flag"
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "1",
    title: "One API, Every Model",
    description: "A single, consistent API for all models. OpenAI SDK compatible. One integration across every tier."
  },
  {
    id: "2",
    title: "INR Pricing, Indian Payments",
    description: "Pay in rupees via UPI, Razorpay, or net banking. No forex charges, no international cards needed."
  },
  {
    id: "3",
    title: "Sovereign Infrastructure",
    description: "Indian models deployed on Indian servers. Your data stays in India for compliance-sensitive workloads."
  },
  {
    id: "4",
    title: "Curated, Not Overwhelming",
    description: "30+ models handpicked for Indian builders. No decision fatigue. Just the right model for the job."
  },
  {
    id: "5",
    title: "Production Ready",
    description: "High availability, auto-scaling, and monitoring built for real workloads. 99.9% uptime SLA."
  },
  {
    id: "6",
    title: "Real Human Support",
    description: "Real engineers who understand your stack, your market, and your goals. Not a chatbot."
  }
];

export const BUILDER_SEGMENTS: BuilderSegment[] = [
  {
    id: "01",
    title: "AI Agencies",
    description: "Serve every client from one platform. Route high-stakes work to frontier models, routine tasks to economical, compliance-sensitive work to sovereign. One API key, one INR invoice, predictable margins."
  },
  {
    id: "02",
    title: "Developers",
    description: "Experiment across every model tier from a single endpoint. Prototype with frontier models, scale with open-source, add voice and video when needed. No provider-hopping, no dollar conversions."
  },
  {
    id: "03",
    title: "Startups",
    description: "Build multi-model workflows without multi-vendor chaos. Ship AI features fast using frontier models, keep costs low with economical tier, meet compliance with sovereign. One integration does it all."
  },
  {
    id: "04",
    title: "Enterprises",
    description: "Deploy across the full intelligence gradient. Use open-source and economical models at scale, frontier for precision work, sovereign models on Indian infra for regulated data. Single vendor, single compliance surface."
  }
];

export const PRICING_DATA: PricingModel[] = [
  { id: "gpt-5.6", name: "GPT 5.6", category: "Frontier", inputPrice: "₹X", outputPrice: "₹X" },
  { id: "claude-opus", name: "Claude Opus", category: "Frontier", inputPrice: "₹X", outputPrice: "₹X" },
  { id: "gemini-3.5", name: "Gemini 3.5 Pro", category: "Frontier", inputPrice: "₹X", outputPrice: "₹X" },
  { id: "glm-5.2", name: "GLM 5.2", category: "Open Source", inputPrice: "₹X", outputPrice: "₹X" },
  { id: "deepseek-v4", name: "DeepSeek V4 Pro", category: "Open Source", inputPrice: "₹X", outputPrice: "₹X" },
  { id: "kling", name: "Kling", category: "Voice/Video", inputPrice: "₹X", outputPrice: "₹X" },
  { id: "sarvam", name: "Sarvam", category: "Sovereign", inputPrice: "₹X", outputPrice: "₹X" },
  { id: "llama", name: "Llama", category: "Open Source", inputPrice: "₹X", outputPrice: "₹X" }
];

export const SWITCH_REASONS: SwitchReason[] = [
  {
    id: "01",
    title: "Built for India, Not Adapted for India",
    description: "INR pricing, Indian payment rails, sovereign models on Indian infra. Every layer designed for Indian builders."
  },
  {
    id: "02",
    title: "One API Instead of Ten",
    description: "Stop managing credentials across five different providers. One key, one endpoint, every model tier you need."
  },
  {
    id: "03",
    title: "Indian Models You Can't Get Elsewhere",
    description: "Sarvam, Shakti Deepseek — integrated into the same API as your global frontier and open-source models."
  },
  {
    id: "04",
    title: "The Intelligence Gradient",
    description: "Frontier for quality, open-source for control, economical for scale, sovereign for compliance. Mix and match per workload."
  },
  {
    id: "05",
    title: "Transparent INR Pricing",
    description: "No dollar conversion guesswork, no hidden fees, no forex markup. Pay in rupees, know exactly what you're spending."
  }
];

export const STEPS_DATA: StepItem[] = [
  {
    stepNumber: 1,
    title: "Create an account",
    description: "Sign up in seconds with Google or GitHub."
  },
  {
    stepNumber: 2,
    title: "Add credits in INR",
    description: "Pay via UPI, Razorpay, or net banking. No forex."
  },
  {
    stepNumber: 3,
    title: "Pick your models",
    description: "Browse 30+ models across five tiers. One API for everything."
  },
  {
    stepNumber: 4,
    title: "Start building",
    description: "OpenAI SDK works out of the box. Drop in and go."
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What models are available on Indos?",
    answer: "A curated basket of 30+ models across five tiers: Frontier (GPT 5.6, Claude Fable, Gemini 3.5 Pro), Open Source (GLM 5.2, DeepSeek V4, Qwen 3.7), Economical (Kimi, Qwen 3.2, ChatGPT OSS), Voice/Video (Veo, Kling, Seedance, Whisper), and Sovereign (Sarvam, Shakti Deepseek). Full catalog on the Models page."
  },
  {
    id: "faq-2",
    question: "Where is inference hosted?",
    answer: "Sovereign models (Sarvam, Shakti Deepseek) run on Indian infrastructure. Other models are served through our global provider network. You choose based on your data residency needs."
  },
  {
    id: "faq-3",
    question: "How does pricing work?",
    answer: "Simple, transparent, per-token pricing in INR. Each model has a clear rate displayed in rupees. No dollar conversions, no forex charges, no hidden fees. Pay via UPI, Razorpay, or net banking."
  },
  {
    id: "faq-4",
    question: "Is Indos OpenAI SDK compatible?",
    answer: "Yes. Indos is fully compatible with the OpenAI SDK. Change the base URL and your API key, and your existing code, tools, and workflows work out of the box."
  },
  {
    id: "faq-5",
    question: "Can I get a private deployment?",
    answer: "Private VPC and on-prem deployments are coming soon for enterprises with strict regulatory and isolation requirements. All within Indian infrastructure."
  },
  {
    id: "faq-6",
    question: "How is Indos different from OpenRouter?",
    answer: "Indos is built specifically for India. We offer INR pricing, Indian payment rails, sovereign models deployed on Indian infrastructure (Sarvam, Shakti Deepseek), and a curated catalog designed for Indian builders. Same unified API experience, purpose-built for India."
  }
];