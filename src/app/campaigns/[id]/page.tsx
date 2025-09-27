export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto">
      <div className="lg:flex lg:space-x-8">
        {/* Left Content */}
        <div className="lg:w-2/3 space-y-6">
          <h1 className="text-3xl font-bold">광고 요청 제목 {params.id}</h1>
          <div className="w-full h-80 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">리뷰 이미지</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">광고 요청 내용 및 조건</h2>
            <p className="text-gray-600">
              여기에 광고 요청에 대한 상세 내용과 조건이 들어갑니다.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </div>
          <div>
            <h3 className="font-semibold">장소</h3>
            <p>서울시 강남구 테헤란로</p>
          </div>
           <div>
            <h3 className="font-semibold">이용시간</h3>
            <p>평일 09:00 ~ 18:00</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="sticky top-24 p-6 bg-gray-100 rounded-lg space-y-4">
            <h2 className="text-xl font-bold">제목</h2>
            <div>
              <h3 className="font-semibold">조건</h3>
              <p className="text-sm text-gray-700">방문 후 3일 이내 리뷰 작성</p>
            </div>
             <div>
              <h3 className="font-semibold">광고 지원 항목</h3>
              <p className="text-sm text-gray-700">2인 식사권 제공</p>
            </div>
            <div className="w-full h-48 bg-gray-300 rounded-md flex items-center justify-center">
              <span className="text-gray-500">지도</span>
            </div>
            <button className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
              신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}