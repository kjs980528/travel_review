import Link from 'next/link';

interface ReviewCardProps {
  id: number;
  title: string;
  author: string;
}

const ReviewCard = ({ id, title, author }: ReviewCardProps) => {
  return (
    <Link href={`/reviews/${id}`} className="block group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
        {/* 실제로는 Next/Image 사용 */}
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">리뷰 이미지</span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{author}</p>
    </Link>
  );
};

export default ReviewCard;