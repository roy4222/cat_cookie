'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // 響應式狀態
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // 當組件掛載和窗口大小變化時更新響應式狀態
  useEffect(() => {
    // 初始化狀態
    handleResize();
    
    // 添加窗口調整大小事件監聽器
    window.addEventListener('resize', handleResize);
    
    // 清理監聽器
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 處理窗口大小變化
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    setIsDesktop(window.innerWidth >= 1024);
  };

  // 貓咪餅乾資料
  const catCookies = [
    { 
      name: '橘貓花紋原味奶油餅乾', 
      description: '溫柔陽光系，像午後慵懶的擼貓時光。原味奶油餅乾搭配可可斑點，香甜酥鬆，最經典的選擇。',
      category: '貓咪餅乾',
      price: 200,
      image: '/image/cat1.png'
    },
    { 
      name: '虎斑巧香奶油餅乾', 
      description: '勇敢冒險家，野性中帶點撒嬌。可可粉拉出虎斑條紋，奶油中混入淡淡焦糖香氣，濃郁又耐吃。',
      category: '貓咪餅乾',
      price: 200,
      image: '/image/cat2.png'
    },
    { 
      name: '三花莓果奶油餅乾', 
      description: '甜美活潑系，隨時準備給你一記撒嬌頭槌。三色花紋靈感來自莓果果粉與可可麵團交織，清甜中帶層次。',
      category: '貓咪餅乾',
      price: 200,
      image: '/image/cat3.png'
    },
    { 
      name: '賓士貓黑白奶油餅乾', 
      description: '高冷紳士派，外表酷酷其實超黏人。經典黑白色塊對比，使用竹炭與可可粉打造帥氣花色，配奶油香超對味。',
      category: '貓咪餅乾',
      price: 200,
      image: '/image/cat4.png'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 英雄區塊 */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container-custom">
          <div style={{ 
            display: 'flex', 
            flexDirection: isDesktop ? 'row' : 'column',
            alignItems: 'center',
          }}>
            <div style={{ 
              width: isDesktop ? '50%' : '100%',
              marginBottom: isDesktop ? 0 : '2.5rem'
            }}>
              <h1 style={{ 
                fontSize: isMobile ? '2.25rem' : '3rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
              }}>
                療癒系<span style={{ color: 'var(--primary)' }}>手作貓貓餅乾</span>登場！
              </h1>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
                每片都是橘貓的背影剪影，搭配手工斑紋，真實還原主子可愛姿態。附贈可可巧克力筆，讓你親手畫上臉蛋，打造獨一無二的貓咪表情。
              </p>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
                不只是點心，更是一份陪伴與創作的時光。
                無論送禮還是自用，都讓人心動不已。
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/products" className="btn-primary">
                  開始訂購
                </Link>
                <Link href="/contact" className="btn-secondary">
                  線上客服
                </Link>
              </div>
            </div>
            <div style={{ 
              width: isDesktop ? '50%' : '100%',
            }}>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: isMobile ? '300px' : '400px',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <Image
                  src="/image/cat1.png"
                  alt="橘貓花紋原味奶油餅乾"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 產品介紹區塊 */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container-custom">
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>產品介紹</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : (isTablet ? 'repeat(2, 1fr)' : '1fr'),
            gap: '2rem'
          }}>
            {/* 產品類別卡片 */}
            {catCookies.map((cookie, index) => (
              <div key={index} className="card">
                <div style={{ 
                  height: '12rem', 
                  backgroundColor: 'var(--cream)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={cookie.image}
                    alt={cookie.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{cookie.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                    {cookie.description.split('。')[0]}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      ${cookie.price} <span style={{ fontSize: '0.75rem', fontWeight: 'normal' }}>/ 8片</span>
                    </span>
                  </div>
                  <Link 
                    href={`/products?category=${cookie.category}`} 
                    style={{ color: 'var(--primary)', transition: 'color 0.15s ease-in-out' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-dark)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  >
                    查看更多 &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 優惠推薦區塊 */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--cream)' }}>
        <div className="container-custom">
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>優惠推薦</h2>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: isTablet || isDesktop ? 'row' : 'column'
            }}>
              <div style={{ 
                width: isTablet || isDesktop ? '50%' : '100%',
                height: isTablet || isDesktop ? 'auto' : '16rem', 
                backgroundColor: 'var(--secondary)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  height: '100%',
                  width: '100%'
                }}>
                  <div style={{ position: 'relative', height: '100%' }}>
                    <Image src="/image/cat1.png" alt="橘貓餅乾" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ position: 'relative', height: '100%' }}>
                    <Image src="/image/cat2.png" alt="虎斑餅乾" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ position: 'relative', height: '100%' }}>
                    <Image src="/image/cat3.png" alt="三花餅乾" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ position: 'relative', height: '100%' }}>
                    <Image src="/image/cat4.png" alt="賓士貓餅乾" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div style={{ 
                width: isTablet || isDesktop ? '50%' : '100%',
                padding: '2rem' 
              }}>
                <span style={{ 
                  display: 'inline-block',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  marginBottom: '1rem'
                }}>
                  限時優惠
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>貓咪造型餅乾禮盒</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  四種可愛貓咪造型餅乾的精美組合，每種口味皆有獨特風味，是送禮自用的最佳選擇。限時優惠組合價！
                </p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--primary)' }}>$680</span>
                  <span style={{ fontSize: '1.125rem', textDecoration: 'line-through', color: '#a0aec0', marginLeft: '0.5rem' }}>$800</span>
                </div>
                <Link href="/products/gift-box" className="btn-primary">
                  立即選購
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 顧客評價區塊 */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container-custom">
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>顧客評價</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : (isTablet ? 'repeat(2, 1fr)' : '1fr'),
            gap: '2rem'
          }}>
            {[
              { name: '王小明', comment: '貓咪餅乾太可愛了，造型精緻，送給朋友她超級喜歡！' },
              { name: '陳美麗', comment: '橘貓造型是我的最愛，香酥可口，一吃就停不下來。' },
              { name: '李大華', comment: '送給愛貓的女友，她拍了好多照片才捨得吃，味道也很棒！' }
            ].map((review, index) => (
              <div key={index} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    borderRadius: '9999px',
                    backgroundColor: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontWeight: 'bold'
                  }}>
                    {review.name.charAt(0)}
                  </div>
                  <div style={{ marginLeft: '1rem' }}>
                    <h4 style={{ fontWeight: '600' }}>{review.name}</h4>
                    <div style={{ display: 'flex', color: '#f6e05e' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{ color: '#4a5568' }}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
