// 리뷰 상세 페이지 구조
export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">리뷰 제목 {params.id}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">리뷰 이미지 1</div>
        <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">리뷰 이미지 2</div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">리뷰 내용</h2>
        <p className="text-gray-700 leading-relaxed">
          여기에 리뷰 본문이 들어갑니다...
        </p>
      </div>
      <div className="mt-6 border-t pt-6 space-y-2">
        <p><span className="font-semibold">장소:</span> [장소 정보]</p>
        <p><span className="font-semibold">이용시간:</span> [이용시간 정보]</p>
      </div>
    </div>
  )
}