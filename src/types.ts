export interface BusinessIdea {
  id: string;
  title: string;
  category: string;
  description: string;
  startupCost: {
    min: number;
    max: number;
  };
  potentialIncome: string;
  customerAcquisition: string[];
  upsell?: string;
  image?: string;
}
