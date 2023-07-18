import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

export interface DialogTransitionProps {
  children: React.ReactElement;
}

export function DialogBackgroundTransition({
  children,
}: DialogTransitionProps) {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition.Child>
  );
}

export default function DialogTransition({ children }: DialogTransitionProps) {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition.Child>
  );
}
