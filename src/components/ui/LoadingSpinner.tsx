interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({
  className = 'w-5 h-5 border-2 border-gold/20 border-t-gold rounded-full animate-spin',
}: LoadingSpinnerProps) {
  return <div className={className} />;
}
