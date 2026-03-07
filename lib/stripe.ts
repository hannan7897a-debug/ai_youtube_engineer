import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia'
});

export const PRICE_IDS = {
  pro: process.env.STRIPE_PRICE_PRO || '',
  creator: process.env.STRIPE_PRICE_CREATOR || ''
};
