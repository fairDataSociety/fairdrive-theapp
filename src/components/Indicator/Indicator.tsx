import ThemeContext from '@context/ThemeContext';
import { useContext } from 'react';

interface IndicatorProps {
  className?: string;
}

export default function Indicator({ className }: IndicatorProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-3 h-3 rounded-md ${
        theme === 'light'
          ? 'bg-color-status-components-day'
          : 'bg-color-accents-grey-pastel'
      } ${className}`}
    />
  );
}
