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
      <h1 className="mb-4 font-semibold text-3xl text-color-accents-purple-heavy leading-10">
        {heading}
      </h1>
      <p className="font-normal text-base text-color-accents-plum-black">
        {text}
      </p>
    </div>
  );
};

export default AuthenticationHeader;
