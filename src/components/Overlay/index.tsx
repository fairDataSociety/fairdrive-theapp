import { HTMLAttributes } from 'react';
import React from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Overlay({ children, ...props }: Props) {
  return <div className="z-index-6">{children}</div>;
}

export default Overlay;
