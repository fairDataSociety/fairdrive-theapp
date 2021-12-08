import { FC } from 'react';

interface AuthenticationHeaderProps {
  heading: string;
  text: string;
}

const AuthenticationHeader: FC<AuthenticationHeaderProps> = ({
  heading,
  text,
}) => {
  return (
    <div className="w-108 text-center">
      <h1 className="mb-4 text-style-32-header-4 text-color-accents-purple-heavy">
        {heading}
      </h1>
      <p className="text-style-16-body-regular text-color-accents-plum-black">
        {text}
      </p>
    </div>
  );
};

export default AuthenticationHeader;
