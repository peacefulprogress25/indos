export interface ModelInfo {
  id: string;
  name: string;
  tagline: string;
  routingMode: string;
  contextWindow: string;
  fineTune: boolean;
  dedicated: boolean;
  curlCommand: string;
  pythonCommand: string;
  nodeCommand: string;
  jsonResult: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
}

export interface SwitchReason {
  id: string;
  title: string;
  description: string;
}

export interface StepItem {
  stepNumber: number;
  title: string;
  description: string;
}

export interface BuilderSegment {
  id: string;
  title: string;
  description: string;
}
