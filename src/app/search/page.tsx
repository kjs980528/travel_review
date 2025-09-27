import ReviewCard from "@/components/ReviewCard";

// 임시 데이터
const mockSearchResults = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  title: `검색된 리뷰 ${i + 1}`,
  author: `작성자 ${i + 1}`,
}));

export default function SearchPage() {
  return (
    <div>
      <div className="w-full h-80 bg-gray-300 rounded-lg mb-6 flex items-center justify-center">
        <span className="text-gray-500">여행지 및 명소 이미지</span>
      </div>
      <p className="text-lg text-gray-700 mb-8">
        지역에 대한 대략적인 소개가 여기에 표시됩니다.
      </p>
       {/* 카테고리 탭 */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <a href="#" className="border-green-500 text-green-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">숙소</a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">랜드마크</a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">음식</a>
        </nav>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {mockSearchResults.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  )
}