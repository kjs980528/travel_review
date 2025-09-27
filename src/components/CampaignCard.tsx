import Link from 'next/link';

interface CampaignCardProps {
  id: number;
  title: string;
  source: string;
}

const CampaignCard = ({ id, title, source }: CampaignCardProps) => {
  return (
    <Link href={`/campaigns/${id}`} className="block group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">광고 요청</span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{source}</p>
    </Link>
  );
};

export default CampaignCard;