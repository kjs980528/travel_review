import ReviewCard from "@/components/ReviewCard";

// 임시 데이터. 실제로는 API로 받아옵니다.
const mockReviews = [
  { id: 1, title: "제목1", author: "출처1" },
  { id: 2, title: "제목2", author: "출처2" },
  { id: 3, title: "제목3", author: "출처3" },
  { id: 4, title: "제목4", author: "출처4" },
  { id: 5, title: "제목5", author: "출처5" },
  { id: 6, title: "제목6", author: "출처6" },
  { id: 7, title: "제목7", author: "출처7" },
  { id: 8, title: "제목8", author: "출처8" },
];

export default function HomePage() {
  return (
    <div>
      {/* 카테고리 탭 */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <a href="#" className="border-green-500 text-green-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">통합</a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">숙소</a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">랜드마크</a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">음식</a>
        </nav>
      </div>

      {/* 리뷰 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {mockReviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
}