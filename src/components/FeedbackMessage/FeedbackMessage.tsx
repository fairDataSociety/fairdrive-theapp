import { FC } from 'react';

interface FeedbackMessageProps {
  type: 'success' | 'error';
  message: string;
}

const FeedbackMessage: FC<FeedbackMessageProps> = ({ message, type }) => {
  return (
    <div
      className={`${
        type === 'success'
          ? 'text-color-status-positive-day'
          : 'text-color-status-negative-day'
      } text-sm`}
    >
      {message}
    </div>
  );
};

export default FeedbackMessage;
