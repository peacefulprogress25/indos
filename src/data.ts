import { ModelInfo, FAQItem, FeatureItem, SwitchReason, StepItem, BuilderSegment } from "./types";

export const MODELS_DATA: ModelInfo[] = [
  {
    id: "glm-5.2",
    name: "GLM 5.2",
    tagline: "Software engineering",
    routingMode: "Auto (Recommended)",
    contextWindow: "1M",
    fineTune: true,
    dedicated: true,
    curlCommand: "",
    pythonCommand: "",
    nodeCommand: "",
    jsonResult: ""
  },
  {
    id: "minimax-m3",
    name: "Minimax M3",
    tagline: "Agentic workflows",
    routingMode: "Auto",
    contextWindow: "1M",
    fineTune: true,
    dedicated: true,
    curlCommand: "",
    pythonCommand: "",
    nodeCommand: "",
    jsonResult: ""
  },
  {
    id: "deepseek-v4",
    name: "DeepSeek V4",
    tagline: "Reasoning, efficiency",
    routingMode: "Auto",
    contextWindow: "256k-1M",
    fineTune: true,
    dedicated: true,
    curlCommand: "",
    pythonCommand: "",
    nodeCommand: "",
    jsonResult: ""
  },
  {
    id: "qwen-3.7",
    name: "Qwen 3.7",
    tagline: "Knowledge work, multilingual",
    routingMode: "Auto",
    contextWindow: "256k-1M",
    fineTune: true,
    dedicated: true,
    curlCommand: "",
    pythonCommand: "",
    nodeCommand: "",
    jsonResult: ""
  },
  {
    id: "gpt-oss",
    name: "GPT OSS",
    tagline: "Customer chatbot",
    routingMode: "Auto",
    contextWindow: "128-256k",
    fineTune: true,
    dedicated: true,
    curlCommand: "",
    pythonCommand: "",
    nodeCommand: "",
    jsonResult: ""
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "1",
    title: "1. Frontier Models",
    description: "Access leading open-source models across text, vision, code, and more."
  },
  {
    id: "2",
    title: "2. One API",
    description: "A single, consistent API for all models with simple, predictable integration."
  },
  {
    id: "3",
    title: "3. Intelligent Routing",
    description: "Auto-optimize request flows across models for the lowest cost and latency."
  },
  {
    id: "4",
    title: "4. Private Deployments",
    description: "Deploy in isolated environments with full data and model control."
  },
  {
    id: "5",
    title: "5. Hosted in India",
    description: "Built on India-hosted infrastructure for sovereignty, compliance, and speed."
  },
  {
    id: "6",
    title: "6. Production Ready",
    description: "High availability, auto-scaling, and monitoring built for real workloads."
  },
  {
    id: "7",
    title: "7. Transparent Pricing",
    description: "Pay only for what you use with clear, usage-based pricing."
  },
  {
    id: "8",
    title: "8. Human Support",
    description: "Real engineers who understand your stack and your goals."
  }
];

export const BUILDER_SEGMENTS: BuilderSegment[] = [
  {
    id: "01",
    title: "AI Agencies",
    description: "Launch client deployments faster and configure routing preferences for every unique requirement."
  },
  {
    id: "02",
    title: "Startups",
    description: "Ship AI features and products without managing GPU infrastructure."
  },
  {
    id: "03",
    title: "Enterprises",
    description: "Deploy India-hosted or private instances to meet compliance and data residency needs."
  },
  {
    id: "04",
    title: "Developers",
    description: "Build, test, deploy, and scale with one API and production-ready tooling."
  }
];

export const SWITCH_REASONS: SwitchReason[] = [
  {
    id: "01",
    title: "Faster Time To Production",
    description: "Get started quickly with a unified API, ready-to-use models, and comprehensive documentation."
  },
  {
    id: "02",
    title: "Better Performance",
    description: "Optimized infrastructure and efficient serving deliver low latency and high throughput at scale."
  },
  {
    id: "03",
    title: "Lower Operational Complexity",
    description: "We handle the infrastructure, updates, and scaling so your team can focus on building, not ops."
  },
  {
    id: "04",
    title: "Flexible Deployment Options",
    description: "Choose managed cloud, private cloud, or on-prem deployments that fit your data and compliance needs."
  },
  {
    id: "05",
    title: "Sovereign By Design",
    description: "Your data stays in India with full control, transparency, and compliance built into every layer."
  }
];

export const STEPS_DATA: StepItem[] = [
  {
    stepNumber: 1,
    title: "Create an account",
    description: "Sign up in seconds and access the Indos platform."
  },
  {
    stepNumber: 2,
    title: "Generate an API key",
    description: "Create your API key to authenticate requests."
  },
  {
    stepNumber: 3,
    title: "Choose a model",
    description: "Select from our open-source models or deploy a dedicated instance."
  },
  {
    stepNumber: 4,
    title: "Start building",
    description: "Integrate the API and deploy your first AI workflow."
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What models are available?",
    answer: "Indos offers a growing catalog of state-of-the-art open-source models across text, code, embedding, and vision. You can browse all available models in the Models section of the platform."
  },
  {
    id: "faq-2",
    question: "How secure is my data on the platform?",
    answer: "Your privacy is our baseline. All data sent to our endpoints is fully isolated, encrypted in transit and at rest, and never stored or used to train any model without your explicit consent."
  },
  {
    id: "faq-3",
    question: "Do I need to manage infrastructure?",
    answer: "Not at all. Indos handles all infrastructure details behind the scenes including automatic scaling, high availability, load balancing, and cold-starts, so your engineering team can focus solely on your AI applications."
  },
  {
    id: "faq-4",
    question: "Is inference hosted in India?",
    answer: "Yes. All INDOS servers and inference accelerators are fully located and operated within Indian geographic borders, conforming closely to national sovereignty, low local latencies, and rigorous regional compliance standards."
  },
  {
    id: "faq-5",
    question: "Can I get a private deployment?",
    answer: "Absolutely. We offer isolated private cloud, virtual private cloud (VPC), and physical on-prem deployments for enterprise customers who have strict regulatory, isolation, and security requirements."
  },
  {
    id: "faq-6",
    question: "Can I switch models without changing my application?",
    answer: "Yes. Our standardized Indos Routing Engine relies on a unified endpoint contract. You can switch models or enable dynamic multi-model fallback routines in your request payloads without modifying your client-side integration code."
  }
];
