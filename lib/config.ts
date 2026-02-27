import { Plan, UsageKey } from './types';

export const PLAN_LIMITS: Record<Plan, Record<UsageKey, number>> = {
  free: {
    content_writer: 5,
    image_generator: 5,
    resume_builder: 2,
    marketing_assistant: 4,
    chatbot_builder: 2,
    thumbnail_generator: 5,
  },
  pro: {
    content_writer: 200,
    image_generator: 200,
    resume_builder: 50,
    marketing_assistant: 150,
    chatbot_builder: 50,
    thumbnail_generator: 150,
  },
  enterprise: {
    content_writer: 5000,
    image_generator: 5000,
    resume_builder: 2000,
    marketing_assistant: 5000,
    chatbot_builder: 2000,
    thumbnail_generator: 5000,
  },
};

export const PRICES = {
  pro: {
    label: 'Pro',
    value: '$29/month',
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? '',
  },
  enterprise: {
    label: 'Enterprise',
    value: '$99/month',
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? '',
  },
};
