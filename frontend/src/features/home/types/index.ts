// Home feature types
export interface HomeFeatureConfig {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}
