import { ThreeDots } from 'react-loader-spinner';

const Spinner: React.FC<{ isLoading?: boolean }> = ({ isLoading = true }) => {
  return (
    <ThreeDots
      visible={isLoading}
      height="15"
      radius="2"
      color="#6b5ad5"
      width="100%"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Spinner;
