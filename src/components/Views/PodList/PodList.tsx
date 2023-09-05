import { GetPodResponse } from '@api/pod';
import PodCard from '@components/Cards/PodCard/PodCard';

interface PodListProps {
  pods: GetPodResponse;
  onPodSelect: (podName: string) => void;
}

export default function PodList({ pods, onPodSelect }: PodListProps) {
  return (
    <div className="flex justify-center sm:justify-start flex-wrap h-full">
      {(pods?.pod_name || []).map((pod) => (
        <PodCard key={pod} podName={pod} onClick={onPodSelect} />
      ))}
      {(pods?.shared_pod_name || []).map((pod) => (
        <PodCard key={pod} podName={pod} onClick={onPodSelect} />
      ))}
    </div>
  );
}
