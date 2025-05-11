export default function AboutPage() {
  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">關於我們</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">我們的故事</h2>
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              愛心手工餅乾的誕生源於一位充滿熱情的烘焙師 - 陳小明，在2018年創立了這個品牌。一開始只是在家中的小廚房製作餅乾送給親朋好友，收到了大家的鼓勵和支持後，決定將這份甜蜜的手藝分享給更多人。
            </p>
            <p className="text-gray-700 mb-4">
              每一塊餅乾都承載著我們對烘焙的熱愛和對食材的尊重。我們堅持使用天然食材，拒絕任何人工色素和防腐劑，讓您品嚐到最純粹的美味。
            </p>
            <p className="text-gray-700">
              如今，愛心手工餅乾已成為許多家庭慶祝節日和特殊時刻的選擇。我們不僅提供美味的餅乾，更希望透過這些充滿創意的甜點，為您的生活增添一絲甜蜜與溫馨。
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">我們的理念</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>堅持使用新鮮、天然的食材</li>
              <li>每日新鮮製作，不添加防腐劑</li>
              <li>注重環保，使用可回收包裝</li>
              <li>關懷社區，定期舉辦公益活動</li>
              <li>持續創新，帶來更多驚喜口味</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">我們的承諾</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>選用台灣本地優質食材，支持在地農業</li>
              <li>嚴格把關製作過程，確保食品安全</li>
              <li>提供最優質的客戶服務</li>
              <li>持續改進產品，傾聽客戶意見</li>
              <li>以誠信經營，建立長久的顧客關係</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">我們的團隊</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-cream rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary-dark">團隊照片</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">陳小明</h3>
              <p className="text-gray-600">創辦人兼主廚</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-cream rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary-dark">團隊照片</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">林美麗</h3>
              <p className="text-gray-600">設計師</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-cream rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary-dark">團隊照片</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">王大華</h3>
              <p className="text-gray-600">行銷總監</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
