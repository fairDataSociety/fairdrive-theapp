interface OverviewProps {
  theme: string;
  title: string;
  description: string;
  imageLight: React.ReactElement;
  imageDark: React.ReactElement;
  button: React.ReactElement;
}

const OverviewCard = ({
  theme,
  title,
  description,
  imageLight,
  imageDark,
  button,
}: OverviewProps) => {
  return (
    <div className="relative flex flex-col h-92 py-8 px-8 shadow-lg dark:bg-color-shade-dark-4-night rounded">
      {theme === 'light' ? imageLight : imageDark}

      <h3 className="mt-4 font-semibold text-lg text-color-accents-plum-black dark:text-color-shade-white-night">
        {title}
      </h3>

      <p className="mt-2 text-color-shade-light-2-night dark:text-color-shade-light-2-night">
        {description}
      </p>

      <div
        className="mt-auto pt-2 bottom-5 w-fit"
        style={{ width: 'fit-content' }}
      >
        {button}
      </div>
    </div>
  );
};

export default OverviewCard;
