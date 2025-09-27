import CampaignCard from "@/components/CampaignCard";

// 임시 데이터
const mockCampaigns = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `제목 ${i + 1}`,
  source: `출처 ${i + 1}`,
}));

export default function CampaignsPage() {
  const regions = ["전체", "서울", "인천", "경기", "부산", "대구", "광주", "대전", "울산", "강원", "충청", "전라", "경상", "제주"];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">체험단</h1>
      {/* 지역 필터 */}
      <div className="mb-4">
        <div className="w-full h-2 bg-gray-200 rounded-full mb-2"></div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {regions.map(region => (
            <button key={region} className="text-gray-600 hover:text-green-600 font-medium">
              {region}
            </button>
          ))}
        </div>
      </div>
      {/* 카테고리 탭 */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <a href="#" className="border-green-500 text-green-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">통합</a>
          {/* ... 다른 탭들 ... */}
        </nav>
      </div>

      {/* 광고 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {mockCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} />
        ))}
      </div>
    </div>
  );
}