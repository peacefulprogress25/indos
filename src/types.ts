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

export interface StackTier {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  models: string[];
  color: string;
  icon: string;
}

export interface PricingModel {
  id: string;
  name: string;
  category: string;
  inputPrice: string;
  outputPrice: string;
}

// ─── API types (match Go backend response shapes) ───

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AuthMeResponse {
  user: AuthUser;
}

export interface DevLoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface CreditBalance {
  balance_paise: number;
  balance_inr: number;
}

export interface CreditTransaction {
  id: string;
  type: string;
  description?: string;
  amount: number; // paise
  created_at: string;
}

export interface CreditTransactionsResponse {
  transactions: CreditTransaction[];
}

export interface UsageStats {
  total_tokens: number;
  total_requests: number;
  total_cost_inr: number;
  by_model?: ModelUsage[];
  by_provider?: ProviderUsage[];
}

export interface ModelUsage {
  provider: string;
  model: string;
  tokens: number;
  cost_inr: number;
}

export interface ProviderUsage {
  provider: string;
  tokens: number;
  cost_inr: number;
}

export interface AvailableModel {
  id: string;
  provider: string;
  model: string;
  input_price_per_1m: number;
  output_price_per_1m: number;
  currency?: string;
}

export interface ModelsResponse {
  models: AvailableModel[];
}

export interface ApiKeyItem {
  id: string;
  name: string;
  key_prefix: string;
  key_suffix?: string;
  key?: string; // only present on creation
  created_at: string;
  last_used_at?: string;
  revoked_at?: string;
}

export interface ApiKeysResponse {
  keys: ApiKeyItem[];
}

export interface CreateKeyResponse {
  key: ApiKeyItem;
}
