export interface Opportunity {
  id: number;
  title: string;
  location: string;
  date: string;
  duration?: string;
  category: 'Education' | 'Environment' | 'Healthcare' | 'Community';
  imageUrl: string;
}