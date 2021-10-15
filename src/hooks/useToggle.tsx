import { useState } from 'react';

function useToggle(
  defaultState = false
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void] {
  const [state, setState] = useState(defaultState);

  const toggleState = () => {
    setState(!state);
  };
  return [state, setState, toggleState];
}
export default useToggle;
