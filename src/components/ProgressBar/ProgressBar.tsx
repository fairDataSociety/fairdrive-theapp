interface ProgressBarProps {
  percent: number;
  className?: string;
}

export default function ProgressBar({ percent, className }: ProgressBarProps) {
  if (percent < 0) {
    percent = 0;
  }
  if (percent > 100) {
    percent = 100;
  }

  return (
    <div
      className={`w-full bg-color-shade-white-night dark:bg-color-shade-dark-1-night rounded-full h-2.5 ${className}`}
    >
      <div
        className="bg-color-accents-purple-heavy dark:bg-color-accents-grey-lavendar h-2.5 rounded-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
