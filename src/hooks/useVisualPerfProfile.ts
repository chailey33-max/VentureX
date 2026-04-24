import { useEffect, useState } from 'react';

export type VisualPerfProfile = 'high-fidelity' | 'balanced' | 'low-power';

export function useVisualPerfProfile(): VisualPerfProfile {
  const [profile, setProfile] = useState<VisualPerfProfile>('high-fidelity');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const evaluateVisualProfile = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const smallScreen = window.matchMedia('(max-width: 768px)').matches;
      const cpuCores = navigator.hardwareConcurrency || 8;
      const memoryEstimate = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;

      if (reducedMotion || smallScreen || cpuCores <= 4 || memoryEstimate <= 4) {
        setProfile('low-power');
        return;
      }
      if (cpuCores <= 6 || memoryEstimate <= 6) {
        setProfile('balanced');
        return;
      }
      setProfile('high-fidelity');
    };

    evaluateVisualProfile();
    window.addEventListener('resize', evaluateVisualProfile);
    return () => window.removeEventListener('resize', evaluateVisualProfile);
  }, []);

  return profile;
}
