import { FC } from 'react';

interface FeedbackMessageProps {
  message: string;
  success: boolean;
}

const FeedbackMessage: FC<FeedbackMessageProps> = ({ message, success }) => {
  return (
    <div
      className={`${
        success
          ? 'text-color-status-positive-day'
          : 'text-color-status-negative-day'
      } text-sm`}
    >
      {message}
    </div>
  );
};

export default FeedbackMessage;
