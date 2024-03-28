import PodCard from '@components/Cards/PodCard/PodCard';
import { useLocales } from '@context/LocalesContext';
import { PodShareInfo } from '@fairdatasociety/fdp-storage/dist/pod/types';

interface SubscribedPodListProps {
  pods: PodShareInfo[];
  onPodSelect: (podName: PodShareInfo) => void;
}

export default function SubscribedPodList({
  pods,
  onPodSelect,
}: SubscribedPodListProps) {
  const { intl } = useLocales();
  if (!pods || pods.length === 0) {
    return null;
  }
  return (
    <div>
      <h5 className="text-center font-bold">{intl.get('SUBSCRIBED')}:</h5>
      <div className="flex justify-center sm:justify-start flex-wrap h-full">
        {pods.map((pod) => (
          <PodCard key={pod.podAddress} pod={pod} onClick={onPodSelect} />
        ))}
      </div>
    </div>
  );
}
