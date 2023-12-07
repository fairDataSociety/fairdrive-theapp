/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useContext, useState } from 'react';
import { Steps, Step } from 'intro.js-react';
import 'intro.js/introjs.css';
import { isSallScreenSize } from '@utils/screen';

export enum TutorialState {
  OVERVIEW = 'overview',
  OVERVIEW_METAMASK = 'overview-metamask',
  DRIVE = 'drive',
}

const TUTORIAL_STEP_KEY = 'tutorial-step-';

interface TutorialStep {
  smElement: string;
  element: string;
  intro: string;
}

const driveStep: TutorialStep = {
  smElement: '.main-navigation-button',
  element: '.drive-navigation-button',
  intro: 'Navigate to your drive and start uploading your files.',
};

// TODO Add translations
const stepsByState: Record<TutorialState, TutorialStep[]> = {
  [TutorialState.OVERVIEW]: [driveStep],
  [TutorialState.OVERVIEW_METAMASK]: [
    {
      smElement: '.user-dropdown',
      element: '.user-dropdown',
      intro:
        'You can migrate your Metamask account to a protable account easily. Click here to start.',
    },
    driveStep,
  ],
  [TutorialState.DRIVE]: [
    {
      smElement: '.create-pod-button-mobile',
      element: '.create-pod-button',
      intro: 'Welcome to the drive. Start using your drive by creating a pod.',
    },
    {
      smElement: '.main-navigation-button',
      element: '.invite-navigation-button',
      intro: 'Invite your friends to Fairdrive here.',
    },
  ],
};

interface TutorialContext {
  activateStep: (state: TutorialState) => void;
  deactivateStep: () => void;
  isStepCompleted: (state: TutorialState) => boolean;
}

interface TutorialContextProps {
  children: ReactNode;
}

const tutorialContextDefaultValues: TutorialContext = {
  activateStep: () => {},
  deactivateStep: () => {},
  isStepCompleted: () => false,
};

const TutorialContext = createContext<TutorialContext>(
  tutorialContextDefaultValues
);

export const useTutorialContext = () => useContext(TutorialContext);

const TutorialProvider = ({ children }: TutorialContextProps) => {
  const [step, setStep] = useState<TutorialState | null>(null);
  const [steps, setStepsState] = useState<TutorialStep[]>([]);
  const [enabled, setEnabled] = useState(true);

  const isStepCompleted = (step: TutorialState): boolean => {
    return localStorage.getItem(TUTORIAL_STEP_KEY + step) === 'true';
  };

  const setStepCompleted = (step: TutorialState) => {
    localStorage.setItem(TUTORIAL_STEP_KEY + step, 'true');
  };

  const activateStep = (state: TutorialState) => {
    if (isStepCompleted(state)) {
      return;
    }
    setStepsState(stepsByState[state]);
    setStep(state);
    setEnabled(true);
  };

  const deactivateStep = () => {
    setStepsState([]);
    setStep(null);
    setEnabled(false);
  };

  const completeStep = (state: TutorialState) => {
    if (!state) {
      return;
    }
    setStepCompleted(state);
    deactivateStep();
  };

  const transformSteps = (steps: TutorialStep[]): Step[] => {
    const mobile = isSallScreenSize();

    return steps.map(({ intro, element, smElement }) => ({
      intro,
      element: mobile ? smElement : element,
    }));
  };

  const onExit = (index) => {
    setEnabled(false);

    // Seems there is a bug in the library which sets index to -1 when steps are completed
    if (index < 0) {
      completeStep(step);
    }
  };

  return (
    <TutorialContext.Provider
      value={{
        activateStep,
        deactivateStep,
        isStepCompleted,
      }}
    >
      <Steps
        enabled={enabled}
        steps={transformSteps(steps)}
        initialStep={0}
        onComplete={() => completeStep(step)}
        onExit={onExit}
      />
      {children}
    </TutorialContext.Provider>
  );
};

export default TutorialContext;

export { TutorialProvider };
