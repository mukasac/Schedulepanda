// types/subscription.ts
export interface Subscriber {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    plan: string;
    status: 'active' | 'expiring' | 'expire'
}